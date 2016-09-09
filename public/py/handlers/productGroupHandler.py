import os
import webapp2
import jinja2
import json
from google.appengine.ext import ndb
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)

class ProductGroupHandler(webapp2.RequestHandler):

    def isUserAdmin(self):
        isAdmin = False
        # check the status of the client            
        user = users.get_current_user()
        if user:
            isAdmin = users.is_current_user_admin()
        return isAdmin
    
    def deleteGroups(self, key):
        keyTarget = ndb.Key(urlsafe=key)
        if self.isUserAdmin() == True:
            response = DAO().deleteProductGroup(keyTarget)
        else:
            response = {'error':True, 'message':'operation not permitted'}
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    def saveGroup(self, body):
        response = {'info':'','error':'','message':''}
        try:
            group = body['group'] # name of the product group
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in form. Please go to profile and try again."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        if self.isUserAdmin() == True:
            # save the data to datastore
            data = {'name': group['name']}
            response = DAO().saveProductGroup(data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
        else:
            self.redirect('/')
      
    def updateGroup(self, body):
        if self.isUserAdmin() == True:
            # update the data to datastore
            # data is comming in this form {topic:'update', 'group':{'key':'', 'name':''}}
            group = body['group']
            key = group['key']
            keyTarget = ndb.Key(urlsafe=key)
            name = group['name']
            data = {'name':name}
            response = DAO().updateProductGroup(keyTarget, data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
        else:
            self.redirect('/')

    def addProductsToGroup(self, body):
        response = {'info':'','error':'','message':''}
        if self.isUserAdmin() == True:
            # get data from the body:
            productsKeys = body['products']
            targetGroupKey = body['group']
            targetGroupKey = ndb.Key(urlsafe=targetGroupKey)
            # products key data:
            productsKeysSafe = []
            for key in productsKeys:
                productsKeysSafe.append(ndb.Key(urlsafe=key))
            response = DAO().addProductsToGroup(targetGroupKey, productsKeysSafe)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
        else:
            response['error'] = True
            response['message'] = "For this service you must be admin!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))



    def get(self):
        # get request can come for deleting a product group
        mode =  self.request.get('mode')
        if mode == "delete":
            self.deleteGroups(self.request.get('key'))
        else:
            response = DAO().getProductGroups()
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))

    def post(self):
        response = {'info':'','error':'true','message':''}
        body =  json.loads(self.request.body)
        # these are the possible routes here:
        # 1: form data for a new product group
        # 2: form data for a desired product group update
        # get the form data:
        try:
            topic = body['topic'] # this is the route name
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is no topic given in the form."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return

        if topic == 'new':
            self.saveGroup(body)
        elif topic == 'update':
            self.updateGroup(body)
        elif topic == 'add-products':
            self.addProductsToGroup(body)
        else:
            response['error'] = True
            response['message'] = "The topic provided does not meet with any of our services!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))

