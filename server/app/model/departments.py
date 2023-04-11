from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.users import Users

<<<<<<< HEAD
class Department(Base):
=======
class Departments(Base):
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
    __tablename__ = 'departments_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users_table.id"))
    departments_name = Column(String(255))
<<<<<<< HEAD
    start_date = Column(Date)
    user = relationship("Users", back_populates="department")
    department = relationship("Students_Department", back_populates="departments")
    notification = relationship("Notification", back_populates="department")

    def __init__(self, user_id, departments_name, start_date):
        self.user_id = user_id
        self.departments_name = departments_name
        self.start_date = start_date

    def to_json(self):
        return{
            'id': self.id,
            'user': Users.to_json(self.user),
            'departments_name': self.departments_name,
            'start_date': self.start_date
=======
    start_day = Column(Date)
    users = relationship("Users", back_populates="departments")

    def __init__(self, user_id, departments_name, start_day):
        self.user_id = user_id
        self.departments_name = departments_name
        self.start_day = start_day

    def to_json(self):
        return{
            'user_id': Users.to_json(self.users),
            'departments_name': self.departments_name,
            'start_day': self.start_day
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
        }