from sqlalchemy import Column, ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from app.model import Base
from app.model.departments import Department
from app.model.students import Student

class Students_Department(Base):
    __tablename__ = 'student_deparment_table'
    department_id = Column(ForeignKey("departments_table.id"), primary_key=True)
    student_id = Column(ForeignKey("students_table.id"), primary_key=True)
    students = relationship("Student", back_populates="student")
    departments = relationship("Department", back_populates="department")

    __table_args__ = (
        ForeignKeyConstraint([department_id], ['departments_table.id']),
        ForeignKeyConstraint([student_id], ['students_table.id'])
    )

    def __init__(self, department_id, student_id):
        self.department_id = department_id
        self.student_id = student_id

    def to_json(self):
        return{
            'department': Department.to_json(self.departments),
            'student': Student.to_json(self.students)
        }