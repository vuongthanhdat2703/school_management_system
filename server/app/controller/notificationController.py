from flask import Blueprint, jsonify, request
from app import conn
from app.service.notificationService import NotificationService

class NotificationController:
    def __init__(self):
        self.api_notification = Blueprint('api_notification', __name__)
        self.session = conn.Session()
        self.notificationService = NotificationService(self.session)

        @self.api_notification.route("/get_notification", methods=['GET'])
        def get_all_notification():
            notification_list = self.notificationService.get_all()
            return notification_list