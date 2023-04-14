from flask import Blueprint, jsonify, request
from app import conn
from app.model.role import Role
from app.model.users import Users
from app.service.accountService import AccountService
from app.service.userService import UserService
import jwt

class AccountController():
    def __init__(self):
        self.api_account = Blueprint('api_account',__name__)
        self.session = conn.Session()
        self.account_service = AccountService(self.session)
        self.user_service = UserService(self.session)

        # Login and set token
        @self.api_account.route('/login', methods =['POST'])
        def check_acc():
            data = request.get_json()
            username = data['username']
            password = data['password']
            try:
                account = self.account_service.check_account(username, password)
                user = self.user_service.get_by_account_id(account.id)
                payload_role = {'role': account.role_id}
                secret_key = 'secret_key'
                token_role = jwt.encode(payload_role, secret_key, algorithm='HS256')
                response = jsonify({'message': 'Login success!',
                                    'users': Users.to_json(user)
                                    })
                token_role_string = token_role.encode("utf-8").decode("utf-8")
                response.set_cookie('token_role', token_role_string, httponly=True, secure=True)
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})
            
        # CREATE ACCOUNT
        @self.api_account.route('/add_account/<int:role>', methods = ['POST'])
        def add_account(role):
            data = request.get_json()
            username = data['username']
            password = data['password']
            try:
                new_account = self.account_service.create_account(username, password, role)
                response = jsonify({'message': 'Add account success!', "account": new_account.to_json()})
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})
