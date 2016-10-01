import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao_user import UserDAO as UserDAO
from py.models.product import Product as Product
from google.appengine.ext import ndb

class MembersPageHandler(webapp2.RequestHandler):

    def updateMemberLevel(self, body):
        userDao = UserDAO()
        res = {'error':True, 'message':''}
        try:
            member = body['member']
        except:
            res['error'] = True
            res['message'] = "There is some error in form!"
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))
            return
        # now get the user who is trying to change this data:
        user = userDao.getUser()
        if user is None: # means user is not logged in to gmail
            res['error'] = True
            res['message'] = "Client must be logged in to his account to do this operation."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))
        else: # user is logged in to gmail
            if userDao.isAuth(user) == True:
                res = userDao.updateMemberLevel(ndb.Key(urlsafe=member['key']), member['level'])
            else: # operation not allowed without this level
                res['error'] = True
                res['message'] = "Client must have proper admin level to do this operation."
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))



    def getMemberByKey(self, userDao, key, user):
        key = ndb.Key(urlsafe=key)
        if user is None: # means user is not logged in to gmail
            res = None
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))
        else: # user is logged in to gmail
            if userDao.isAuth(user) == True:
                res = userDao.getMemberByKey(key)
            else:
                res = None
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))
        
    def get(self):
        userDao = UserDAO()
        topic =  self.request.get('topic')
        user = userDao.getUser()
        if topic == "single": # get a single member by key
            # key of the target member:
            key = self.request.get('key')
            self.getMemberByKey(userDao, key, user)
        else: # get a list of members
            # only a user who is a member admin-a or admin-b level can get this members list:
            # a 'topic' comes with this request
            itemsPerFetch = 100
            prev_cursor = self.request.get('prev_cursor', '')
            next_cursor = self.request.get('next_cursor', '')
            if user is None: # means user is not logged in to gmail
                res = userDao.getUsersByCursor(prev_cursor, next_cursor, itemsPerFetch, False) # last argument is for empty data
                self.response.headers['Content-Type'] = 'application/json'
                self.response.out.write(json.dumps(res))
            else: # user is logged in to gmail
                isAuth = userDao.isAuth(user)
                if isAuth == True: # user is app admin or a member admin a status
                    res = userDao.getUsersByCursor(prev_cursor, next_cursor, itemsPerFetch)
                else:
                    res = userDao.getUsersByCursor(prev_cursor, next_cursor, itemsPerFetch, False) # last argument is for empty data
                self.response.headers['Content-Type'] = 'application/json'
                self.response.out.write(json.dumps(res))

    def post(self):
        res = {'info':'','error':True,'message':''}
        body =  json.loads(self.request.body)
        try:
            topic = body['topic']
        except:
            res['error'] = True
            res['message'] = 'There is no topic in the request.'
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))
            return
        if topic == 'update-level':
            self.updateMemberLevel(body)
        else:
            res['error'] = True
            res['message'] = 'The topic with any of our services.'
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(res))

