from flask import Flask
from app.controller import accountController, studentsController

app = Flask(__name__)
app.register_blueprint(accountController.api_account)
app.register_blueprint(studentsController.api_students)

