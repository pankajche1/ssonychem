import unittest
import webapp2
import webtest
import json 
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from google.appengine.api import users
#import rajput
from py.dbutils.dao_user import UserDAO as UserDAO
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
from py.handlers.membersPageHandler import MembersPageHandler as MembersPageHandler
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
            ('/members', MembersPageHandler),
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
        members = UserDAO().getUsersByCursor(prevCursor, nextCursor, 10)
        self.assertEqual(len(members['members']), 10)
        self.assertEqual(members['members'][0]['name'], 'user-email-0')
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

    def test0014_given_user_is_not_loggedin_gmail_and_is_a_not_a_member_when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')
        members = res.json['members']
        self.assertEqual(len(members), 0)

    #@unittest.skip('Test member info')
    def test0015_given_user_is_not_loggedin_gmail_and_is_a_member_when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        # make a registered user logged in:
        #nickname='user-email-1'
        #userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        #DbManager().loginUser(self.testbed, userId, nickname)
        #assert users.get_current_user().nickname() == 'user-email-1'
        # get a member key:
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')        
        #print response # gives print of the actual page
        members = res.json['members']
        self.assertEqual(len(members), 0)

    def test0015_given_user_is_loggedin_gmail_and_is_not_a_member_when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        # make a registered user logged in:
        #nickname='user-email-1'
        #userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        #DbManager().loginUser(self.testbed, userId, nickname)
        #assert users.get_current_user().nickname() == 'user-email-1'
        # make some gmail user logged in who is not a member of the site:
        nickname='unknown'
        userId = 'unknown-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'unknown'
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')        
        #print response # gives print of the actual page
        members = res.json['members']
        self.assertEqual(len(members), 0)
        
    def test0016_given_user_is_loggedin_gmail_and_is_a_member_and_is_level_guest_when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        # make a registered user logged in:
        # by default all users are level guest
        nickname='user-email-1'
        userId = 'user-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-1'
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')        
        #print response # gives print of the actual page
        members = res.json['members']
        self.assertEqual(len(members), 0)

    def test0016_given_user_is_loggedin_gmail_and_is_a_not_a_member_and_is_app_admin__when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        # make a registered user logged in:
        # by default all users are level guest
        nickname='pankaj'
        userId = 'app-admin' # this id is IMP. cz this will be userd to get the member from the db
        isAppAdmin = True
        DbManager().loginUser(self.testbed, userId, nickname, isAppAdmin)
        assert users.get_current_user().nickname() == 'pankaj'
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')        
        #print response # gives print of the actual page
        members = res.json['members']
        self.assertEqual(len(members), 10)

    def test0017_given_user_is_loggedin_gmail_and_is_a_member_and_is_level_a_when_fetches_members_list(self):
        # create some users:
        DbManager().createUsers()
        userDao = UserDAO()
        # change level of 
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        # now use this key to get a member:
        # you are using dao object so convert this key to python database key object:
        key = ndb.Key(urlsafe=key)
        member = userDao.getMemberByKey(key)
        self.assertEqual(member['level'], 'guest')
        # update the member level:
        level = 'admin-a'
        res = userDao.updateMemberLevel(key, level)
        self.assertEqual(res['error'], False)
        # now get the same member again:
        member = userDao.getMemberByKey(key)
        self.assertEqual(member['level'], 'admin-a')
        self.assertEqual(member['nickname'], 'user-email-0')        
        self.assertEqual(member['userId'], 'user-id-0')        
        # make a registered user logged in:
        # by default all users are level guest
        nickname='user-email-0'
        userId = 'user-id-0' # this id is IMP. cz this will be userd to get the member from the db
        isAppAdmin = False
        DbManager().loginUser(self.testbed, userId, nickname, isAppAdmin)
        assert users.get_current_user().nickname() == 'user-email-0'
        res=self.testApp.get('/members')
        # it should redirect to the /member route:
        self.assertEqual(res.status_int, 200)
        self.assertEqual(res.content_type, 'application/json')        
        #print response # gives print of the actual page
        members = res.json['members']
        self.assertEqual(len(members), 10)

    def test0018_given_user_is_not_loggedin_gmail_when_changes_the_level_of_a_member(self):
        # create some users
        DbManager().createUsers()
        userDao = UserDAO()
        # get the members:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        member = userDao.getMemberByKey(ndb.Key(urlsafe=key))
        self.assertEqual(member['level'], 'guest')
        # now user '/members' POST route to change the level of this user:
        # java script data is this:
        # var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
        newLevel = 'admin-a'
        targetMember = dict(key=key, level=newLevel)
        formData = dict(topic='update-level', member=targetMember);
        res = self.testApp.post_json('/members', formData);
        self.assertEqual(res.status_int, 200)
        #print response
        res = res.json
        #print response
        self.assertEqual(res['message'], 'Client must be logged in to his account to do this operation.')

    def test0019_given_user_is_loggedin_gmail_and_not_a_member_when_changes_the_level_of_a_member(self):
        # create some users
        DbManager().createUsers()
        userDao = UserDAO()
        # get the members:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        member = userDao.getMemberByKey(ndb.Key(urlsafe=key))
        self.assertEqual(member['level'], 'guest')
        # now make a client who wants to change the level of the target member:
        nickname='unknown'
        userId = 'unknown-id-1' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'unknown'
        # now user '/members' POST route to change the level of this user:
        # java script data is this:
        # var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
        newLevel = 'admin-a'
        targetMember = dict(key=key, level=newLevel)
        formData = dict(topic='update-level', member=targetMember);
        res = self.testApp.post_json('/members', formData);
        self.assertEqual(res.status_int, 200)
        #print response
        res = res.json
        #print response
        self.assertEqual(res['message'], 'Client must have proper admin level to do this operation.')

    def test0020_given_user_is_loggedin_gmail_and_a_member_and_has_level_guest_when_changes_the_level_of_a_member(self):
        # create some users
        DbManager().createUsers()
        userDao = UserDAO()
        # get the members:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        member = userDao.getMemberByKey(ndb.Key(urlsafe=key))
        self.assertEqual(member['level'], 'guest')
        # now make a client who wants to change the level of the target member:
        nickname='user-email-2'
        userId = 'user-id-2' # this id is IMP. cz this will be userd to get the member from the db
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-2'
        # now user '/members' POST route to change the level of this user:
        # java script data is this:
        # var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
        newLevel = 'admin-a'
        targetMember = dict(key=key, level=newLevel)
        formData = dict(topic='update-level', member=targetMember);
        res = self.testApp.post_json('/members', formData);
        self.assertEqual(res.status_int, 200)
        #print response
        res = res.json
        #print response
        self.assertEqual(res['message'], 'Client must have proper admin level to do this operation.')

    def test0021_given_user_is_loggedin_gmail_and_a_member_and_has_level_admin_a_when_changes_the_level_of_a_member(self):
        # create some users
        DbManager().createUsers()
        userDao = UserDAO()
        # get the members:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        member = userDao.getMemberByKey(ndb.Key(urlsafe=key))
        self.assertEqual(member['level'], 'guest')
        # now make a client who wants to change the level of the target member:
        nickname='user-email-2'
        userId = 'user-id-2' # this id is IMP. cz this will be userd to get the member from the db
        # get a key of a target member: [the key is urlsafe already]
        keyClient = members[2]['key']
        # now use this key to get a member:
        # you are using dao object so convert this key to python database key object:
        keyClient = ndb.Key(urlsafe=keyClient)
        client = userDao.getMemberByKey(keyClient)
        self.assertEqual(client['level'], 'guest')
        # update the member level:
        levelClient = 'admin-a'
        res = userDao.updateMemberLevel(keyClient, levelClient)
        self.assertEqual(res['error'], False)
        # now get the same member again:
        client = userDao.getMemberByKey(keyClient)
        self.assertEqual(client['level'], 'admin-a')
        self.assertEqual(client['nickname'], 'user-email-2')        
        self.assertEqual(client['userId'], 'user-id-2')        
        # make the client logged in:
        DbManager().loginUser(self.testbed, userId, nickname)
        assert users.get_current_user().nickname() == 'user-email-2'
        # now user '/members' POST route to change the level of this user:
        # java script data is this:
        # var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
        newLevel = 'admin-a'
        targetMember = dict(key=key, level=newLevel)
        formData = dict(topic='update-level', member=targetMember);
        res = self.testApp.post_json('/members', formData);
        self.assertEqual(res.status_int, 200)
        #print response
        res = res.json
        #print response
        self.assertEqual(res['message'], 'Member level  updated successfully')

    def test0021_given_user_is_loggedin_gmail_and_app_admin_when_changes_the_level_of_a_member(self):
        # create some users
        DbManager().createUsers()
        userDao = UserDAO()
        # get the members:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        member = userDao.getMemberByKey(ndb.Key(urlsafe=key))
        self.assertEqual(member['level'], 'guest')
        # make the client logged in:
        nickname='pankaj'
        userId = 'app-admin' # this id is IMP. cz this will be userd to get the member from the db
        isAppAdmin = True
        DbManager().loginUser(self.testbed, userId, nickname, isAppAdmin)
        assert users.get_current_user().nickname() == 'pankaj'
        # now user '/members' POST route to change the level of this user:
        # java script data is this:
        # var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
        newLevel = 'admin-a'
        targetMember = dict(key=key, level=newLevel)
        formData = dict(topic='update-level', member=targetMember);
        res = self.testApp.post_json('/members', formData);
        self.assertEqual(res.status_int, 200)
        #print response
        res = res.json
        #print response
        self.assertEqual(res['message'], 'Member level  updated successfully')

