from google.appengine.ext import ndb

class Boy(ndb.Model):
    name = ndb.StringProperty()
    address= ndb.StringProperty()
