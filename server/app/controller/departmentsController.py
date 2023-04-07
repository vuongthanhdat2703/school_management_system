import json
from flask import Blueprint, jsonify, request
from app import conn
from app.service.departmentService import DepartmentService, Users

api_departments = Blueprint('api_departments',__name__)
session = conn.Session()
departmentService = DepartmentService(session)

@api_departments.route("/add_department/<int:account_id>", methods = ["POST"])
def add_department(account_id):
    check_user = session.query(Users).filter(Users.account_id == account_id).first()
    if check_user:
        return jsonify({'message': 'User already exists'})
    department = json.loads(request.form["department"])
    # return jsonify({'a': department})
    lastName = department['lastName']
    firstName = department['firstName']
    email = department['email']
    phone = department['phone']
    departments_name = department['departments_name']
    start_date = department['start_date']
    try:
        departmentService.add_department(account_id, lastName, firstName, email, phone, departments_name, start_date)
        response = jsonify({'message': 'Department added successfully'})
        return response
    except ValueError as e:
        return jsonify({'message': str(e)})
