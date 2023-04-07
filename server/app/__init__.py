from flask import Flask
from app.controller import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(accountController.api_account)
app.register_blueprint(studentsController.api_students)
app.register_blueprint(departmentsController.api_departments)
app.register_blueprint(notificationController.api_notification)