from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    'mysql+mysqlconnector://root:27032001@127.0.0.1/student_school')
Session = sessionmaker(bind=engine)
