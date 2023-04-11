from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
<<<<<<< HEAD
from app.model import Base
=======
from app.model import *
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f

class Role(Base):
    __tablename__ = 'role_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(45))
    account = relationship("Account", back_populates="role")

    def __init__(self, name):
        self.name = name

    def to_json(self):
        return {
            'name': self.name
        }