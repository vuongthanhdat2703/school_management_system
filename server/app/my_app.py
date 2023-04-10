from flask import Flask
from app.controller import *
from flask_cors import CORS

class MyApp(Flask):
    def __init__(self, import_name):
        super().__init__(import_name)
        CORS(self)
        self._register_controllers()

    def _register_controllers(self):
        self.register_blueprint(AccountController().api_account)
        self.register_blueprint(StudentController().api_students)
        self.register_blueprint(DepartmentController().api_departments)
        self.register_blueprint(NotificationController().api_notification)
        self.register_blueprint(SubjectController().api_subject)
        self.register_blueprint(ManageController().api_manage)