'''
module for user of the site who is a memeber
'''
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor

class User(ndb.Model):
    '''
    This represents the user
    :param name: name of the user give by him
    :param userId: it is some number and converts to full gmail address
    :param nickName: it is only the username without the @gmail.com thing. DON'T USE THIS TO VARIFY THE REGISTERED MEMBER
    :param email: email given by the user
    :type userId:string object 

    '''
    name = ndb.StringProperty()
    nameLower = ndb.ComputedProperty(lambda self: self.name.lower())
    # only this property is stable. Use this property to varify a user:
    userId = ndb.StringProperty()
    nickname = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    country = ndb.StringProperty()
    #gender = ndb.IntegerProperty(indexed=False)
    gender = ndb.StringProperty()
    occupation = ndb.StringProperty()
    created = ndb.DateTimeProperty( auto_now_add=True)
    edited = ndb.DateTimeProperty(auto_now=True)
    # admin level
    level = ndb.StringProperty(indexed=False)
    avatarKey = ndb.KeyProperty()

    @classmethod
    def offset_pagination(cls, offset, items):
        """Pagination through query offset
        param: itmes: total number of items that you want to get in one time

        """
 
        if offset:
            try:
                offset = int(offset)
            except ValueError:
                offset = 0
 
        objects, next_cursor, more = cls.query().order(cls.name).fetch_page(items, offset=offset)
        #objects, next_cursor, more = cls.query().fetch_page(items, offset=offset)
        prev_offset = max(offset - items, 0)
        prev = True if offset else False
        next_ = True if more else False
        next_offset = ''
        if next_:
            next_offset = offset + items
        return {'objects': objects, 'prev': prev, 'next': next_, 'prev_offset': prev_offset, 'next_offset': next_offset}

    @classmethod
    def getPageGroup(cls, iPage):
        nMaxItemsPerPage = 10
        # number of pages you want to show in the pagination bar as digits like 1 2 3 4 5
        nMaxPages = 5
        # number of pages in the current group:
        nPages = 0
        # max number of items per group:
        nMaxItemsPerGroup = nMaxItemsPerPage * nMaxPages
        # current data:
        nItems = 0
        # is next page is available
        isNext = False
        # no cursor at first
        cursor = Cursor()
        # get all objects of the first group:
        objects, nextCursor, more = cls.query().order(cls.nameLower).fetch_page(nMaxItemsPerGroup, start_cursor=cursor)
        nItems = len(objects)
        isNextGroup = True if more else False
        # get the desired objects:
        # decide the index:
        # 4/5 gives decimal , 4//5 gives only quotent , 4%5 gives reminder
        iStart = iPage % nMaxPages - 1
        iLast = iStart + nMaxItemsPerPage - 1
        # objects to be given to client:
        objsOut = []
        for i in range(iStart, iLast+1):
            if i < nItems:
                objsOut.append(objects[i])
        '''
        while isNext is True:
            # this is the next page:
            nPages = nPages + 1
            if nPages > nMaxPages:
                nPages = nPages - 1
                break
            cursor = nextCursor 
            objs, nextCursor, more = cls.query().order(cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            isNext = True if more else False
        '''
        return { 'objects': objsOut, 'iPage':iPage, 'nPages':nPages,'nItems':nItems,'next':isNextGroup ,'iStart':iStart,
                    'iLast':iLast}

    @classmethod
    def cursor_pagination(cls, prev_cursor_str, next_cursor_str, nItems):
        if not prev_cursor_str and not next_cursor_str:
            cursor = Cursor()
            objects, next_cursor, more = cls.query().order(cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            prev_cursor_str = cursor.urlsafe()
            next_cursor_str = next_cursor.urlsafe()
            next_ = True if more else False
            prev = False
        elif next_cursor_str:
            cursor = Cursor(urlsafe=next_cursor_str)
            objects, next_cursor, more = cls.query().order(cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            prev_cursor_str = next_cursor_str
            next_cursor_str = next_cursor.urlsafe()
            prev = True
            next_ = True if more else False
        elif prev_cursor_str:
            cursor = Cursor(urlsafe=prev_cursor_str)
            objects, next_cursor, more = cls.query().order(-cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            objects.reverse()
            next_cursor_str = prev_cursor_str
            prev_cursor_str = next_cursor.urlsafe()
            prev = True if more else False
            next_ = True
        return {'members': objects, 'next_cursor': next_cursor_str, 
                 'prev_cursor': prev_cursor_str, 'prev': prev, 'next': next_}

    @classmethod
    def getCount(cls):
        return cls.query().count()
    
    @classmethod
    def get_by_user(cls, user):
        '''
        when a user signs in his user_id will be obtained then it will be used
        to varify if he is registered with our site:
        :param user: google account user object that is got by users.get_current_user() method
        '''
        return cls.query().filter(cls.userId == user.user_id()).get()

    @classmethod
    def get_by_user_id(cls, user_id):
        '''
        when a user signs in his user_id will be obtained then it will be used
        to varify if he is registered with our site:
        :param user: google account user object that is got by users.get_current_user() method
        '''
        return cls.query().filter(cls.userId == user_id).get()
