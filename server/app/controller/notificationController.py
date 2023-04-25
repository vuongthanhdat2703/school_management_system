from app import conn
from app.service.notificationService import NotificationService
from flask import Blueprint, jsonify, request


class NotificationController:
    def __init__(self):
        self.api_notification = Blueprint('api_notification', __name__)
        self.session = conn.Session()
        self.notificationService = NotificationService(self.session)

        @self.api_notification.route("/get_notification", methods=['GET'])
        def get_all_notification():
            notification_list = self.notificationService.get_all()
            return notification_list

        @self.api_notification.route("/create_notification/<int:department_id>", methods=["GET", "POST"])
        def create_notification(department_id):
            if request.method == "GET":
                get_all_subject = self.subject_service.get_all()
                return get_all_subject
            elif request.method == "POST":
                notification = json.loads(request.form["notification"])
                subject_id = notification['subject_id']
                title = notification['title']
                content = notification['content']
                create_date = notification['create_date']
                new_notification = self.notificationService.create_notification(
                    department_id, subject_id, title, content, create_date)
                response = jsonify(
                    {'message': 'Create Notification successfully', "notification": new_notification.to_json()})
                return response
