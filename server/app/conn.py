from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

<<<<<<< HEAD
engine = create_engine('mysql+mysqlconnector://root:123456@127.0.0.1/online_school') 
=======
engine = create_engine('mysql+mysqlconnector://root:123456@127.0.0.1/online_school')
>>>>>>> 128b4bb376302ccfc164e13f20fca6fd0f5f8f0f
Session = sessionmaker(bind=engine)