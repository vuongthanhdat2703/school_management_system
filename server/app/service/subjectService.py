from app.model.subject import Subject


class SubjectService():
    def __init__(self, session):
        self.session = session

    def get_all(self):
        db = self.session.query(Subject).all()
        list_db = []
        for subject in db:
            subject_dict = {
            'subject': subject.to_json()
            }
            list_db.append(subject_dict)
        return list_db