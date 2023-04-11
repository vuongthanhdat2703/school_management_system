from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.users import Users

class Student(Base):
    __tablename__ = 'students_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users_table.id"))
    images = Column(String(50))
    gender = Column(Integer)
    birthDay = Column(Date)
    user = relationship("Users", back_populates="student")
    student = relationship("Students_Department", back_populates="students")
    

    def __init__(self, user_id, images, gender, birthDay):
        self.user_id = user_id
        self.images = images
        self.gender = gender
        self.birthDay = birthDay

    def to_json(self):
        return{
            'user': Users.to_json(self.user),
            'images': self.images,
            'gender': self.gender,
            'birthDay': self.birthDay
        }