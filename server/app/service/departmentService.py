from app.model.departments import Department, Users
from app.service.accountService import AccountService
from app.service.manageService import ManageService
from app.service.userService import UserService

class DepartmentService():
    def __init__(self, session):
        self.session = session

    def get_all(self):
        db = self.session.query(Department).all()
        list_db = []
        for deparment in db:
            deparment_dict = {
            'department': deparment.to_json()
            }
            list_db.append(deparment_dict)
        return list_db
    
    def get_by_id(self, id):
        db = self.session.query(Department).filter(Department.id == id).all()
        list_db = []
        for deparment in db:
            deparment_dict = {
                'student': deparment.to_json()
            }
            list_db.append(deparment_dict)
        return list_db

    def add_department(self, account_id, lastName, firstName, email, phone, departments_name, start_date):
        try:
            UserService(self.session).valid_user(account_id, lastName, firstName, email, phone)
            user = UserService(self.session).add_user(account_id, lastName, firstName, email, phone)
            new_department = Department(user.id, departments_name, start_date)
            self.session.add(new_department)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
        
    def update_departments(self, id, lastName=None, firstName=None, email=None, phone=None, departments_name=None, start_date=None):
        update_department = self.session.query(Department).filter(Department.id == id).first()
        UserService(self.session).update_user(update_department.user_id, lastName, firstName, email, phone)
        if departments_name:
            update_department.departments_name = departments_name
        if start_date:
            update_department.start_date = start_date
        self.session.commit()
        return update_department
        
    def delete_department(self, id):
        ManageService(self.session).delete_manage(id)
        department = self.session.query(Department).filter(Department.id == id).first()
        self.session.delete(department)
        self.session.commit()
        user = UserService(self.session).delete_user(department.user_id)
        AccountService(self.session).delete_account(user.account_id)