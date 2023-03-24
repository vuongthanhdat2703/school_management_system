from sqlalchemy import Column, String, Enum, Integer, Date, ForeignKey, BLOB
from sqlalchemy.orm import backref, relationship
from app.model import Base

class Students(Base):
    __tablename__ = 'students_table'
    id = Column(Integer, primary_key=True)
    id_users = Column(ForeignKey("users_table.id"))
    image = Column(BLOB)
    gender = Column(Integer)
    birthDay = Column(Date)
    users = relationship("Users", back_populates="students")

    def __init__(self, id, users_id, image, gender, birthDay):
        self.id = id
        self.users_id = users_id
        self.image = image
        self.gender = gender
        self.birthDay = birthDay

    def to_json(self):
        return{
            'id': self.id,
            'image': self.image,
            'gender': self.gender,
            'birthDay': self.birthDay
        }