from app.model.departments import Department, Users
from app.service.userService import UserService

class DepartmentService():
    def __init__(self, session):
        self.session = session

    def add_department(self, account_id, lastName, firstName, email, phone, departments_name, start_date):
        try:
            UserService(self.session).valid_user(lastName, firstName, email, phone)
            user = UserService(self.session).add_user(account_id, lastName, firstName, email, phone)
            print(user)
            new_department = Department(user.id, departments_name, start_date)
            self.session.add(new_department)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e