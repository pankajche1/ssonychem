import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from py.dbutils.dao_user import UserDAO as UserDAO
#from py.data.userData import UserData as UserData

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class RegistrationPageHandler(webapp2.RequestHandler):

    userDao = UserDAO()

    def saveUser(self, user):
        # now we want to save this user to the db:
        memberData = {'nickname':user['nickname'], 'userId':user['userId'], 'isAdmin':user['isAdmin']}
        return self.userDao.saveUser(memberData)

    def get(self):
        #self.userDao = UserDAO()
        user = self.userDao.getUser()
        if user: # if user is not None means he is logged in to his google account
            # now process the user info, to see if he is the member of the site
            if user['isMember'] == True:
                self.redirect('/member')
            else: # the google user is not them member of our site:
                # save this user who is logged in with his google account
                response = self.saveUser(user)
                template = env.get_template('guest/register.html')
                self.response.write(template.render(response))

        else: # user not logged in to the google account
            # create a login uri for the gmail:
            userLink = users.create_login_url(self.request.uri)
            # at this point take the user directly to the gmail account login:
            self.redirect(userLink)



       

