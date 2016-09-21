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
            ('/products-groups', ProductGroupHandler)

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
        group = dict(name='Cleaning Agent')
        response = self.testApp.post_json('/products-groups', dict(group=group, topic='new'));
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        #response = response.json
        #self.assertEqual(response['message'], 'The object deleted successfully.')
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
        group = dict(name='Cleaning Agent')
        response = self.testApp.post_json('/products-groups', dict(group=group , topic='new'));
        # status code 302 is for redirection and 200 is for good successful response
        self.assertEqual(response.status_int, 200)
        #products = json.dumps(response.normal_body) 
        response = response.json
        self.assertEqual(response['error'], 'false')
        self.assertEqual(response['message'], "New product Group created successfully")


    def test009_get_product_groups_given_no_group_on_db(self):
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #print data.normal_body

    def test010_get_product_groups_given_there_are_groups_on_db(self):
        # save some product grups on the db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        data = self.testApp.get('/products-groups')
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
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        #response = self.testApp.get('/products-groups', {'mode':'delete','key':keyTargetObject})
        # now this key is to be sent to the server for deleting the group
        formData = dict(topic='delete', key=keyTargetObject);
        response = self.testApp.post_json('/products-groups', formData);
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        groups = DAO().getProductsGroups()
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
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        response = self.testApp.post_json('/products-groups', dict(topic='delete',key=keyTargetObject))
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        groups = DAO().getProductsGroups()
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
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be deleted:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        response = self.testApp.post_json('/products-groups', dict(topic='delete',key=keyTargetObject))
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'The object deleted successfully.')
        # assert if only one element is in the product group list
        groups = DAO().getProductsGroups()
        self.assertEqual(1, len(groups))

    def test014_save_new_product_given_cleint_not_logged_in(self):
        response = self.testApp.post_json('/products', dict(name='Car Wash', topic='new'));
        # status code 302 is for redirection
        # self.assertEqual(response.status_int, 302)
        self.assertEqual(response.status_int, 200)
        
    def test015_save_new_product_given_cleint_is_logged_in_and_not_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        response = self.testApp.post_json('/products', dict(name='Car Wash', topic='new'));
        # status code 302 is for redirection
        #self.assertEqual(response.status_int, 302)
        self.assertEqual(response.status_int, 200)
        
    def test016_save_new_product_given_cleint_is_logged_in_and_is_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        product = dict(name='Car Wash')
        response = self.testApp.post_json('/products', dict(product=product, topic='new'));
        # status code 302 is for redirection and 200 is for normal
        self.assertEqual(response.status_int, 200)
        response = response.json
        self.assertEqual(response['message'], 'New product created successfully')
        # assert if only one element is in the product group list
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(len(response['objects']), 1)
        self.assertEqual(response['objects'][0]['name'], 'Car Wash')

    def test017_delete_product_given_client_is_not_logged_in(self):
        '''
        given: client is not logged in
        when: he deletes a product 
        then: he should not be able to delete the product
        '''
        # create some products  on the server db:
        # first save product groups 
        data = {'name':'Quick Hand Wash'}
        DAO().saveProduct(data)
        data = {'name':'Quick Detergent Powder'}
        DAO().saveProduct(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a product that is to be deleted:
        keyTargetObject = data.json['objects'][0]['key']
        # now this key is to be sent to the server for deleting the group
        # response = self.testApp.get('/products', {'mode':'delete','key':keyTargetObject})
        formData = dict(topic='delete', key=keyTargetObject);
        response = self.testApp.post_json('/products-groups', formData);
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        # DAO gives python objects so no need to use json here
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(2, len(response['objects']))

    def test018_delete_product_given_client_is_logged_in_and_is_not_an_admin(self):
        '''
        given: client is logged in
        and: he is not an admin
        when: he deletes a product 
        then: he should not be able to delete the product
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create some products  on the server db:
        # first save product groups 
        data = {'name':'Quick Hand Wash'}
        DAO().saveProduct(data)
        data = {'name':'Quick Detergent Powder'}
        DAO().saveProduct(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a product that is to be deleted:
        keyTargetObject = data.json['objects'][0]['key']
        # now this key is to be sent to the server for deleting the group
        # response = self.testApp.get('/products', {'mode':'delete','key':keyTargetObject})
        formData = dict(key=keyTargetObject, topic='delete');
        response = self.testApp.post_json('/products-groups', formData);
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'operation not permitted')
        # assert if only one element is in the product group list
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        # DAO gives python objects so no need to use json here
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(2, len(response['objects']))

    def test019_delete_product_given_client_is_logged_in_and_is_an_admin(self):
        '''
        given: client is logged in
        and: he is an admin
        when: he deletes a product 
        then: he should not be able to delete the product
        '''
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create some products  on the server db:
        # first save product groups 
        data = {'name':'Quick Hand Wash'}
        DAO().saveProduct(data)
        data = {'name':'Quick Detergent Powder'}
        DAO().saveProduct(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a product that is to be deleted:
        keyTargetObject = data.json['objects'][0]['key']
        # now this key is to be sent to the server for deleting the group
        #response = self.testApp.get('/products', {'mode':'delete','key':keyTargetObject})
        formData = dict(key=keyTargetObject, topic='delete');
        response = self.testApp.post_json('/products-groups', formData);
        # this converts the json object got from the server to a python dict object:
        response = response.json
        self.assertEqual(response['message'], 'The object deleted successfully.')
        # assert if only one element is in the product group list
        prevCursor = False
        nextCursor = False
        itemsPerFetch = 10
        # DAO gives python objects so no need to use json here
        response = DAO().getProductsByCursor(prevCursor, nextCursor, itemsPerFetch)
        self.assertEqual(1, len(response['objects']))

    def test020_update_products_group_attributes_given_client_is_not_logged_in(self):
        # first save some groups:
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        formData = dict(name='Cleaning Agents', key='keyTargetObject', topic='update');
        response = self.testApp.post_json('/products-groups', formData);
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        # this converts the json object got from the server to a python dict object:
        #response = response.json
        #self.assertEqual(response['message'], 'The object updated successfully.')
        # assert if only one element is in the product group list
        #groups = DAO().getProductsGroups()

    def test021_update_products_group_attributes_given_client_is_logged_in_and_not_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # first save some groups:
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        formData = dict(name='Cleaning Agents', key='keyTargetObject', topic='update');
        response = self.testApp.post_json('/products-groups', formData);
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 302)
        # this converts the json object got from the server to a python dict object:
        #response = response.json
        #self.assertEqual(response['message'], 'The object updated successfully.')
        # assert if only one element is in the product group list
        #groups = DAO().getProductsGroups()

    def test021_update_products_group_attributes_given_client_is_logged_in_and_is_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # first save some groups:
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        group = dict(name='Sunny Products', key=keyTargetObject)
        formData = dict(topic='update', group=group);
        response = self.testApp.post_json('/products-groups', formData);
        # status code 302 is for redirection
        self.assertEqual(response.status_int, 200)
        # this converts the json object got from the server to a python dict object:
        #response = response.json
        #self.assertEqual(response['message'], 'The object updated successfully.')
        # assert if only one element is in the product group list
        #groups = DAO().getProductsGroups()
        keyTarget = ndb.Key(urlsafe=keyTargetObject)
        group = DAO().getProductGroupByKey(keyTarget)
        self.assertEqual(group['name'],'Sunny Products')

    def createFakeData(self):
        # first save some products on the server:
        data = {'name':'Quick Hand Wash'}
        DAO().saveProduct(data)
        data = {'name':'Quick Detergent Powder'}
        DAO().saveProduct(data)
        data = {'name':'Quick Toilet Cleaner'}
        DAO().saveProduct(data)
        data = {'name':'Quick Car Wash'}
        DAO().saveProduct(data)
        # first save some groups:
        # create some product groups on the server db:
        # first save product groups 
        data = {'name':'Cleaning Agents'}
        DAO().saveProductGroup(data)
        data = {'name':'Speciality Chemicals'}
        DAO().saveProductGroup(data)

    def test021_add_products_to_a_group_given_client_is_not_logged_in(self):
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200)        
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        dataToServer = dict(name='Cleaning Agents', key='keyTargetObject', topic='add-products');
        response = self.testApp.post_json('/products-groups', dataToServer);
        #print response.normal_body
        # status code 302 is for redirection and 200 for successful response
        self.assertEqual(response.status_int, 200)
        # this converts the json object got from the server to a python dict object:
        #response = response.json
        #self.assertEqual(response['message'], 'The object updated successfully.')
        # assert if only one element is in the product group list
        #groups = DAO().getProductsGroups()

    def test022_add_products_to_a_group_given_client_is_logged_in_and_not_an_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200)        
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # now this key is to be sent to the server for deleting the group
        dataToServer = dict(name='Cleaning Agents', key='keyTargetObject', topic='add-products');
        response = self.testApp.post_json('/products-groups', dataToServer);
        #print response.normal_body
        # status code 302 is for redirection and 200 for successful response
        self.assertEqual(response.status_int, 200)
        # this converts the json object got from the server to a python dict object:
        #response = response.json
        #self.assertEqual(response['message'], 'The object updated successfully.')
        # assert if only one element is in the product group list
        #groups = DAO().getProductsGroups()

    def test023_add_products_to_a_group_given_client_is_logged_in_is_an_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200) 
        #print data.normal_body
        products = data.json['objects']
        self.assertEqual(len(products), 4)
        # the data is got in form of json objects:
        data = self.testApp.get('/products-groups')
        self.assertEqual(data.status_int, 200)
        #groups = json.dumps(data.normal_body) 
        # get the key of a group that is to be updated:
        keyTargetObject = data.json[0]['key']
        # prepare the product keys to be uploaded to the server:
        productsKeys = []
        for item in products:
            productsKeys.append(item['key'])
        # now this key is to be sent to the server for deleting the group
        dataToServer = dict(group=keyTargetObject,products=productsKeys, topic='add-products');
        response = self.testApp.post_json('/products-groups', dataToServer);
        #print response.normal_body
        # status code 302 is for redirection and 200 for successful response
        self.assertEqual(response.status_int, 200)
        # now test the product groups:
        # get the group by key:

        group = DAO().getProductGroupByKey(ndb.Key(urlsafe=keyTargetObject))
        # get the attached products full data attached to this group:
        products = group['products']
        # now compare with the actual products keys:
        self.assertEqual(products[0]['key'], productsKeys[0])

    def test024_update_product_given_client_is_not_logged(self):
        # first create some products on the server:
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200) 
        #print data.normal_body
        products = data.json['objects']
        self.assertEqual(len(products), 4)
        # now select a product for its name edit:
        # let's take the second product:
        product = products[1]
        # test its name:
        self.assertEqual(product['name'], 'Quick Detergent Powder')
        # now change the name:
        keyTargetObject = product['key']
        # now this key is to be sent to the server for deleting the group
        product = dict(name='Quick Detergent Powder', key=keyTargetObject)
        formData = dict(topic='update', product=product);
        response = self.testApp.post_json('/products', formData);
        self.assertEqual(response.status_int, 200)
        #print response
        response = response.json
        #print response
        self.assertEqual(response['message'], 'Admin A level is required for this operaton!')

    def test025_update_product_given_client_is_logged_in_and_not_an_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = False
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # first create some products on the server:
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200) 
        #print data.normal_body
        products = data.json['objects']
        self.assertEqual(len(products), 4)
        # now select a product for its name edit:
        # let's take the second product:
        product = products[1]
        # test its name:
        self.assertEqual(product['name'], 'Quick Detergent Powder')
        # now change the name:
        keyTargetObject = product['key']
        # now this key is to be sent to the server for deleting the group
        product = dict(name='Quick Detergent Powder', key=keyTargetObject)
        formData = dict(topic='update', product=product);
        response = self.testApp.post_json('/products', formData);
        self.assertEqual(response.status_int, 200)
        #print response
        response = response.json
        #print response
        self.assertEqual(response['message'], 'Admin A level is required for this operaton!')

    def test026_update_product_given_client_is_logged_in_and_is_an_admin(self):
        # user data:
        email = 'sunny@gmail.com'
        id = 'sunny'
        isAdmin = True
        # check that the user is not logged in
        assert not users.get_current_user()
        # make the user logged in:
        self.loginUser(email, id, isAdmin)
        # first create some products on the server:
        # create fake product and groups data:
        self.createFakeData()
        # the data is got in form of json objects:
        data = self.testApp.get('/products')
        self.assertEqual(data.status_int, 200) 
        #print data.normal_body
        products = data.json['objects']
        self.assertEqual(len(products), 4)
        # now select a product for its name edit:
        # let's take the second product:
        product = products[1]
        # test its name:
        self.assertEqual(product['name'], 'Quick Detergent Powder')
        # now change the name:
        keyTargetObject = product['key']
        # now this key is to be sent to the server for deleting the group
        product = dict(name='Quick Detergent Powder Edited', key=keyTargetObject)
        formData = dict(topic='update', product=product);
        response = self.testApp.post_json('/products', formData);
        self.assertEqual(response.status_int, 200)
        #print response
        response = response.json
        #print response
        self.assertEqual(response['message'], 'product group updated successfully')
        # now get the products again
        data = self.testApp.get('/products')
        #print data.normal_body
        products = data.json['objects']
        self.assertEqual(len(products), 4)
        # this is your second product that has been edited:
        product = products[1]
        # test its name:
        self.assertEqual(product['name'], 'Quick Detergent Powder Edited')
