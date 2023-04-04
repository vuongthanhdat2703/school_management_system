from flask import Blueprint, jsonify, request
from app import conn
from app.model.role import Role
from app.service.accountService import AccountService
import jwt

api_account = Blueprint('api_account',__name__)
session = conn.Session()
account_service = AccountService(session)

# Login and set token
@api_account.route('/login', methods =['POST'])
def check_acc():
    data = request.get_json()
    username = data['username']
    password = data['password']
    try:
        user = account_service.check_account(username, password)
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
@api_account.route('/add_account/<int:role>', methods = ['POST'])
def add_account(role):
    data = request.get_json()
    username = data['username']
    password = data['password']
    try:
        new_account = account_service.create_account(username, password, role)
        response = jsonify({'message': 'Add account success!', "account": new_account.to_json()})
        return response
    except ValueError as e:
        return jsonify({'message': str(e)})
