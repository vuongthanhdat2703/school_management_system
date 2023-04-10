from app.model.departments import Department, Users
from app.service.accountService import AccountService
from app.service.manageService import ManageService
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
        
    def delete_department(self, id):
        ManageService(self.session).delete_manage(id)
        department = self.session.query(Department).filter(Department.id == id).first()
        self.session.delete(department)
        self.session.commit()
        user = UserService(self.session).delete_user(department.user_id)
        AccountService(self.session).delete_account(user.account_id)