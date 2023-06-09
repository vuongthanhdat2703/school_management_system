import json

from app import conn
from app.service.departmentService import DepartmentService, Users
from flask import Blueprint, Response, jsonify, request
from app.service.userService import UserService


class DepartmentController():
    def __init__(self):
        self.api_departments = Blueprint('api_departments', __name__)
        self.session = conn.Session()
        self.departmentService = DepartmentService(self.session)
        self.user_service = UserService(self.session)

        @self.api_departments.route("/get_department_byID_user/<int:id>", methods=["GET"])
        def get_department_byID_user(id):
            user = self.user_service.get_user_id(id)
            deparment = self.departmentService.get_by_userID(user.id)
            response = jsonify({"deparment": deparment.to_json()})
            return response

        @self.api_departments.route("/get_departments", methods=["GET"])
        def get_students():
            list = self.departmentService.get_all()
            return jsonify(list)

        @self.api_departments.route("/get_department_byID/<int:id>", methods=["GET"])
        def get_student_byID(id):
            list = self.departmentService.get_by_id(id)
            return jsonify(list)

        @self.api_departments.route("/add_department/<int:account_id>", methods=["POST"])
        def add_department(account_id):
            check_user = self.session.query(Users).filter(
                Users.account_id == account_id).first()
            if check_user:
                return Response(
                    'The response body goes here',
                    status=400,
                )
            department = json.loads(request.form["department"])
            lastName = department['lastName']
            firstName = department['firstName']
            email = department['email']
            phone = department['phone']
            departments_name = department['departments_name']
            start_date = department['start_date']
            try:
                self.departmentService.add_department(
                    account_id, lastName, firstName, email, phone, departments_name, start_date)
                response = jsonify(
                    {'message': 'Department added successfully'})
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})

        @self.api_departments.route("/update_department/<int:id>", methods=["POST"])
        def update_department(id):
            try:
                department = json.loads(request.form["department"])
                print(str(department))
                lastName = department['lastName']
                firstName = department['firstName']
                email = department['email']
                phone = department['phone']
                departments_name = department['departments_name']
                start_date = department['start_date']

                self.departmentService.update_departments(
                    id, lastName, firstName, email, phone, departments_name, start_date)
                response = jsonify(
                    {'message': 'Department update successfully'})
                return response
            except ValueError as e:
                return {"error": str(e)}
            except Exception as e:
                return {"error": str(e)}

        @self.api_departments.route("/delete_department/<int:id>", methods=["DELETE"])
        def delete_department(id):
            self.departmentService.delete_department(id)
            response = jsonify({'message': 'Deparment deleted successfully'})
            return response
