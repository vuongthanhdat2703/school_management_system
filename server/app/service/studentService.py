from app.model.students import Student, Users
from app.model.account import Account
from werkzeug.utils import secure_filename
from flask import url_for
import os
from PIL import Image
from app.service.manageService import ManageService
from app.service.userService import UserService
from app.service.accountService import AccountService

class StudentService():
    def __init__(self, session):
        self.session = session

    def get_all(self):
        db = self.session.query(Student).all()
        list_db = []
        for student in db:
            student_dict = {
            'subject': student.to_json()
            }
            list_db.append(student_dict)
        return list_db
    
    def get_by_id(self, user_id):
        db = self.session.query(Student).filter(Student.user_id == user_id).all()
        list_db = []
        for student in db:
            students_dict = {
                'student': student.to_json()
            }
            list_db.append(students_dict)
        return list_db

    def delete_student(self, id):
        ManageService(self.session).delete_manage(id)
        student = self.session.query(Student).filter(Student.id == id).first()
        self.session.delete(student)
        self.session.commit()
        user = UserService(self.session).delete_user(student.user_id)
        AccountService(self.session).delete_account(user.account_id)

    def add_student(self, account_id, lastName, firstName, email, phone, avatar, gender, birthDay):
        try:
            UserService(self.session).valid_user(lastName, firstName, email, phone)
            url_avatar = self.valid_image(avatar)
            user = UserService(self.session).add_user(account_id, lastName, firstName, email, phone)
            new_student = Student(user.id, url_avatar, gender, birthDay)
            self.session.add(new_student)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e

    def valid_image(self, avatar):
        if not self.is_valid_image(avatar):
            raise ValueError('File is not a valid image')
        fileName = secure_filename(avatar.filename or 'default.jpg')
        if not os.path.exists('app/static/images'):
            os.makedirs('app/static/images')
        avatar.save(os.path.join('app', 'static', 'images', fileName))
        url_avatar = url_for('static', filename=fileName)
        return url_avatar

    def is_valid_image(self,file):
        try:
            image = Image.open(file)
            image.verify()
            return True
        except:
            return False