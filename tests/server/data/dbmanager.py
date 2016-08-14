import json
import datetime

from py.models.user import User as User
#from py.dbutils.dao import DAO as DAO

class DbManager:
    def __init__(self):
        pass

    def createUsers(self, num=10):
       ''' creates 10 members of the site by default
       '''
       for i in range(0,num):
            nickName = 'user-email-'+str(i)
            userId = nickName + '@gmail.com'
            name = nickName
            data = {'nickName': nickName,
                    'userId': userId,
                    'name': name}
            DAO().saveUser(data)

    def getUsers(self):
        ''' gets users list from google data store'''
        q = User.query()
        users = q.fetch()
        return users
 


