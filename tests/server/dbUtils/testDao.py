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

    def test1_save_product_group(self):
        # product group data:
        data = {'name':'Cleaning Agents'}
        response = DAO().saveProductGroup(data)
        self.assertEqual(response['error'], 'false')

    def test2_get_product_group(self):
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
        
# [START main]h
if __name__ == '__main__':
    unittest.main()
# [END main]
