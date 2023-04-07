from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.users import Users

class Department(Base):
    __tablename__ = 'departments_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users_table.id"))
    departments_name = Column(String(255))
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
            'user': Users.to_json(self.user),
            'departments_name': self.departments_name,
            'start_date': self.start_date
        }