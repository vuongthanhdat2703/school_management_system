from sqlalchemy import Column, String, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.account import Account

class Users(Base):
    __tablename__ = 'users_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(ForeignKey("account_table.id"))
<<<<<<< HEAD
    account = relationship("Account", back_populates="users")
=======
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
    lastName = Column(String(50))
    firstName = Column(String(50))
    email = Column(String(50))
    phone = Column(Text(10))
<<<<<<< HEAD
    student = relationship("Student", back_populates="user")
    department = relationship("Department", back_populates="user")
=======
    account = relationship("Account", back_populates="users")
    students = relationship("Students", back_populates="users")
    departments = relationship("Departments", back_populates="users")
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f

    def __init__(self, account_id, lastName, firstName, email, phone):
        self.account_id = account_id
        self.lastName = lastName
        self.firstName = firstName
        self.email = email
        self.phone = phone

    def to_json(self):
        return {
<<<<<<< HEAD
            'account': Account.to_json(self.account),
=======
            'account_id': Account.to_json(self.account),
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
            'lastName': self.lastName,
            'firstName': self.firstName,
            'email': self.email,
            'phone': self.phone
<<<<<<< HEAD
        }
=======
        }
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
