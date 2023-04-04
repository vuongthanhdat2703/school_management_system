from flask import Blueprint, jsonify, request, url_for
from app import conn
from app.model.departments import Departments
from app.model.users import Users
from app.model.account import Account

api_departments = Blueprint('api_departments',__name__)
session = conn.Session()

# @api_departments.route("/add_department/<int:account_id>", methods = ["POST"])
# def add_department(account_id):
