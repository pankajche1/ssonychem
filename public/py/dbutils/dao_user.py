import json
import datetime
import time
from google.appengine.api import users
from py.models.product import Product as Product
from py.models.productGroup import ProductGroup as ProductGroup
from py.models.user import User as User
from py.models.userDetail import UserDetails as UserDetails

class UserDAO:
    '''
    This class will do all the user data related operations
    '''
    def __init__(self):
        pass
    
    def getUser(self):
        # it should give these infos like isUserAdmin, isUserMember, etc
        user = users.get_current_user()
        if user is None:
            return None
        # now do operations with the user
        # this is the email name without @gmail.com thing
        nickname = user.nickname()
        isAdmin = users.is_current_user_admin()
        userId = user.user_id()
        # get the User entity from the db:
        member = User.get_by_user(user)
        isMember = False
        memberInfo = None
        if member is not None:
            memberInfo = {'name':member.name, 'level':member.level, 'key':member.key.urlsafe()}
            isMember = True
        user = { 'nickname': nickname,
                 'userId': userId,
                 'isAdmin': isAdmin,
                 #'logoutUrl': users.create_logout_url('/'),
                 'isMember': isMember,
                 'memberInfo': memberInfo
            }
        return user

    def saveUser(self, userIn):
        '''
        :param userIn: userIn is a dict object and it has keys
                       (i) userId, (ii) nickname, [(iii) name], [(iv) level]
        '''
        # this is a dict object:
        response = {'info':'','error': False,'message':''}
        nickname = userIn['nickname']
        userId = userIn['userId']
        user = User(nickname= nickname, 
                userId=userIn['userId'], level='guest')
        if userIn.has_key('name'):
            user.name = userIn['name']
        else:
            user.name = nickname
        if userIn.has_key('level'):
            user.level = userIn['level']
        isUserFound=False
        curUser = User.get_by_user_id(userId)
        if curUser is not None:
            isUserFound= True
        if isUserFound == True:
            response['error']= True
            response['message']= 'User with this id already exists.'
        else:
            # create user:
            try:
                user.put()
                response['error']= False
                response['message']='New User created successfully'
                memberKey = user.key
                # create a details entry in the db for this user: 
                details = UserDetails(memberKey=memberKey)
                try:
                    details.put()
                    response['message']=response['message']+' and Details created successfully.'
                except:
                    response['error']= True
                    response['message']=response['message']+' but Details could not be created.'
            except:
                response['error']= True
                response['message']='There was error in creating user'
        return response

    def deleteMember(self, key):
        response = {'message':'The member deleted successfully.','error':False}
        try:
            key.delete()
        except:
            response['error'] = True
            response['message'] = 'There is some error in deleting the member.'
        return response

    def getTemplate(self, env, user):

        if user['isAdmin'] == True:
            template = env.get_template('member/admin/a/index.html')
            return template
        level = user['memberInfo']['level']
        if level == 'admin-a':
            template = env.get_template('member/admin/a/index.html')
        elif level == 'admin-b':
            template = env.get_template('member/admin/b/index.html')
        else:
            template = env.get_template('member/general/index.html')
        return template


        
            

