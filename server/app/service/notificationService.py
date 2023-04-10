from flask import jsonify
from app.model.notifications import Notification, Subject

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