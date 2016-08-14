import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class MemberPageHandler(webapp2.RequestHandler):
        
    def get(self):
        # check if the user is logged in already:
        # check if the user is logged in:
        user = users.get_current_user()
        msg = ''
        data = { }
        template = env.get_template('guest/index.html')
        if user:
            # user is a gmail user
            # check if the user is a registerd member of the site:
            userNickName = user.nickname()
            isUserAdmin = users.is_current_user_admin()
            # if the user is not an admin then take to the guest page
            if(isUserAdmin == True):
                template = env.get_template('admin/a/index.html')
                self.response.write(template.render(data))
            else:
                self.redirect('/')
        else:
            # the flow of the program will go to the google account signin page
            userLink = users.create_login_url(self.request.uri)
            self.redirect(userLink)

