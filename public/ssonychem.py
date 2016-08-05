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

import cgi
import urllib

JINJA_ENVIRONMENT = jinja2.Environment( \
                   loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)

application = webapp2.WSGIApplication([
    ('/', MainHandler)
    ], debug=True)

