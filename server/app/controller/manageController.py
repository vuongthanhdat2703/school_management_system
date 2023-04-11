from flask import Blueprint, jsonify, request
from app import conn
from app.service.manageService import ManageService

class ManageController():
    def __init__(self):
        self.api_manage = Blueprint('api_manage',__name__)
        self.session = conn.Session()
        self.manageService = ManageService(self.session)

        @self.api_manage.route('/manager/<int:student_id>', methods = ["POST"])
        def add_students_manager(student_id):
            data = request.get_json()
            department_id = data['department_id']
            try:
                manage = self.manageService.add_manager(department_id, student_id)
                response = jsonify({'message': 'Students added successfully', "student": manage.to_json()})
                return response
            except ValueError as e:
                return jsonify({'message': str(e)})