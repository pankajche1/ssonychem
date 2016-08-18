import unittest
import webapp2
import webtest
import json 
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from google.appengine.api import users
#import rajput
from py.dbutils.dao import DAO as DAO
#from py.dbutils.adminDao import AdminDAO as AdminDAO
from utils.dbmanager import DbManager as DbManager
from py.handlers.mainHandler import MainHandler as MainHandler
from py.handlers.productsPageHandler import ProductsPageHandler as \
                             ProductsPageHandler
#from py.handlers.signupPageHandler import SignupPageHandler as SignupPageHandler
from py.handlers.signinPageHandler import SigninPageHandler as SigninPageHandler
from py.handlers.productGroupHandler import ProductGroupHandler as ProductGroupHandler
#@unittest.skip('AppTest Case')
class AppTest(unittest.TestCase):
    def setUp(self):
        # First, create an instance of the Testbed class.
        self.testbed = testbed.Testbed()
        # Then activate the testbed, which prepares the service stubs for use.
        self.testbed.activate()
        # Next, declare which service stubs you want to use.
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_user_stub()
        # Clear ndb's in-context cache between tests.
        # This prevents data from leaking between tests.
        # Alternatively, you could disable caching by
        # using ndb.get_context().set_cache_policy(False)
        ndb.get_context().clear_cache()
        # create a WSGI application:
        app = webapp2.WSGIApplication([
            ('/',MainHandler),
            ('/products', ProductsPageHandler),
            ('/signin', SigninPageHandler),
            ('/product-groups', ProductGroupHandler),
            ('/save-product-group', ProductGroupHandler)
            ])
        # wrap the app with WebTest's AppTest:
        self.testApp=webtest.TestApp(app)

    def tearDown(self):
        self.testbed.deactivate()

        
    def loginUser(self, email='user@example.com', 
            id='123', is_admin=False):
        self.testbed.setup_env(
            user_email=email,
            user_id=id,
            nickname=email,
            user_is_admin='1' if is_admin else '0',
            overwrite=True)



    # test the handler:
    #@unittest.skip('Test Main Page Handler')
    def test001_main_pageHandler(self):
        response=self.testApp.get('/')
        self.assertEqual(response.status_int, 200)
        #self.assertEqual(response.normal_body, 'Panku')
        #print(response.normal_body)

    def test002_get_products_by_cursor(self):
        DbManager().createProducts();
        response = self.testApp.get('/products');
        self.assertEqual(response.status_int, 200)
        #members = json.load(response.normal_body) 
        products = json.dumps(response.normal_body) 
        #members2 = json.loads(members)
        #print(response.normal_body)

    #@unittest.skip('Test User login')
    def test003_user_login(self):
        '''
          given: user is logged to his gmail in 
          then: he should be authenticated
        '''
        # user data:
        email = 'pankajche1@gmail.com'
        id = 'pankaj'
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id)
        # test the logged in user:
        assert users.get_current_user().email() == 'pankajche1@gmail.com'

    def test004_signin_page_given_client_not_loggedin(self):
        '''
            given: client is not logged in
            then: he should be redirected to the guest page
        '''
        response = self.testApp.get('/signin');
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        #products = json.dumps(response.normal_body) 
        #print(response.normal_body)

    def test005_signin_page_given_client_loggedin_and_no_admin(self):
        '''
            given: client is logged in
            and: he is no admin
            then: he should be redirected to the member page
        '''
        # user data:
        email = 'pankajche1@gmail.com'
        id = 'pankaj'
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id)
        response = self.testApp.get('/signin');
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        #products = json.dumps(response.normal_body) 
        #print(response.normal_body)

    def test006_signin_page_given_client_loggedin_and_admin(self):
        '''
            given: client is logged in
            and: he is admin
            then: he should be redirected to the member page
        '''
        # user data:
        email = 'pankajche1@gmail.com'
        id = 'pankaj'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        response = self.testApp.get('/signin');
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 200)
        #products = json.dumps(response.normal_body) 
        #print(response.normal_body)

    def test007_save_product_group_given_client_is_not_admin(self):
        '''
            given: client is logged in
            and: he is not admin
            then: he should not be able to save the group
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        #response = self.testApp.post('/save-product-group', {'name':'Cleaning Agent'});
        response = self.testApp.post_json('/save-product-group', dict(name='Cleaning Agent'));
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        #products = json.dumps(response.normal_body) 
        #print(response.normal_body)

    def test008_save_product_group_given_client_is_admin(self):
        '''
            given: client is logged in
            and: he is  admin
            then: he should be able to save the group
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        #response = self.testApp.post('/save-product-group', {'name':'Cleaning Agent'});
        response = self.testApp.post_json('/save-product-group', dict(name='Cleaning Agent'));
        # status code 302 is for redirection and 200 is for good successful response
        self.assertEqual(response.status_int, 200)
        #products = json.dumps(response.normal_body) 
        #print(response.normal_body)

    def test009_get_product_groups_given_no_group_on_db(self):
        data = self.testApp.get('/product-groups')
        self.assertEqual(data.status_int, 200)
        #print data.normal_body

    def test010_get_product_groups_given_there_are_groups_on_db(self):
        # save some product grups on the db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        data = self.testApp.get('/product-groups')
        self.assertEqual(data.status_int, 200)
        #print data.normal_body

    def test011_delete_product_group_on_db(self):
        '''
        given: client is not logged in
        when: he deletes product group 
        then: he should not be able to delete the group
        '''
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/product-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        response = self.testApp.get('/product-groups', {'mode':'delete','key':keyTargetObject})
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        groups = DAO().getProductGroups()
        self.assertEqual(2, len(groups))

    def test012_delete_product_group_on_db_when_client_logged_in_and_not_admin(self):
        '''
        given: client is logged in
        and: he is not admin
        when: he deletes product group 
        then: he should not be able to delete the group
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/product-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        response = self.testApp.get('/product-groups', {'mode':'delete','key':keyTargetObject})
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        groups = DAO().getProductGroups()
        self.assertEqual(2, len(groups))

    def test013_delete_product_group_on_db_when_client_logged_in_and_is_admin(self):
        '''
        given: client is logged in
        and: he is admin
        when: he deletes product group 
        then: he should be able to delete the group
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/product-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        response = self.testApp.get('/product-groups', {'mode':'delete','key':keyTargetObject})
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'The object deleted successfully.')
        # assert if only one element is in the product group list
        groups = DAO().getProductGroups()
        self.assertEqual(1, len(groups))

