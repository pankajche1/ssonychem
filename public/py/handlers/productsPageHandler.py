import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
from py.models.product import Product as Product


class ProductsPageHandler(webapp2.RequestHandler):

        
    def get(self):
        itemsPerFetch = 10
        prev_cursor = self.request.get('prev_cursor', '')
        next_cursor = self.request.get('next_cursor', '')
        res = DAO().getProductsByCursor(prev_cursor, next_cursor, itemsPerFetch)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(res))

