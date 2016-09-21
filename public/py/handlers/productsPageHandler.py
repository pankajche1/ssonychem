import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.models.product import Product as Product
from google.appengine.ext import ndb

class ProductsPageHandler(webapp2.RequestHandler):

    def isUserAdmin(self):
        isAdmin = False
        # check the status of the client            
        user = users.get_current_user()
        if user:
            isAdmin = users.is_current_user_admin()
        return isAdmin

    def deleteProduct(self, body):
        response = {'error':'', 'message':''}
        try:
            key = body['key']
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in getting the key of the product to be deleted!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        key = ndb.Key(urlsafe=key)
        if self.isUserAdmin() == True:
            response = DAO().deleteProduct(key)
        else:
            response = {'error':True, 'message':'operation not permitted'}
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    def saveProduct(self, body):
        '''
        for creating a new product
        '''
        response = {'error':'', 'message':''}
        try:
            product = body['product']
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in form!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        if self.isUserAdmin() == True:
            # save the data to datastore
            data = {'name': product['name']}
            response = DAO().saveProduct(data)
        else:
            response['error'] = True
            response['message'] = "Admin A level is required for this operaton!"
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    def updateProduct(self, body):
        response = {'error':'', 'message':''}
        try:
            product = body['product']
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in form!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        if self.isUserAdmin() == True:
            # save the data to datastore
            data = {'name': product['name'],
                    'key':ndb.Key(urlsafe=product['key'])}
            response = DAO().updateProduct(data)
        else:
            response['error'] = True
            response['message'] = "Admin A level is required for this operaton!"
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))


    def get(self):
        itemsPerFetch = 100
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
            topic = body['topic'] # name of the product
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is no topic in the request."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return

        if topic == 'new':
            self.saveProduct(body)
        elif topic == 'update':
            self.updateProduct(body)
        elif topic == 'delete':
            self.deleteProduct(body)
        else:
            response['error'] = True
            response['message'] = "The topic provided does not meet with any of our services!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))

