from sqlalchemy import Column, String, Enum, Integer
from sqlalchemy.orm import backref, relationship
from app.model import Base

class Account(Base):
    __tablename__ = 'account_table'
    id = Column(Integer, primary_key=True)
    username = Column(String(255))
    password = Column(String(255))
    role = Column(Enum("Admin", "Student", "Department"))
    users = relationship("Users", back_populates="account")

    def __init__(self, id, username, password, role):
        self.id = id
        self.username = username
        self.password = password
        self.role = role

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'role': self.role
        }