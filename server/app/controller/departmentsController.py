import json
from flask import Blueprint, jsonify, request
from app import conn
from app.service.departmentService import DepartmentService, Users

class DepartmentController():
    def __init__(self):
        self.api_departments = Blueprint('api_departments',__name__)
        self.session = conn.Session()
        self.departmentService = DepartmentService(self.session)

        @self.api_departments.route("/get_departments", methods = ["GET"])
        def get_students():
            list = self.departmentService.get_all()
            return jsonify(list)

        @self.api_departments.route("/get_department_byID/<int:id>", methods = ["GET"])
        def get_student_byID(id):
            list = self.departmentService.get_by_id(id)
            return jsonify(list)

        @self.api_departments.route("/add_department/<int:account_id>", methods = ["POST"])
        def add_department(account_id):
            check_user = self.session.query(Users).filter(Users.account_id == account_id).first()
            if check_user:
                return jsonify({'message': 'User already exists'})
            department = json.loads(request.form["department"])
            lastName = department['lastName']
            firstName = department['firstName']
            email = department['email']
            phone = department['phone']
            departments_name = department['departments_name']
            start_date = department['start_date']
            try:
                self.departmentService.add_department(account_id, lastName, firstName, email, phone, departments_name, start_date)
                response = jsonify({'message': 'Department added successfully'})
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})
            
        @self.api_departments.route("/update_department/<int:id>", methods = ["POST"])
        def update_department(id):
            try:
                department = json.loads(request.form["department"])
                lastName = department['lastName']
                firstName = department['firstName']
                email = department['email']
                phone = department['phone']
                departments_name = department['departments_name']
                start_date = department['start_date']
                self.departmentService.update_departments(id, lastName, firstName, email, phone, departments_name, start_date)
                response = jsonify({'message': 'Department update successfully'})
                return response
            except ValueError as e:
                return {"error": str(e)}
            except Exception as e:
                print(str(e))
                return {"error": "Failed to update department"}