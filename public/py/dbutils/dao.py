import json
import datetime
import time
from google.appengine.api import users
from py.models.product import Product as Product

class DAO:
    def __init__(self):
        pass

    def to_dict(self, model):
        SIMPLE_TYPES = (int, long, float, bool, dict, basestring, list)
        output = {}
        # properties are common coding things like obj.name, obj.age 'dot nomenclature thing'
        # here key will get those attribute like 'name', 'age' etc
        for key, prop in model._properties.iteritems():
            value = getattr(model, key)
            if key == 'imageKey':
                if value is None:
                    output[key] = 'images/product-image.png'
                else:
                    output[key] = value.urlsafe()
                continue
            if  value  is   None   or  isinstance(value, SIMPLE_TYPES):
                output[key] = value
            elif isinstance(value, datetime.date):
                ms = time.mktime(value.utctimetuple()) * 1000
                ms += getattr(value, 'microseconds', 0) / 1000
                output[key] = int(ms)
        return output


    def saveProduct(self, data):
        ''' 
        save the products saved on the server database
        '''
        response = {'info':'','error':'true','message':''}
        product = Product(name=data['name'])
        # save the product 
        product.put()
        response['error']='false'
        response['message']='New product created successfully'
        return response


    def getProductsByCursor(self, prevCursor, nextCursor, itemsPerFetch):
        ''' 
        get the products list:
        '''
        res = Product.getProductsByCursorPagination(prevCursor,
                                        nextCursor, itemsPerFetch)
        productsDto = []  
        for obj in res['objects']:
            productDict = self.to_dict(obj)
            productDict['key'] = obj.key.urlsafe()
            productsDto.append(productDict)
        res['objects'] = productsDto
        return res  
