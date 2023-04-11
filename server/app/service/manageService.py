from app.model.students_department import Students_Department


class ManageService():
    def __init__(self, session):
        self.session = session

    def valid_manage(self, department_id, student_id):
        check = self.session.query(Students_Department).filter(Students_Department.department_id == department_id, Students_Department.student_id == student_id).first()
        if check:
            raise ValueError('Already exist')
    
    def add_manager(self, department_id, student_id):
        self.valid_manage(department_id, student_id)
        manager = Students_Department(department_id, student_id)
        self.session.add(manager)
        self.session.commit()
        return manager
    
    def delete_manage(self, id):
        manage_db = self.session.query(Students_Department).filter(Students_Department.student_id == id).all()
        for manage in manage_db:
            self.session.delete(manage)
            self.session.commit()