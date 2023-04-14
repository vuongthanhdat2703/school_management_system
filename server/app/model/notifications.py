from sqlalchemy import Column, Date, ForeignKey, String, Integer, Text
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.departments import Department
from app.model.subject import Subject

class Notification(Base):
    __tablename__ = 'notifications_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    department_id = Column(ForeignKey("departments_table.id"))  
    subject_id = Column(ForeignKey("subject_table.id"))  
    title = Column(String(255))
    content = Column(Text)
    create_date = Column(Date)
    department = relationship("Department", back_populates="notification")
    subject = relationship("Subject", back_populates="notification")

    def __init__(self, department_id, subject_id, title, content, create_date):
        self.department_id = department_id
        self.subject_id = subject_id
        self.title = title
        self.content = content
        self.create_date = create_date
    
    def to_json(self):
        return{
            'id': self.id,
            'department': Department.to_json(self.department),
            'subject': Subject.to_json(self.subject),
            'title': self.title,
            'content': self.content,
            'create_date': self.create_date
        }