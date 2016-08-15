'''
model for a product of the company 
'''
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor

class Product(ndb.Model):
    '''
    This represents the Product
    :param name: name of the product
    :param groupKey: group in which the product has been put

    '''
    name = ndb.StringProperty()
    nameLower = ndb.ComputedProperty(lambda self: self.name.lower())
    created = ndb.DateTimeProperty( auto_now_add=True)
    edited = ndb.DateTimeProperty(auto_now=True)
    imageKey = ndb.KeyProperty()
    groupKey = ndb.KeyProperty()

    @classmethod
    def getProductsByCursorPagination(cls, prev_cursor_str, next_cursor_str, nItems):

        if not prev_cursor_str and not next_cursor_str:
            cursor = Cursor()
            objects, next_cursor, more = cls.query().order(cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            if len(objects) != 0:
                prev_cursor_str = cursor.urlsafe()
                next_cursor_str = next_cursor.urlsafe()
            else:
                prev_cursor_str = False
                next_cursor_str = False
            next_ = True if more else False
            prev = False
        elif next_cursor_str:
            cursor = Cursor(urlsafe=next_cursor_str)
            objects, next_cursor, more = cls.query().order(cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            if len(objects) != 0:
                prev_cursor_str = next_cursor_str
                next_cursor_str = next_cursor.urlsafe()
            else:
                prev_cursor_str = False
                next_cursor_str = False
            prev = True
            next_ = True if more else False
        elif prev_cursor_str:
            cursor = Cursor(urlsafe=prev_cursor_str)
            objects, next_cursor, more = cls.query().order(-cls.nameLower).fetch_page(nItems, start_cursor=cursor)
            objects.reverse()
            if len(objects) != 0:
                next_cursor_str = prev_cursor_str
                prev_cursor_str = next_cursor.urlsafe()
            else:
                prev_cursor_str = False
                next_cursor_str = False
            prev = True if more else False
            next_ = True
        return {'objects': objects, 'next_cursor': next_cursor_str, 
                 'prev_cursor': prev_cursor_str, 'prev': prev, 'next': next_}
