from app.model.role import Role


class RoleService():
    def __init__(self, session):
        self.session = session

    def check_role(self, role):
        role_check = self.session.query(Role).filter(Role.id == role).first()
        if not role_check:
            raise ValueError('Role does not exist')

    def get_role(self):
        db = self.session.query(Role).all()
        list_db = []
        for role in db:
            role_dict = {
                'student': role.to_json()
            }
            list_db.append(role_dict)
        return list_db
