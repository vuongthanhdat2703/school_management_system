from sqlalchemy import Column, String, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.departments import Departments



class Users(Base):
    __tablename__ = 'users_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(ForeignKey("account_table.id"))
    lastName = Column(String(50))
    firstName = Column(String(50))
    email = Column(String(50))
    phone = Column(Text(10))
    account = relationship("Account", back_populates="users")
    students = relationship("Students", back_populates="users")
    departments = relationship(Departments, back_populates="users")

    def __init__(self, account_id, lastName, firstName, email, phone):
        self.account_id = account_id
        self.lastName = lastName
        self.firstName = firstName
        self.email = email
        self.phone = phone

    def to_json(self):
        return {
            'id': self.id,
            'lastName': self.lastName,
            'firstName': self.firstName,
            'email': self.email,
            'phone': self.phone
        }
