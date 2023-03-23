from flask import Flask
from app.controller import accountController

app = Flask(__name__)
app.register_blueprint(accountController.acc)
