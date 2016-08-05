import os
import webapp2
import jinja2
from google.appengine.api import users
#from py.models.user import User as User
#from py.dbutils.dao import DAO as DAO
#from py.data.welcomePageText import WelcomePageContent as WelcomePageContent

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)

class MainHandler(webapp2.RequestHandler):
        
    def get(self):
        data={
                    'name':'pankaj'
        }
        # create template
        template = env.get_template('guest/index.html')
        self.response.write(template.render(data))

