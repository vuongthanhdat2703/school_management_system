from flask import jsonify
from app.model.account import Account
import re
from unidecode import unidecode
from app.service.roleService import RoleService

class AccountService():
    def __init__(self, session):
        self.session = session

    def check_account(self, username, password):
        check_username = self.session.query(Account).filter(Account.username == username).first()
        check_password = self.session.query(Account).filter(Account.password == password).first()
        user = self.session.query(Account).filter(Account.username == username, Account.password == password).first()
        if not check_username:
            raise ValueError('Incorrect account')
        elif not check_password:
            raise ValueError('Incorrect password')
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
        check_account = self.session.query(Account).filter(Account.username == username, Account.password == password).first()
        if check_account:
            raise ValueError('Account already exists')
        new_account = Account(username, password, role)
        self.session.add(new_account)
        self.session.commit()
        return new_account
