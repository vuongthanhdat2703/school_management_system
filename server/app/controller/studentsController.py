import json
import os

from app import conn
from app.service.studentService import StudentService, Users
from app.service.departmentService import DepartmentService
from app.service.userService import UserService
from app.service.manageService import ManageService
from flask import Blueprint, jsonify, request, url_for
from werkzeug.utils import secure_filename


class StudentController():
    def __init__(self):
        self.api_students = Blueprint('api_students', __name__)
        self.session = conn.Session()
        self.user_service = UserService(self.session)
        self.student_service = StudentService(self.session)
        self.department_service = DepartmentService(self.session)
        self.manage = ManageService(self.session)

        @self.api_students.route("/get_students", methods=["GET"])
        def get_students():
            list = self.student_service.get_all()
            return jsonify(list)

        @self.api_students.route("/get_student_byID_user/<int:id>", methods=["GET"])
        def get_student_byID_user(id):
            user = self.user_service.get_user_id(id)
            student = self.student_service.get_by_userID(user.id)
            response = jsonify({"student": student.to_json()})
            return response

        @self.api_students.route("/get_student_byID/<int:id>", methods=["GET"])
        def get_student_byID(id):
            list = self.student_service.get_by_id(id)
            return jsonify(list)

        @self.api_students.route('/add_students/<int:account_id>', methods=["GET", "POST"])
        def add_students(account_id):
            if request.method == "GET":
                department = self.department_service.get_name()
                return department
            elif request.method == "POST":
                check_user = self.session.query(Users).filter(
                    Users.account_id == account_id).first()
                if check_user:
                    return jsonify({'message': 'User already exists'})
                # add from form
                student = json.loads(request.form["student"])
                lastName = student['lastName']
                firstName = student['firstName']
                email = student['email']
                phone = student['phone']
                avatar = request.files["avatar"]
                gender = student['gender']
                birthDay = student['birthDay']
                department_id = student['department_id']
                try:
                    # add student_table
                    fileName = secure_filename(str(account_id) + '_avatar.jpg')
                    if not os.path.exists('app/static/images/students'):
                        os.makedirs('app/static/images/students')
                    avatar.save(os.path.join('app', 'static',
                                'images', 'students', fileName))
                    url_avatar = os.path.join(
                        'app', 'static', 'images', 'students', fileName)
                    new_student = self.student_service.add_student(
                        account_id, lastName, firstName, email, phone, url_avatar, gender, birthDay)
                    # add manage
                    self.manage.add_manager(department_id, new_student.id)
                    response = jsonify(
                        {'message': 'Students added successfully'})
                    return response
                except ValueError as e:
                    return jsonify({'message': str(e)})

        @self.api_students.route("/delete_student/<int:id>", methods=["DELETE"])
        def delete_student(id):
            self.student_service.delete_student(id)
            response = jsonify({'message': 'Students deleted successfully'})
            return response

        @self.api_students.route("/delete_selected_student", methods=["DELETE"])
        def delete_selected_student():
            try:
                data = request.get_json()
                selected_students = data["selected_students"]
                for student_id in selected_students:
                    print(student_id)
                    self.student_service.delete_student(student_id)
                return {"message": "Selected student have been deleted."}
            except Exception as e:
                print(str(e))
                return {"error": "Failed to delete selected student."}

        @self.api_students.route("/update_student/<int:id>", methods=["POST"])
        def update_student(id):
            try:
                student = json.loads(request.form["student"])
                lastName = student['lastName']
                firstName = student['firstName']
                email = student['email']
                phone = student['phone']
                avatar = request.files["avatar"]
                gender = student['gender']
                birthDay = student['birthDay']
                if avatar:
                    fileName = secure_filename(str(id) + '_avatar.jpg')
                    if not os.path.exists('app/static/images/students'):
                        os.makedirs('app/static/images/students')
                    avatar.save(os.path.join('app', 'static',
                                'images', 'students', fileName))
                    url_avatar = os.path.join(
                        'app', 'static', 'images', 'students', fileName)
                # update profile student
                update_student = self.student_service.update_students(
                    id, lastName, firstName, email, phone, url_avatar, gender, birthDay)
                return {"message": "Update student successfully", "student": update_student.to_json()}
            except ValueError as e:
                return {"error": str(e)}
            except Exception as e:
                print(str(e))
                return {"error": "Failed to update student"}
