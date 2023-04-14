from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.controller import *

class MyApp(Flask):
    def __init__(self, import_name):
        super().__init__(import_name)
        self.config['JWT_SECRET_KEY'] = 'your-secret-key'
        self.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
        self._configure_jwt_manager()
        self._configure_cors()
        self._register_controllers()

    def _configure_jwt_manager(self):
        self.jwt = JWTManager(self)

    def _configure_cors(self):
        CORS(self)

    def _register_controllers(self):
        self.register_blueprint(AccountController().api_account)
        self.register_blueprint(StudentController().api_students)
        self.register_blueprint(DepartmentController().api_departments)
        self.register_blueprint(NotificationController().api_notification)
        self.register_blueprint(SubjectController().api_subject)
        self.register_blueprint(ManageController().api_manage)