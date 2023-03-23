from sqlalchemy import Column, String, Enum, Integer, Text, ForeignKey
from sqlalchemy.orm import backref, relationship
from app.model import Base


class Users(Base):
    __tablename__ = 'users_table'
    id = Column(Integer, primary_key=True)
    account_id = Column(ForeignKey("account_table.id"))
    lastName = Column(String(255))
    firstName = Column(String(255))
    email = Column(String(255))
    phone = Column(Text(11))
    account = relationship("Account", back_populates="users")
    # student = relationship("Students", back_populates="users")
    # departments = relationship("Departments", back_populates="users")

    def __init__(self, id, account_id, lastName, firstName, email, phone):
        self.id = id
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
