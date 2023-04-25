from app.model.notifications import Notification, Subject
from app.model.students import Student
from app.model.students_department import Students_Department
from flask import jsonify


class NotificationService():
    def __init__(self, session):
        self.session = session

    def get_all(self):
        db = self.session.query(Notification).all()
        list_db = []
        for notification in db:
            notification_dict = {
                'notification': notification.to_json()
            }
            list_db.append(notification_dict)
        if list_db:
            return list_db
        return jsonify({'message': 'No announcement has been posted'})

    def get_all_byID_Student(self, id_user):
        student = self.session.query(Student).filter(
            Student.id == id_user).first()
        manage = self.session.query(Students_Department).filter(
            Students_Department.student_id == student.id).all()
        for id in manage:
            get_notification = self.session.query(Notification).filter(
                Notification.department_id == id.department_id).all()
            return get_notification

    # def create_notification(self):
    def create_notification(self, department_id, subject_id, title, content, create_date):
        new_notification = Notification(
            department_id, subject_id, title, content, create_date)
        self.session.add(new_notification)
        self.session.commit()
        return new_notification
