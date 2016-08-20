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
from py.handlers.signinPageHandler import SigninPageHandler as SigninPageHandler
from py.handlers.productGroupHandler import ProductGroupHandler as ProductGroupHandler

import cgi
import urllib

JINJA_ENVIRONMENT = jinja2.Environment( \
                   loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)

application = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/products', ProductsPageHandler),
    ('/signin', SigninPageHandler),
    ('/products-groups', ProductGroupHandler),
    ('/save-product-group', ProductGroupHandler)
    ], debug=True)

