from sqlalchemy import Column, String, Enum, Integer, Date, ForeignKey
from sqlalchemy.orm import backref, relationship
from app.model import Base

class Students(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    users_id = Column(ForeignKey("users_table.id"))
    gender = Column(Integer)
    birthDay = Column(Date)
    # users = relationship("Users", back_populates="student")

    def __init__(self, id, users_id, gender, birthDay):
        self.id = id
        self.users_id = users_id
        self.gender = gender
        self.birthDay = birthDay

    def to_json(self):
        return{
            'id': self.id,
            'gender': self.gender,
            'birthDay': self.birthDay
        }