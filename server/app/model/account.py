from sqlalchemy import Column, String,Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.role import Role

class Account(Base):
    __tablename__ = 'account_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255))
    password = Column(String(255))
    role_id = Column(ForeignKey("role_table.id"))
    users = relationship("Users", back_populates="account")
    role = relationship("Role", back_populates="account")

    def __init__(self, username, password, role_id):
        self.username = username
        self.password = password
        self.role_id = role_id

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'role': Role.to_json(self.role)
        }