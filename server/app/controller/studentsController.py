import os
from flask import Blueprint, jsonify, request, url_for
from app import conn
from app.service.studentService import StudentService, Students , Users
import json


api_students = Blueprint('api_students',__name__)
session = conn.Session()
student_service = StudentService(session)

@api_students.route("/get_students", methods = ["GET"])
def get_students():
    students_db = session.query(Students).all()

    students_list = []
    for students in students_db:
        students_dict = {
            'student': students.to_json()
        }
        students_list.append(students_dict)

    return jsonify(students_list)

@api_students.route("/get_student_byID/<int:user_id>", methods = ["GET"])
def get_student_byID(user_id):
    student_db = session.query(Students).filter(Students.user_id == user_id).all()
    students_list = []
    for student in student_db:
        students_dict = {
            'student': student.to_json()
        }
        students_list.append(students_dict)

    return jsonify(students_list)

@api_students.route("/add_students/<int:account_id>", methods = ["POST"])
def add_students(account_id):
    check_user = session.query(Users).filter(Users.account_id == account_id).first()
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
        student_service.add_student(account_id, lastName, firstName, email, phone, avatar, gender, birthDay)
        response = jsonify({'message': 'Students added successfully'})
        return response
    except ValueError as e:
        return jsonify({'message': str(e)})