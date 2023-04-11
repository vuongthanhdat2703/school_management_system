from flask import Blueprint, jsonify, request
from app import conn
from app.service.subjectService import SubjectService

class SubjectController():
    def __init__(self):
        self.api_subject = Blueprint('api_subject',__name__)
        self.session = conn.Session()
        self.subjectService = SubjectService(self.session)

        @self.api_subject.route("/get_all_subject", methods = ['GET'])
        def get_all_subject():
            list = self.subjectService.get_all()
            return jsonify(list)