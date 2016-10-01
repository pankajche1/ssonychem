import os
import webapp2
import jinja2
import json
from google.appengine.ext import ndb
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.dbutils.dao_user import UserDAO as UserDAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)

class ProductGroupHandler(webapp2.RequestHandler):

    def deleteGroup(self, body, isAuth):
        key = body['key']
        keyTarget = ndb.Key(urlsafe=key)
        if isAuth == True:
            response = DAO().deleteProductGroup(keyTarget)
        else:
            response = {'error':True, 'message':'operation not permitted'}
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    def saveGroup(self, body, isAuth):
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
        if isAuth == True:
            # save the data to datastore
            data = {'name': group['name']}
            response = DAO().saveProductGroup(data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
        else:
            self.redirect('/')
      
    def updateGroup(self, body, isAuth):
        if isAuth == True:
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

    def addProductsToGroup(self, body, isAuth):
        response = {'info':'','error':'','message':''}
        if isAuth == True:
            # get data from the body:
            # actually the names are 'products' and 'group' but they are keys only!
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

    def getProductsGroupByKey(self):
        key = self.request.get('key')
        key = ndb.Key(urlsafe=key)
        response = DAO().getProductGroupByKey(key)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))



    def get(self):
        # get request can come for deleting a product group
        topic =  self.request.get('topic')
        #if mode == "delete":
        #    self.deleteGroups(self.request.get('key'))
        if topic == "single": # get a single group by key
            self.getProductsGroupByKey()
        else: # get a list of groups
            response = DAO().getProductsGroups()
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
        userDao = UserDAO()
        isAuth = userDao.isAuth(userDao.getUser())
        if topic == 'new':
            self.saveGroup(body, isAuth)
        elif topic == 'update':
            self.updateGroup(body, isAuth)
        elif topic == 'delete':
            self.deleteGroup(body, isAuth)
        elif topic == 'add-products':
            self.addProductsToGroup(body, isAuth)
        else:
            response['error'] = True
            response['message'] = "The topic provided does not meet with any of our services!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))

