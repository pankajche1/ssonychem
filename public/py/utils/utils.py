import json
import datetime
import time

class Utils():
    @classmethod
    def to_dict(cls, model):
        SIMPLE_TYPES = (int, long, float, bool, dict, basestring, list)
        output = {}
        # properties are common coding things like obj.name, obj.age 'dot nomenclature thing'
        # here key will get those attribute like 'name', 'age' etc
        for key, prop in model._properties.iteritems():
            value = getattr(model, key)
            if  value  is   None   or  isinstance(value, SIMPLE_TYPES):
                output[key] = value
            elif isinstance(value, datetime.date):
                ms = time.mktime(value.utctimetuple()) * 1000
                ms += getattr(value, 'microseconds', 0) / 1000
                output[key] = int(ms)
        return output


