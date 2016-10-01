import os
import urllib
import cgi
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor
import jinja2
import webapp2
import json
from py.handlers.mainHandler import MainHandler as MainHandler
from py.handlers.productsPageHandler import ProductsPageHandler as ProductsPageHandler
from py.handlers.membersPageHandler import MembersPageHandler as MembersPageHandler
from py.handlers.memberPageHandler import MemberPageHandler as MemberPageHandler
from py.handlers.signinPageHandler import SigninPageHandler as SigninPageHandler
from py.handlers.signupPageHandler import SignupPageHandler as SignupPageHandler
from py.handlers.registrationPageHandler import RegistrationPageHandler as  RegistrationPageHandler
from py.handlers.productGroupHandler import ProductGroupHandler as ProductGroupHandler
from py.handlers.dbCreatorHandler import DbCreatorHandler  as DbCreatorHandler
import cgi
import urllib

JINJA_ENVIRONMENT = jinja2.Environment( \
                   loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)

application = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/products', ProductsPageHandler),
    ('/member', MemberPageHandler),
    ('/members', MembersPageHandler),
    ('/signin', SigninPageHandler),
    ('/signup', SignupPageHandler),
    ('/register', RegistrationPageHandler),
    ('/products-groups', ProductGroupHandler),
    ('/db', DbCreatorHandler)
    #('/save-product-group', ProductGroupHandler)
    ], debug=True)

