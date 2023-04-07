import json
from flask import Blueprint, jsonify, request
from app import conn
from app.service.notificationService import NotificationService

api_notification = Blueprint('api_notification',__name__)
session = conn.Session()
notificationService = NotificationService(session)