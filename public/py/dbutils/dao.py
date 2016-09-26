import json
import datetime
import time
from google.appengine.api import users
from py.models.product import Product as Product
from py.models.productGroup import ProductGroup as ProductGroup
from py.models.user import User as User
from py.models.userDetail import UserDetails as UserDetails

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

    def getProductByKey(self, key):
        dictObj = None
        try:
            product = key.get()
            dictObj = self.to_dict(product)
            dictObj['key'] = product.key.urlsafe()
        except:
            dictObj = None
        return dictObj  
        
    def saveProductGroup(self, data):
        '''
        saves the product group on the database
        '''
        response = {'info':'','error':'true','message':''}
        productGroup = ProductGroup(name=data['name'])
        # save the product 
        productGroup.put()
        response['error']='false'
        response['message']='New product Group created successfully'
        return response
   
    def getProductsGroups(self, isProducts=False):
        '''
        here if you want to get the keys of the products attached with
        the groups then you give isProducts True
        '''
        groups = ProductGroup.getProductsGroups()
        dto = []  
        for obj in groups:
            dictObj = self.to_dict(obj)
            if isProducts == False:
                # put an empty list in place of products keys
                # though not a good solution putting empty keys after processing
                # so try to write better codes
                dictObj['products'] = []
            dictObj['key'] = obj.key.urlsafe()
            dto.append(dictObj)
        return dto  


    def getProductGroupByKey(self, key):
        response = {'message':'','error':''}
        group = None
        if key is not None:
            group = key.get()
        if group is None:
            response['message']='no product group was found!'
            response['error']='true'
            return response
        # process it for the attached products data:
        productsKeys = group.products
        products = []
        for key in productsKeys:
            product = self.getProductByKey(key)
            if product is not None:
                product['key'] = key.urlsafe()
                products.append(product)
        # get the products full info:
        dictObj = self.to_dict(group)
        dictObj['key'] = group.key.urlsafe()
        # add the products to the dto:
        dictObj['products'] = products
        return dictObj  

    def deleteProductGroup(self, key):
        response = {'message':'The object deleted successfully.','error':False}
        try:
            key.delete()
        except:
            response['error'] = True
            response['message'] = 'There is some error in deleting the object.'
        return response

    def updateProductGroup(self, key, data):
        targetMember = None
        response = {'info':'','error':'true','message':''} 
        if key is not None:
            targetGroup = key.get()
        if targetGroup is None:
            response['message']='no product group was found!'
            response['error']='true'
            return response
        # 1 name
        if data.has_key('name'):
            targetGroup.name = data['name']
        # 2 TODO next attribute
        #if data.has_key('gender'):
            #user.gender = data['gender']
        try:
            targetGroup.put()
        except:
            response['message']='some error in updating!'
            response['error']='true'
            return response

        response['message']='product group updated successfully'
        response['error']='false'
        return response

    def addProductsToGroup(self, groupKey, productsKeys):
        response = {'info':'','error':'true','message':''} 
        targetGroup = None
        if groupKey is not None:
            targetGroup = groupKey.get()
        if targetGroup is None:
            response['message']='no product group was found!'
            response['error']='true'
            return response
        # now put the products in this group
        targetGroup.products = productsKeys
        try:
            targetGroup.put()
        except:
            response['message']='some error in adding products to this group!'
            response['error']='true'
            return response

        response['message']='products added to the group successfully!'
        response['error']='false'
        return response


    def deleteProduct(self, key):
        response = {'message':'The object deleted successfully.','error':False}
        try:
            key.delete()
        except:
            response['error'] = True
            response['message'] = 'There is some error in deleting the object.'
        return response

    def updateProduct(self, data):
        response = {'info':'','error':'true','message':''}
        key = data['key']
        if key is not None:
            targetProduct = key.get()
        if targetProduct is None:
            response['message']='no product was found!'
            response['error']='true'
            return response
        # get the product's attributes here:
        # 1 name
        if data.has_key('name'):
            targetProduct.name = data['name']
        # 2 TODO next attribute
        #if data.has_key('gender'):
            #user.gender = data['gender']
        try:
            targetProduct.put()
            response['message']='product updated successfully'
            response['error']='false'
        except:
            response['message']='some error in updating the product!'
            response['error']='true'
        return response

    def getUser(self, nickName, isRaw=False):
        '''
          this gets user data from the datastore
          nickname : on google it is only the user name without the @gmail thing
          isRaw means that if you want a pure python model datastore object then make it True
        '''
        data=None
        user=None
        # first get the user:
        q = User.query(User.nickname == nickName)
        users = q.fetch()
        isNickNameFound=False
        if len(users) > 0:
            user = users[0] 
        if user != None:
            if isRaw:
                data = user
            else:
                data={'nickName':user.nickname,'userId':user.userId,'level':user.level}
        return data


    def getMembersByCursor(self, prevCursor, nextCursor, itemsPerFetch):
        ''' 
        get the registered members list:
        '''
        # response from the User model:
        # res =  {'objects': objects, 'prev': prev, 'next': next_, 'prev_offset': prev_offset, 'next_offset': next_offset}
        res = User.cursor_pagination(prevCursor, nextCursor, itemsPerFetch)
        # conver the objects returned to json objects
        #q = User.query()
        #usersDb, nextCursor, more = q.fetch_page(50)
        usersDto = []  
        for obj in res['objects']:
            userDict = self.to_dict(obj)
            userDict['key'] = obj.key.urlsafe()
            usersDto.append(userDict)
        res['objects'] = usersDto
        return res  


