import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ROLES } from "../../constants/roles";
import { request } from "../../utils/request";
import "./User.css";

function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [formDataUser, setFormDataUser] = useState({});
  // const { isAdmin } = useContext(AppContext);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataUser({ ...formDataUser, [name]: value });
  };
  const handleSubmit = (e, role) => {
    e.preventDefault();
    request
      .post(`/add_account/${formDataUser.role}`, formDataUser)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        if (formDataUser.role == ROLES.DEPARTMENT) {
          navigate("/home/department/add", {
            state: { id: res.data.account.id },
          });
        } else if (formDataUser.role == ROLES.STUDENT) {
          navigate("/home/student/add", {
            state: { id: res.data.account.id },
          });
        }
      });
  };
  return (
    <>
      <div className="department-form">
        <div className="container">
          {/* {isAdmin && (
            <div>
              <h2>User Form</h2>
            </div>
          )} */}
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="header-form">
                <div>
                  <label htmlFor="userName">UserName</label>
                  <input
                    type="text"
                    id="userName"
                    name="username"
                    value={formDataUser.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">PassWord</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={formDataUser.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="Role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formDataUser.role}
                    onChange={handleChange}
                  >
                    {Object.keys(ROLES).map((role) => (
                      <option value={ROLES[role]}>{role.toLowerCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
