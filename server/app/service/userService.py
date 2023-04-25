import re
from unidecode import unidecode
from app.model.users import Users
from app.service.accountService import AccountService


class UserService():
    def __init__(self, session):
        self.session = session

    def get_user_id(self, id):
        user = self.session.query(Users).filter(Users.id == id).first()
        return user

    def get_by_account_id(self, account_id):
        user = self.session.query(Users).filter(
            Users.account_id == account_id).first()
        return user

    def add_user(self, account_id, lastName, firstName, email, phone):
        new_user = Users(account_id=account_id, lastName=lastName,
                         firstName=firstName, email=email, phone=phone)
        self.session.add(new_user)
        self.session.commit()
        return new_user

    def delete_user(self, id):
        user = self.session.query(Users).filter(Users.id == id).first()
        self.session.delete(user)
        self.session.commit()
        return user

    def update_user(self, id, lastName=None, firstName=None, email=None, phone=None):
        user = self.session.query(Users).filter(Users.id == id).first()
        if not user:
            raise ValueError("Invalid user ID")
        if lastName:
            self.validate_name(lastName)
            user.lastName = lastName
        if firstName:
            self.validate_name(firstName)
            user.firstName = firstName
        if email:
            self.validate_email(email)
            user.email = email
        if phone:
            self.validate_phone_number(phone)
            user.phone = phone
        return user

    def valid_user(self, account_id, lastName, firstName, email, phone):
        # AccountService(self.session).check_id(account_id)
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
            raise ValueError(
                "lastName and firstName should only contain letters")
