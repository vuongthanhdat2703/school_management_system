from flask import Blueprint, jsonify, request
from app import conn
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


@api_account.route('/get', methods =['GET'])
def get_users():
    users_db = session.query(Users).all()

    users_list = []
    for user in users_db:
        user_dict = {
            'id': user.id,
            'account': Account.to_json(user.account),
            'lastName': user.lastName,
            'firstName': user.firstName,
            'email': user.email,
            'phone': user.phone
        }
        users_list.append(user_dict)

    return jsonify(users_list)