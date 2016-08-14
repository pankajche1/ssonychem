import json
import datetime
from py.models.product import Product as Product
from py.dbutils.dao import DAO as DAO

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

    def getUsers(self):
        ''' gets users list from google data store'''
        #q = User.query()
        #users = q.fetch()
        #return users
        pass
