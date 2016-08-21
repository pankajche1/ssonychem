import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.models.product import Product as Product


class ProductsPageHandler(webapp2.RequestHandler):

    def isUserAdmin(self):
        isAdmin = False
        # check the status of the client            
        user = users.get_current_user()
        if user:
            isAdmin = users.is_current_user_admin()
        return isAdmin
        
    def get(self):
        itemsPerFetch = 10
        prev_cursor = self.request.get('prev_cursor', '')
        next_cursor = self.request.get('next_cursor', '')
        res = DAO().getProductsByCursor(prev_cursor, next_cursor, itemsPerFetch)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(res))

    def post(self):
        response = {'info':'','error':'true','message':''}
        body =  json.loads(self.request.body)
        # get the form data:
        try:
            uName = body['name'] # name of the product
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in form. Please go to profile and try again."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        if self.isUserAdmin() == True:
            # save the data to datastore
            data = {'name':uName}
            response = DAO().saveProduct(data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
        else:
            self.redirect('/')
