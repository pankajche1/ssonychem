'''
module for user of the site who is a memeber
'''
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor

class UserDetails(ndb.Model):
    '''
    This saves other details of the user
    :param memberKey: key of the basic member

    '''
    memberKey = ndb.KeyProperty()
    officeEmails = ndb.StringProperty(repeated=True,indexed=False)
    # 0: only private, 1: only friends, 2: only members, 3: public
    showOfficeEmails = ndb.IntegerProperty(repeated=True,indexed=False)
    personalEmails = ndb.StringProperty(repeated=True,indexed=False)
    # 0: only private, 1: only friends, 2: only members, 3: public
    showPersonalEmails = ndb.IntegerProperty(repeated=True,indexed=False)
    officePhones = ndb.StringProperty(repeated=True, indexed=False)
    showOfficePhones = ndb.IntegerProperty(repeated=True,indexed=False)
    personalPhones = ndb.StringProperty(repeated=True, indexed=False)
    showPersonalPhones = ndb.IntegerProperty(repeated=True,indexed=False)
    cities = ndb.StringProperty(repeated=True, indexed=False)
    birthCity = ndb.StringProperty(indexed=False)
    homeTowns = ndb.StringProperty(repeated=True, indexed=False)
    states = ndb.StringProperty(repeated=True,indexed=False)
    maritalStatus = ndb.BooleanProperty(indexed=False)
    birthDate = ndb.DateProperty()
    countries = ndb.StringProperty(repeated=True,indexed=False)
    #gender = ndb.IntegerProperty(indexed=False)
    created = ndb.DateTimeProperty( auto_now_add=True)
    edited = ndb.DateTimeProperty(auto_now=True)
    
