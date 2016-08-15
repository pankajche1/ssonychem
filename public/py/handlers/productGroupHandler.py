import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)

class ProductGroupHandler(webapp2.RequestHandler):

    def get(self):
        response = DAO().getProductGroups()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    def post(self):
        response = {'info':'','error':'true','message':''}
        body =  json.loads(self.request.body)
        # these are the required keys
        # 1 name, 2 e(email) 3 email(honey pot) 4 msg
        # get the form data:
        try:
            uName = body['name'] # name of the product group
        except:
            # if some error in retrieving the form data:
            response['error'] = True
            response['message'] = "There is some error in form. Please go to profile and try again."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(response))
            return
        # check the status of the client            
        user = users.get_current_user()
        if user:
            # user is a gmail user
            # check if the user is a registerd member of the site:
            userNickName = user.nickname()
            isUserAdmin = users.is_current_user_admin()
            # if the user is not an admin then take to the guest page
            if(isUserAdmin == True):
                # save the data to datastore
                data = {'name':uName}
                response = DAO().saveProductGroup(data)
                self.response.headers['Content-Type'] = 'application/json'
                self.response.out.write(json.dumps(response))
            else:
                self.redirect('/')

        else:
            self.redirect('/')
