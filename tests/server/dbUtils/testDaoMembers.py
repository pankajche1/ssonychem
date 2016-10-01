import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from py.dbutils.dao_user import UserDAO as UserDAO
#from py.dbutils.adminDao import AdminDAO as AdminDAO
from utils.dbmanager import DbManager as DbManager
#from py.models.project import Project as Project
#from py.models.service import Service as Service
from google.appengine.api import users
from py.models.user import User as User

#@unittest.skip('DAO Testcase')
class DaoMemberTestCase(unittest.TestCase):

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

    def test_0001_remove_nickname_confustion_over_google_account(self):
        '''
        this is just for removing the confusion over google account thing
        You notice in the above loginUser() function
        here what we do that we set 'user_email', 'user_id', 'nickname' variables ourself.
        So all this will be used in your code processing.
        '''
        nickname='pankajche1' # don't give gmail thing
        id = 'user-123'
        user = users.get_current_user()
        assert not user
        # make user logged in:
        DbManager().loginUser(self.testbed, id, nickname)
        user = users.get_current_user()
        isAdmin = users.is_current_user_admin()
        userId = user.user_id()
        userNickName = user.nickname()
        self.assertEqual(userNickName, 'pankajche1')
        self.assertEqual(userId, 'user-123')                
        
    def test_0002_save_new_user_to_db(self):
        '''
        Given: all user data is available for save in the handler
        When: the user data is given to the dao object
        Then: it is saved as new user

        '''
        # prepare some user info:
        name = 'Pankaj Kumar'
        # google account info:
        userId = 'user-999'
        nickname = 'pankajche1'
        # make the user login to the google account:
        # make user logged in:
        DbManager().loginUser(self.testbed, userId, nickname)
        # now get the user info
        user = UserDAO().getUser()
        assert user
        self.assertEqual(user['nickname'], 'pankajche1')
        self.assertEqual(user['isMember'], False)
        self.assertEqual(user['memberInfo'], None)
        # now we want to save this user to the db:
        memberData = {'nickname':nickname, 'userId':userId}
        UserDAO().saveUser(memberData)
        # now check if the user is saved or not as a member:
        user = UserDAO().getUser()
        assert user
        self.assertEqual(user['nickname'], 'pankajche1')
        self.assertEqual(user['isMember'], True)
        assert user['memberInfo']

    def test_0003_given_member_exits_when_user_saved_with_same_id(self):
        '''
        Given: A member already in the database as a member
        When: a new user is save as a member with the same user id
        Then: it should now allow saving this member
        '''
        # prepare some user info:
        name = 'Pankaj Kumar'
        # google account info:
        userId = 'user-999'
        nickname = 'pankajche1'
        # save this user:
        memberData = {'nickname':nickname, 'userId':userId, 'name':name}
        response = UserDAO().saveUser(memberData)        
        # now save the same user again:
        memberData = {'nickname':nickname, 'userId':userId, 'name':name}
        response = UserDAO().saveUser(memberData)
        # now check if the user is saved or not as a member:
        self.assertEqual(response['message'], 'User with this id already exists.')

    def test_0004_delelte_a_member(self):
        # first save a user as member:
        name = 'Pankaj Kumar'
        # google account info:
        userId = 'user-999'
        nickname = 'pankajche1'
        # save this user:
        memberData = {'nickname':nickname, 'userId':userId, 'name':name}
        UserDAO().saveUser(memberData)        
        # now get this user:
        user = User.get_by_user_id(userId)
        assert user
        # this is python class object. so dot method will work
        self.assertEqual(user.nickname, 'pankajche1')
        # get key of the database object:
        key = user.key
        # now delete:
        response = UserDAO().deleteMember(key)
        self.assertEqual(response['message'], 'The member deleted successfully.')        

    def test_0005_get_users_by_cursor_pagination(self):
        # create 95 members on the site:
        DbManager().createUsers(95)
        # now get these users by cursor pagination:
        members = UserDAO().getUsersByCursor(None, None, 10)['members']
        self.assertEqual(len(members), 10);
        # test some names:
        self.assertEqual(members[0]['nickname'], 'user-email-0')

    def test_0006_get_user_by_key(self):
        # create 95 members on the site:
        DbManager().createUsers(95)
        userDao = UserDAO()
        # now get these users by cursor pagination:
        members = userDao.getUsersByCursor(None, None, 10)['members']
        # get a key of a target member: [the key is urlsafe already]
        key = members[0]['key']
        # now use this key to get a member:
        # you are using dao object so convert this key to python database key object:
        key = ndb.Key(urlsafe=key)
        member = userDao.getMemberByKey(key)
        assert member
        self.assertEqual(member['nickname'], 'user-email-0')

    def test_0007_update_member_level(self):
        DbManager().createUsers(95)
        userDao = UserDAO()
        # now get these users by cursor pagination:
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

# [START main]h
if __name__ == '__main__':
    unittest.main()
# [END main]
