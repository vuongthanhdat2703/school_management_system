from flask import Blueprint, jsonify, request
from app.model.account import Account
from app.model.users import Users
from app import conn
import jwt


acc = Blueprint('accountController',__name__)
session = conn.Session()

# Login and set token
@acc.route('/login', methods =['POST'])
def check_acc():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user =session.query(Account).filter(Account.username == username, Account.password == password).first()
    if user:
        payload = {'role': user.role}
        secret_key = 'secret_key'
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return jsonify({'message': 'Login success!', 'token': token.format('utf-8')})
    else:
        return jsonify({'message': 'Invalid username or password'})
    


@acc.route('/get', methods =['GET'])
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