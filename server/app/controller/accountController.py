from flask import Blueprint, jsonify, request
from app import conn
<<<<<<< HEAD
from app.model.role import Role
from app.service.accountService import AccountService
import jwt

class AccountController():
    def __init__(self):
        self.api_account = Blueprint('api_account',__name__)
        self.session = conn.Session()
        self.account_service = AccountService(self.session)

        # Login and set token
        @self.api_account.route('/login', methods =['POST'])
        def check_acc():
            data = request.get_json()
            username = data['username']
            password = data['password']
            try:
                user = self.account_service.check_account(username, password)
                payload = {'role': user.role_id}
                secret_key = 'secret_key'
                token = jwt.encode(payload, secret_key, algorithm='HS256')
                response = jsonify({'message': 'Login success!', "role": Role.to_json(user.role)})
                token_string = token.encode("utf-8").decode("utf-8")
                response.set_cookie('token', token_string, httponly=True, secure=True)
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
=======
from app.model.account import Account
from app.model.users import Users
from app.model.role import Role
import jwt


api_account = Blueprint('api_account',__name__)
session = conn.Session()

# Login and set token
@api_account.route('/login', methods =['POST'])
def check_acc():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user =session.query(Account).filter(Account.username == username, Account.password == password).first()
    if user:
        payload = {'role': user.role_id}
        secret_key = 'secret_key'
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        response = jsonify({'message': 'Login success!', "role": Role.to_json(user.role)})
        response.set_cookie('token', token.encode("utf-8"), httponly=True, secure=True)
        return response
    else:
        return jsonify({'message': 'Invalid username or password'})

# CREATE ACCOUNT
@api_account.route('/add_account/<int:role>', methods = ['POST'])
def add_account(role):
    data = request.get_json()
    username = data['username']
    password = data['password']
    role_check = session.query(Role).filter(Role.id == role).first()
    if role_check is None:
        return jsonify({'message': 'Role does not exist'})
    else:
        new_account = Account(username=username, password=password, role_id=role)
        check_user = session.query(Account).filter(Account.username == username).first()
        if(check_user):
            return jsonify({'message': 'Username already exists'})
        else:
            session.add(new_account)
            session.commit()
            return jsonify({'message': 'Add account success!', 'account': new_account.to_json()})


@api_account.route('/get_users', methods =['GET'])
def get_users():
    users_db = session.query(Users).all()

    users_list = []
    for user in users_db:
        user_dict = {
            'user': user.to_json()
        }
        users_list.append(user_dict)

    return jsonify(users_list)
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
