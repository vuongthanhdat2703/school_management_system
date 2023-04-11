<<<<<<< HEAD
from app.my_app import MyApp
app = MyApp(__name__)
=======
from flask import Flask
from app.controller import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(accountController.api_account)
app.register_blueprint(studentsController.api_students)
app.register_blueprint(departmentsController.api_departments)


>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
