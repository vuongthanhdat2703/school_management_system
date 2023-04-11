from flask import Blueprint, jsonify, request
from app import conn
from app.service.studentService import StudentService, Users
import json

class StudentController():
    def __init__(self):
        self.api_students = Blueprint('api_students',__name__)
        self.session = conn.Session()
        self.student_service = StudentService(self.session)

        @self.api_students.route("/delete_student/<int:student_id>", methods = ["POST"])
        def delete_student(student_id):
            self.student_service.delete_student(student_id)
            response = jsonify({'message': 'Students deleted successfully'})
            return response

        @self.api_students.route("/get_students", methods = ["GET"])
        def get_students():
            list = self.student_service.get_all()
            return jsonify(list)

        @self.api_students.route("/get_student_byID/<int:user_id>", methods = ["GET"])
        def get_student_byID(user_id):
            list = self.student_service.get_by_id(user_id)
            return jsonify(list)

        @self.api_students.route('/add_students/<int:account_id>', methods = ["POST"])
        def add_students(account_id):
            check_user = self.session.query(Users).filter(Users.account_id == account_id).first()
            if check_user:
                return jsonify({'message': 'User already exists'})
            
            student = json.loads(request.form["student"])
            lastName = student['lastName']
            firstName = student['firstName']
            email = student['email']
            phone = student['phone']
            avatar = request.files["avatar"]
            # avatar.save(os.path.join('app', 'static', 'images', "x.png"))
            gender = student['gender']
            birthDay = student['birthDay']
            try:
                self.student_service.add_student(account_id, lastName, firstName, email, phone, avatar, gender, birthDay)
                response = jsonify({'message': 'Students added successfully'})
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})