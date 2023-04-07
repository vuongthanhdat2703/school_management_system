import re
from unidecode import unidecode
from app.model.users import Users

class UserService():
    def __init__(self, session):
        self.session = session
        
    def add_user(self, account_id, lastName, firstName, email, phone):
        new_user = Users(account_id=account_id, lastName=lastName, firstName=firstName, email=email, phone=phone)
        self.session.add(new_user)
        self.session.commit()
        return new_user

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