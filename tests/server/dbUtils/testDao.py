import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from py.dbutils.dao import DAO as DAO
#from py.dbutils.adminDao import AdminDAO as AdminDAO
from utils.dbmanager import DbManager as DbManager
#from py.models.project import Project as Project
#from py.models.service import Service as Service
from google.appengine.api import users

#@unittest.skip('DAO Testcase')
class DaoTestCase(unittest.TestCase):

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

    def loginUser(self, email='user@example.com', id='123', is_admin=False):
        self.testbed.setup_env(
            user_email=email,
            user_id=id,
            nickname=email,
            user_is_admin='1' if is_admin else '0',
            overwrite=True)

    def test001_save_product_group(self):
        # product group data:
        data = {'name':'Cleaning Agents'}
        response = DAO().saveProductGroup(data)
        self.assertEqual(response['error'], 'false')

    def test002_get_product_group(self):
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # now get the product group:
        groups = DAO().getProductGroups()
        self.assertEqual(groups[0]['name'],'Cleaning Agents')
        self.assertEqual(groups[1]['name'],'Speciality Chemicals')
        #print groups

    def test003_delete_product_group_in_db(self):
        # first save some product groups:
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # now get the list of the above product groups
        groups = DAO().getProductGroups()
        self.assertEqual(groups[0]['name'],'Cleaning Agents')
        self.assertEqual(groups[1]['name'],'Speciality Chemicals')
        # now we need to get the 'key' of the a product group for it to delete
        keyTargetObject = groups[0]['key']
        keyTarget = ndb.Key(urlsafe=keyTargetObject)
        # now use this key to delete the above object from the db:
        response = DAO().deleteProductGroup(keyTarget)
        # now again get the groups list from the server. 
        # and there must not be the deleted object:
        groups = DAO().getProductGroups()
        self.assertEqual(1, len(groups))
        self.assertEqual(groups[0]['name'],'Speciality Chemicals')
        # test the repsonse:
        self.assertEqual(response['error'], False)
        self.assertEqual(response['message'], 'The object deleted successfully.')

    def test004_save_new_product(self):
        # product:
        data = {'name':'Car Wash'}
        response = DAO().saveProduct(data)
        self.assertEqual(response['error'], 'false')
        self.assertEqual(response['message'], 'New product created successfully')

    def test005_get_products_list_(self):
        # first save 20 products on the server:
        DbManager().createProducts(20)
        # now get the products
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(len(response['objects']), 10)
        self.assertEqual(response['objects'][0]['name'], 'product-0')
        self.assertEqual(response['objects'][1]['name'], 'product-1')


    def test006_delete_product_in_db(self):
        # first save some products:
        data = {'name':'Handwash'}
        response = DAO().saveProduct(data)
        self.assertEqual(response['error'], 'false')
        self.assertEqual(response['message'], 'New product created successfully')
        data = {'name':'Toilet Cleaner'}
        response = DAO().saveProduct(data)
        self.assertEqual(response['error'], 'false')
        self.assertEqual(response['message'], 'New product created successfully')
        # now get the products
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        products = response['objects']
        self.assertEqual(len(response['objects']), 2)
        self.assertEqual(response['objects'][0]['name'], 'Handwash')
        self.assertEqual(response['objects'][1]['name'], 'Toilet Cleaner')
        # now we need to get the 'key' of the a product  for it to delete
        keyTargetObject = products[0]['key']
        keyTarget = ndb.Key(urlsafe=keyTargetObject)
        # now use this key to delete the above object from the db:
        response = DAO().deleteProduct(keyTarget)
        # now again get the products list from the server. 
        # and there must not be the deleted object:
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        products = response['objects']
        self.assertEqual(len(response['objects']), 1)
        self.assertEqual(response['objects'][0]['name'], 'Toilet Cleaner')

    def test007_update_product_group_attributes_in_db(self):
        # first save some groups:
        # first save some product groups:
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # now get the list of the above product groups
        groups = DAO().getProductGroups()
        self.assertEqual(groups[0]['name'],'Cleaning Agents')
        self.assertEqual(groups[1]['name'],'Speciality Chemicals')
        # now we need to get the 'key' of the a product group for it to delete
        keyTargetObject = groups[0]['key']
        keyTarget = ndb.Key(urlsafe=keyTargetObject)
        updatedGroupData = {'name':'Sunny Products'}
        # now use this key to delete the above object from the db:
        response = DAO().updateProductGroup(keyTarget, updatedGroupData)
        # test the repsonse:
        self.assertEqual(response['error'], 'false')
        self.assertEqual(response['message'], 'product group updated successfully')
        # now again get the groups list from the server. 
        # and there must not be the deleted object:
        group = DAO().getProductGroupByKey(keyTarget)
        self.assertEqual(group['name'],'Sunny Products')


# [START main]h
if __name__ == '__main__':
    unittest.main()
# [END main]
