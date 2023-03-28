from sqlalchemy import Column, String, Enum, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.model import Base


class Departments(Base):
    __tablename__ = 'departments_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users_table.id"))
    departments_name = Column(String(255))
    start_day = Column(Date)
    users = relationship("Users", back_populates="departments")

    def __init__(self, id, user_id, departments_name, start_day):
        self.id = id
        self.user_id = user_id
        self.departments_name = departments_name
        self.start_day = start_day

    def to_json(self):
        return{
            'id': self.id,
            'departments_name': self.departments_name,
            'start_day': self.start_day
        }