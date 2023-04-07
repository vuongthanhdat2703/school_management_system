from app.model.students import Student, Users
from app.model.account import Account
from app.model.students_department import Students_Department
from werkzeug.utils import secure_filename
from flask import url_for
import os
from PIL import Image
from app.service.userService import UserService

class StudentService():
    def __init__(self, session):
        self.session = session

    def delete_student(self, student_id):
        manage_db = self.session.query(Students_Department).filter(Students_Department.student_id == student_id).all()
        for manage in manage_db:
            self.session.delete(manage)
        student = self.session.query(Student).filter(Student.id == student_id).first()
        self.session.delete(student)
        user = self.session.query(Users).filter(Users.id == student.user_id).first()
        self.session.delete(user)
        account = self.session.query(Account).filter(Account.id == user.account_id).first()
        self.session.delete(account)
        self.session.commit()

    def add_student(self, account_id, lastName, firstName, email, phone, avatar, gender, birthDay):
        try:
            UserService(self.session).valid_user(lastName, firstName, email, phone)
            url_avatar = self.valid_image(avatar)
            user = UserService.add_user(account_id, lastName, firstName, email, phone)
            new_student = Student(user.id, url_avatar, gender, birthDay)
            self.session.add(new_student)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
    
    def add_manager(self, department_id, student_id):
        self.valid_manage(department_id, student_id)
        manager = Students_Department(department_id, student_id)
        self.session.add(manager)
        self.session.commit()
        return manager

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
    
    def valid_manage(self, department_id, student_id):
        check = self.session.query(Students_Department).filter(Students_Department.department_id == department_id, Students_Department.student_id == student_id).first()
        if check:
            raise ValueError('Already exist')