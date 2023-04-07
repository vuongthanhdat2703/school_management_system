from app.model.notifications import Notification, Subject

class NotificationService():
    def __init__(self, session):
        self.session = session