import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from py.models.product import Product as Product
from py.dbutils.dao import DAO as DAO
from utils.dbmanager import DbManager as DbManager
#from py.models.project import Project as Project
#from py.models.service import Service as Service
#from google.appengine.api import users

#@unittest.skip('ProductTestcase')
class ProductTestCase(unittest.TestCase):

    def setUp(self):
        # First, create an instance of the Testbed class.
        self.testbed = testbed.Testbed()
        # Then activate the testbed, which prepares the service stubs for use.
        self.testbed.activate()
        # Next, declare which service stubs you want to use.
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        # Clear ndb's in-context cache between tests.
        # This prevents data from leaking between tests.
        # Alternatively, you could disable caching by
        # using ndb.get_context().set_cache_policy(False)
        ndb.get_context().clear_cache()

    def tearDown(self):
        self.testbed.deactivate()


    def test1_get_products_data_given_no_data_on_server(self):
        '''
        Given: There are no products in the db
        When: products link is clicked
        Then: the server should give empty data
        '''
        itemsPerFetch = 20
        prevCursor = False
        nextCursor = False
        res = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(0, len(res['objects']))

    def test2_get_products_data_given_data_on_server(self):
        '''
        Given: there are some products on db
        When: products link is clicked
        Then: the server presents the product data
        '''
        iPage = 1
        itemsPerFetch = 20
        prevCursor = False
        nextCursor = False
        DbManager().createProducts()        
        res = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(10, len(res['objects']))
        # test the name of the product:
        product0 = res['objects'][0]
        assert product0
        name = product0['name']
        self.assertEqual(name, 'product-0')

