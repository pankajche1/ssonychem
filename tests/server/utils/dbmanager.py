import json
import datetime
from py.models.product import Product as Product
from py.dbutils.dao import DAO as DAO
from py.dbutils.dao_user import UserDAO as UserDAO
from py.models.user import User as User


class DbManager:
    def __init__(self):
        pass

    def createProducts(self, num=10):
       ''' save 10 products 
       '''
       for i in range(0,num):
            name = 'product-'+str(i)
            data = {'name': name}
            DAO().saveProduct(data)

    def createProductsGroups(self, num=10):
        dao = DAO()
        for i in range(0,num):
            name = 'Product-Group-'+str(i)
            data = {'name': name}
            dao.saveProductGroup(data)

    def createUsers(self, num=10):
       ''' creates 10 members of the site by default
       '''
       for i in range(0,num):
            nickname = 'user-email-'+str(i)
            userId = 'user-id-'+str(i)
            name = nickname
            data = {'nickname': nickname,
                    'userId': userId,
                    'name': name}
            response = UserDAO().saveUser(data)

    def getUsers(self):
        ''' gets users list from google data store'''
        q = User.query()
        users = q.fetch()
        return users
 
    def loginUser(self, testbed, id, nickname, isAdmin=False):
        '''
        note: here user_email parameter is necessary to be given
        '''
        testbed.setup_env(
            user_email=nickname,
            user_id=id,
            user_is_admin='1' if isAdmin else '0',
            overwrite=True)

