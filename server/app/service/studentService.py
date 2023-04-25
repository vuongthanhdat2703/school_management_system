import os

from app.model.account import Account
from app.model.students import Student, Users
from app.service.accountService import AccountService
from app.service.manageService import ManageService
from app.service.userService import UserService
from flask import url_for
from PIL import Image
from werkzeug.utils import secure_filename


class StudentService():
    def __init__(self, session):
        self.session = session

    def get_all(self):
        db = self.session.query(Student).all()
        list_db = []
        for student in db:
            student_dict = {
                'student': student.to_json()
            }
            list_db.append(student_dict)
        return list_db

    def get_by_userID(self, id):
        student = self.session.query(Student).filter(
            Student.user_id == id).first()
        return student

    def get_by_id(self, id):
        db = self.session.query(Student).filter(Student.id == id).all()
        list_db = []
        for student in db:
            students_dict = {
                'student': student.to_json()
            }
            list_db.append(students_dict)
        return list_db

    def add_student(self, account_id, lastName, firstName, email, phone, avatar, gender, birthDay):
        try:
            UserService(self.session).valid_user(
                account_id, lastName, firstName, email, phone)
            user = UserService(self.session).add_user(
                account_id, lastName, firstName, email, phone)
            # url_avatar = self.valid_image(avatar, account_id)
            new_student = Student(user.id, avatar, gender, birthDay)
            self.session.add(new_student)
            self.session.commit()
            return new_student
        except Exception as e:
            self.session.rollback()
            raise e

    def update_students(self, id, lastName=None, firstName=None, email=None, phone=None, avatar=None, gender=None, birthDay=None):
        update_student = self.session.query(
            Student).filter(Student.id == id).first()
        UserService(self.session).update_user(
            update_student.user_id, lastName, firstName, email, phone)
        if not update_student:
            raise ValueError("Invalid student ID")
        if avatar:
            update_student.images = avatar
        if gender:
            update_student.gender = gender
        if birthDay:
            update_student.birthDay = birthDay
        self.session.commit()
        return update_student

    def delete_student(self, id):
        student = self.session.query(Student).filter(Student.id == id).first()
        if student:
            avatar_path = student.images
            if os.path.exists(avatar_path):
                os.remove(avatar_path)
            ManageService(self.session).delete_manage(id)
            self.session.delete(student)
            self.session.commit()
            user = UserService(self.session).delete_user(student.user_id)
            AccountService(self.session).delete_account(user.account_id)
        else:
            raise ValueError('Student not found')

    def valid_image(self, avatar, account_id):
        if not self.is_valid_image(avatar):
            raise ValueError('File is not a valid image')
        fileName = secure_filename(str(account_id) + '_avatar.jpg')
        if not os.path.exists('app/static/images/students'):
            os.makedirs('app/static/images/students')
        avatar.save(os.path.join('app', 'static',
                    'images', 'students', fileName))
        return fileName

    def is_valid_image(self, file):
        try:
            image = Image.open(file)
            image.verify()
            return True
        except:
            return False
