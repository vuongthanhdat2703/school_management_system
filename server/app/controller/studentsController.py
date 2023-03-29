from flask import Blueprint, jsonify, request, url_for
from app import conn
from werkzeug.utils import secure_filename
import os
from app.model.students import Students
from app.model.users import Users
import json


api_students = Blueprint('api_students',__name__)
session = conn.Session()

@api_students.route("/get_students", methods = ["GET"])
def get_students():
    students_db = session.query(Students).all()

    students_list = []
    for students in students_db:
        students_dict = {
            'id': students.id,
            'id_users': Users.to_json(students.user_id),
            'images': students.images,
            'gender': students.gender,
            'birthDay': students.birthDay
        }
        students_list.append(students_dict)

    return jsonify(students_list)

@api_students.route("/add_students/<int:account_id>", methods = ["POST"])
def add_students(account_id):
    student = json.loads(request.form["student"])
    avatar = request.files["avatar"]
    lastName = student['lastName']
    firstName = student['firstName']
    email = student['email']
    phone = student['phone']

    filename = secure_filename(avatar.filename)
    if not os.path.exists('static/images'):
        os.makedirs('static/images')
    avatar.save(os.path.join('static', 'images', filename))
    images = url_for('static', filename=filename)

    gender = student['gender']
    birthDay = student['birthDay']
    check_user = session.query(Users).filter(Users.account_id == account_id).first()
    if check_user:
        return jsonify({'message': 'User already exists'})
    user = Users(account_id=account_id, lastName=lastName, firstName=firstName, email=email, phone=phone)
    session.add(user)
    session.commit()

    students = Students(user_id=user.id, images=images, gender=gender, birthDay=birthDay)
    session.add(students)
    session.commit()
    return jsonify({'message': 'Students added successfully'})