from app.model.account import Account
import re
from unidecode import unidecode
from app.service.roleService import RoleService

class AccountService():
    def __init__(self, session):
        self.session = session

    def check_account(self, username, password):
        user = self.session.query(Account).filter(Account.username == username, Account.password == password).first()
        if not user:
            raise ValueError('Incorrect account or password')
        return user
    


    def valid_user(self, username):
        if len(username) < 6:
            raise ValueError('username must be more than 6 characters')
        
        if not re.match('^[a-zA-Z0-9_]+$', username):
            raise ValueError('Contains no characters or numbers')
        
        if not all(c.isalpha() and unidecode(c) in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' for c in username):
            raise ValueError('Contains no characters or numbers')

    def valid_password(self, password):
        if len(password) < 6 or len(password) > 10:
            raise ValueError('Password must be from 6 - 10')

    def create_account(self, username, password, role):
        RoleService(self.session).check_role(role)
        self.valid_user(username)
        self.valid_password(password)
        check_account = self.check_account(username, password)
        if check_account != None:
            raise ValueError('Username already exists')
        new_account = Account(username, password, role)
        self.session.add(new_account)
        self.session.commit()
        return new_account
