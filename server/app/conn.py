from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql+mysqlconnector://root:123456@127.0.0.1/online_school')
Session = sessionmaker(bind=engine)