from flask import Blueprint, jsonify, request
from app import conn
from app.service.studentService import StudentService, Users
import json
from werkzeug.utils import secure_filename
from flask import url_for
import os


class StudentController():
    def __init__(self):
        self.api_students = Blueprint('api_students', __name__)
        self.session = conn.Session()
        self.student_service = StudentService(self.session)

        @self.api_students.route("/get_students", methods=["GET"])
        def get_students():
            list = self.student_service.get_all()
            return jsonify(list)

        @self.api_students.route("/get_student_byID/<int:id>", methods=["GET"])
        def get_student_byID(id):
            list = self.student_service.get_by_id(id)
            return jsonify(list)

        @self.api_students.route('/add_students/<int:account_id>', methods=["POST"])
        def add_students(account_id):
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
            try:
                fileName = secure_filename(str(account_id) + '_avatar.jpg')
                if not os.path.exists('app/static/images/students'):
                    os.makedirs('app/static/images/students')
                avatar.save(os.path.join('app', 'static',
                            'images', 'students', fileName))
                url_avatar = os.path.join(
                    'app', 'static', 'images', 'students', fileName)
                self.student_service.add_student(
                    account_id, lastName, firstName, email, phone, url_avatar, gender, birthDay)
                response = jsonify({'message': 'Students added successfully'})
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

        @self.api_students.route("/update_student/<int:id>", methods=["PUT"])
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
