from flask import Blueprint, jsonify, request
from app import conn
from app.model.students import Students
from app.model.users import Users


api_students = Blueprint('accountController',__name__)
session = conn.Session()

@api_students.route("/get_students", methods = ["GET"])
def get_students():
    students_db = session.query(Students).all()

    students_list = []
    for students in students_db:
        students_dict = {
            'id': students.id,
            'id_users': Users.to_json(students.id_users),
            'image': students.image,
            'gender': students.gender,
            'birthDay': students.birthDay
        }
        students_list.append(students_dict)

    return jsonify(students_list)

@api_students.route("/add_students/<int:account_id>", methods = ["POST"])
def add_students(account_id):
    data = request.get_json()
    lastName = data['lastName']
    firstName = data['firstName']
    email = data['email']
    phone = data['phone']

    images = data['images']
    gender = data['gender']
    birthDay = data['birthDay']

    user = Users(account_id=account_id, lastName=lastName, firstName=firstName, email=email, phone=phone)
    session.add(user)
    session.commit()

    students = Students(user_id=user.id, image=images, gender=gender, birthDay=birthDay)
    session.add(students)
    session.commit()

    return jsonify({'message': 'Students added successfully'})
