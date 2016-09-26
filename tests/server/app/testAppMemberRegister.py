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
from py.handlers.signupPageHandler import SignupPageHandler as SignupPageHandler
from py.handlers.productGroupHandler import ProductGroupHandler as ProductGroupHandler
from py.handlers.registrationPageHandler import RegistrationPageHandler as  RegistrationPageHandler
from py.handlers.memberPageHandler import MemberPageHandler as MemberPageHandler
#@unittest.skip('AppTest Case')
class AppTestMemberRegister(unittest.TestCase):
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
            ('/signup', SignupPageHandler),
            ('/register', RegistrationPageHandler),
            ('/member', MemberPageHandler),
            ('/products-groups', ProductGroupHandler)

            ])
        # wrap the app with WebTest's AppTest:
        self.testApp=webtest.TestApp(app)

    def tearDown(self):
        self.testbed.deactivate()
        
    #@unittest.skip('Test Main Page Handler')
    def test0001_given_not_memeber_and_loggedin_to_gmail_when_user_clicks_signup(self):
        '''
        given: user is logged to his gmail in and he is not a member and
        he clicks the signup button on the main page
        then: the sign up form is to be served by the 'registration message'
        '''
        # user data:
        nickname = 'pankajche1'
        userId='123'
        # make the user logged in:
        assert not users.get_current_user()
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'pankajche1'
        #self.loginUser(is_admin=True)
        #assert users.is_current_user_admin()
        # now get the response page
        response=self.testApp.get('/signup')
        self.assertEqual(response.status_int, 200)
        # ok it is giving the correct html dom. So I comment it out:
        # print(response)

    #@unittest.skip('Test Main Page Handler')
    def test0002_given_user_is_not_a_member_and_not_loggedin_to_gmail_when_clicks_signup(self):
        '''
          given: user is not logged in to his gmail and he is not a member
          when: he clicks the sign up button
          then: he should go to the google signin panel
        '''
        # make the user logged in:
        assert not users.get_current_user()
        response=self.testApp.get('/signup')
        self.assertEqual(response.status_int, 302)
        #print(response.normal_body)
        strLocation = response.location
        parts = strLocation.split('//')
        # parts[1] is of our concern:
        self.assertEqual(parts[1].split('?')[0], 'www.google.com/accounts/Login')
        self.assertEqual(parts[2], 'localhost/signup')


    def test0003_given_user_is_a_member_and_loggedin_to_gmail_when_clicks_signup(self):
        '''
          given: user is logged in to his gmail and he is a member
          when: he clicks the sign up button
          then: he should go to his profile home page
        '''
        # create a user in the database:
        # first create some users in the db:
        DbManager().createUsers()
        prevCursor=None
        nextCursor=None
        members = DAO().getMembersByCursor(prevCursor, nextCursor, 10)
        self.assertEqual(len(members['objects']), 10)
        self.assertEqual(members['objects'][0]['name'], 'user-email-0')
        # now make one user logged in to the google account:
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-1'
        # now goto the signup route:
        response=self.testApp.get('/signup')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/member')

    def test0004_given_user_is_not_a_member_and_not_loggedin_to_gmail_when_clicks_signin(self):
        response = self.testApp.get('/signin')
        self.assertEqual(response.status_int, 302)
        strLocation = response.location
        parts = strLocation.split('//')
        # parts[1] is of our concern:
        self.assertEqual(parts[1].split('?')[0], 'www.google.com/accounts/Login')
        self.assertEqual(parts[2], 'localhost/signin')

    def test0005_given_user_is__a_member_and_not_loggedin_to_gmail_when_clicks_signin(self):
        response = self.testApp.get('/signin')
        self.assertEqual(response.status_int, 302)
        # 'https://www.google.com/accounts/Login?continue=http%3A//localhost/signin'
        strLocation = response.location
        parts = strLocation.split('//')
        # parts[1] is of our concern:
        self.assertEqual(parts[1].split('?')[0], 'www.google.com/accounts/Login')
        self.assertEqual(parts[2], 'localhost/signin')

    def test0006_given_user_is_not_a_member_and_is_loggedin_to_gmail_when_clicks_signin(self):
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-1'
        # now goto the signup route:
        response=self.testApp.get('/signin')
        # it should redirect to the /signup route:
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/signup')
        
    def test0007_given_user_is_a_member_and_is_loggedin_to_gmail_when_clicks_signin(self):
        # first create some users in the db:
        DbManager().createUsers()
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-1'
        # now goto the signup route:
        response=self.testApp.get('/signin')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/member')

    def test0008_given_user_is_not_loggedin_to_gmail_when_been_directed_to_register(self):
        response = self.testApp.get('/register')
        self.assertEqual(response.status_int, 302)
        strLocation = response.location
        parts = strLocation.split('//')
        # parts[1] is of our concern:
        self.assertEqual(parts[1].split('?')[0], 'www.google.com/accounts/Login')
        self.assertEqual(parts[2], 'localhost/register')

    def test0009_given_user_is_loggedin_to_gmail_and_a_member_when_been_directed_to_register(self):
        DbManager().createUsers()
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-1'
        # now goto the signup route:
        response=self.testApp.get('/register')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/member')

    def test0010_given_user_is_loggedin_to_gmail_and_not_a_member_when_been_directed_to_register(self):
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        # now goto the signup route:
        response=self.testApp.get('/register')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')        
        #print response # gives print of the actual page

    def test0011_given_user_is_not_loggedin_to_gmail_when_been_directed_to_member_page(self):
        response=self.testApp.get('/member')
        self.assertEqual(response.status_int, 302)
        strLocation = response.location
        parts = strLocation.split('//')
        # parts[1] is of our concern:
        self.assertEqual(parts[1].split('?')[0], 'www.google.com/accounts/Login')
        self.assertEqual(parts[2], 'localhost/member')

    def test0012_given_user_is_loggedin_to_gmail_and_not_a_member_when_been_directed_to_member_page(self):
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        # now goto the signup route:
        response=self.testApp.get('/member')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 302)
        self.assertEqual(response.location, 'http://localhost/signup')

    def test0013_given_user_is_loggedin_to_gmail_and_is_a_member_when_been_directed_to_member_page(self):
        # create some users:
        DbManager().createUsers()
        # make a user logged in:
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        # now goto the member route:
        response=self.testApp.get('/member')
        # it should redirect to the /member route:
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')        
        #print response # gives print of the actual page
