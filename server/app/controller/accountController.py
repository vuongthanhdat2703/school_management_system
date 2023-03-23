from flask import Blueprint, jsonify, request
from app.model.account import Account
from app.model.users import Users
from app import conn

acc = Blueprint('accountController',__name__)
session = conn.Session()

@acc.route('/login', methods =['POST'])
def check_acc():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user =session.query(Account).filter(Account.username == username, Account.password == password).first()
    if user:
        return jsonify({'message': 'Login success!', 'role': user.role})
    else:
        return jsonify({'message': 'Invalid username or password'})

@acc.route('/get', methods =['GET'])
def get_users():
    # Lấy danh sách users
    users_db = session.query(Users).all()

    # Tạo danh sách các user dưới dạng dictionary
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

    # Trả về danh sách users dưới dạng JSON
    return jsonify(users_list)