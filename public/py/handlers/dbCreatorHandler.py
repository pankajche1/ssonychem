import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)

class DbCreatorHandler(webapp2.RequestHandler):

    def isUserAdmin(self):
        isAdmin = False
        # check the status of the client            
        user = users.get_current_user()
        if user:
            isAdmin = users.is_current_user_admin()
        return isAdmin

    def createProducts(self, num=10):
       ''' save 10 products 
       '''
       for i in range(0,num):
            name = 'Product-'+str(i)
            data = {'name': name}
            DAO().saveProduct(data)

    def createProductsGroups(self, num=10):
       ''' save 10 products 
       '''
       dao = DAO()
       # first save some product groups:
       #      data = {'name':'Cleaning Agents'}
       #        dao.saveProductGroup(data)
       #        data = {'name':'Speciality Chemicals'}
       #        dao.saveProductGroup(data)

       for i in range(0,num):
           name = 'Product-Group'+str(i)
           data = {'name': name}
           dao.saveProductGroup(data)

    def createDb(self):
        '''
         creates a fake db:
        '''
        self.createProducts()
        self.createProductsGroups()

    def get(self):
        if self.isUserAdmin() == True:
            self.createDb()
            self.response.write("<p style='color:green; font-weight:red;'>fake database objects are created successfully!!</p>")
        else:
            self.response.write("<p style='color:red; font-weight:red;'>you need to be the <b>main administrator</b> to do this opearation!!</p>")
