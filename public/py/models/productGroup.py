'''
model for a product group 
'''
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor

class ProductGroup(ndb.Model):
    '''
    This represents the Product
    :param name: name of the product group
    '''
    name = ndb.StringProperty()
    nameLower = ndb.ComputedProperty(lambda self: self.name.lower())
    created = ndb.DateTimeProperty( auto_now_add=True)
    edited = ndb.DateTimeProperty(auto_now=True)
    imageKey = ndb.KeyProperty()

    @classmethod
    def getProductsGroups(cls):
        objects = cls.query().order(cls.nameLower).fetch()
        return objects
