from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.model import Base
class Subject(Base):
    __tablename__ = 'subject_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    notification = relationship("Notification", back_populates="subject")

    def __init__(self, name):
        self.name = name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }