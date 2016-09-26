import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.dbutils.dao_user import UserDAO as UserDAO

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class SigninPageHandler(webapp2.RequestHandler):

    def get(self):
        userDao = UserDAO()
        user = userDao.getUser()
        if user: # if user is not None means he is logged in to his google account
            # now process the user info, to see if he is the member of the site
            if user['isMember'] == True:
                self.redirect('/member')
            else: # the google user is not them member of our site:
                # send him to the signup section
                self.redirect('/signup')
        else: # user not logged in to the google account
            # create a login uri for the gmail:
            userLink = users.create_login_url(self.request.uri)
            # at this point take the user directly to the gmail account login:
            self.redirect(userLink)
