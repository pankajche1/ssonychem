import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.dbutils.dao_user import UserDAO as UserDAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class SignupPageHandler(webapp2.RequestHandler):


    def get(self):
        # check if the user is logged in already:
        # check if the user is logged in:
        user = users.get_current_user()
        msg = ''
        # default template:
        template = env.get_template('guest/index.html')
        # get user info from the dao object:
        userDao = UserDAO()
        user = userDao.getUser() # returns a dict object
        if user: # user is logged in with google account
            # now process the user info:
            if users.is_current_user_admin() == True:
                self.redirect('/member')                
            elif user['isMember'] == True: # member is registered with the site
                # give the responsibility to the member handler:
                self.redirect('/member')
            else: # the google user is not registered with the site
                # start the registration process.
                googleLogoutUrl = users.create_logout_url('/')
                user['logoutUrl'] = googleLogoutUrl
                template = env.get_template('guest/signup.html')
                self.response.write(template.render(user))
        else:
            # create a login uri for the gmail:
            googleLoginUrl = users.create_login_url(self.request.uri)
            self.redirect(googleLoginUrl)


       

