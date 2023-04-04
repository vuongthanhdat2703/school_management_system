from app.model.students import Students, Users
from werkzeug.utils import secure_filename
from flask import url_for
import os
from PIL import Image
import re
from unidecode import unidecode

class StudentService():
    def __init__(self, session):
        self.session = session

    def add_user(self, account_id, lastName, firstName, email, phone):
        new_user = Users(account_id=account_id, lastName=lastName, firstName=firstName, email=email, phone=phone)
        self.session.add(new_user)
        self.session.commit()
        return new_user

    def add_student(self, account_id, lastName, firstName, email, phone, avatar, gender, birthDay):
        try:
            self.valid_user(lastName, firstName, email, phone)
            url_avatar = self.valid_image(avatar)
            user = self.add_user(account_id, lastName, firstName, email, phone)
            new_student = Students(user.id, url_avatar, gender, birthDay)
            # self.session.add(new_student)
            # self.session.commit()
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
    
    def valid_user(self, lastName, firstName, email, phone):
        self.validate_name(lastName)
        self.validate_name(firstName)
        self.validate_email(email)
        self.validate_phone_number(phone)

    def validate_phone_number(self, phone):
        pattern = r'^\d{10}$'
        if not re.match(pattern, phone):
            raise ValueError("Invalid phone number")

    def validate_email(self, email):
        pattern = r'^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$' 
        if not re.match(pattern, email):
            raise ValueError("Invalid email")

    def validate_name(self, name):
        pattern = r'^[a-zA-ZÀ-ỹ]*$'
        if not re.match(pattern, name):
            raise ValueError("lastName and firstName should only contain letters")