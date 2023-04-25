import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../App";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import "./Department.css";
var FormData = require("form-data");

function Department() {
  const [departments, setDepartment] = useState([]);
  const [formDataDepartment, setFormDataDepartment] = useState({
    department: {
      departments_name: "",
      start_date: "",
      user: {
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
    },
  }
  );
  const [showData, setShowData] = useState(false);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin } = useContext(AppContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDataDepartment({
      ...formDataDepartment,
      department: {
        ...formDataDepartment.department,
        [name]: value,
        user: {
          ...formDataDepartment.department?.user,
          [name]: value,
        },
      },
    });
  };

  useEffect(() => {
    getDepartments();
  }, []);


  const getDepartments = () => {
    request.get("/get_departments").then((response) => {
      setDepartment(response.data);
    });
  };

  const handleDelete = (id) => {
    request.delete(`/delete_department/${id}`).then((response) => {
      console.log(response);
      setDepartment(departments.filter((item) => item.id !== id));
      getDepartments();
      message.success("Delete student success!");
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    var data = new FormData();

    const _department = {
      ...formDataDepartment.department.user,
    }
    data.append(
      'department',
      JSON.stringify(_department)

    );
    const config = {
      // method: "post",
      // url: `/add_department/${location.state.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*",
      },
      data: data,
    };
    if (isEditing) {
      request
        .post(`/update_department/${id}`, config.data, config.headers)
        .then((response) => {
          message.success("Update department success!");
          getDepartments();
        });
    } else {
      request
        .post(`/add_department/${location.state.id}`,
          config.data,
          config.headers)
        .then((response) => {
          message.success("Add department success!");
          getDepartments();
        });
    }
  };
  const handleEdit = (body) => {
    setIsEditing(true);
    setFormDataDepartment(body);
    setShowData(true);
    getDepartments();
  };

  return (
    <AuthLayout>
      {isAdmin && (
        <div className="department-form">
          <div className="container">
            <div>
              <h2>Department Form</h2>
            </div>
            <div className="row">
              <form
                onSubmit={(e) =>
                  handleSubmit(e, formDataDepartment?.department.id)
                }
                show={showData}
              >
                <div className="header-form">
                  <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastName"
                      value={formDataDepartment?.department.user?.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstName"
                      value={formDataDepartment?.department.user.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="departmentName">Department Name</label>
                    <select
                      id="department"
                      name="departments_name"
                      value={formDataDepartment?.department.departments_name}
                      onChange={handleChange}
                    >
                      <option value="Công Nghệ Thông Tin">
                        Công Nghệ Thông Tin
                      </option>
                      <option value="Quản Trị Kinh Doanh">
                        Quản Trị Kinh Doanh
                      </option>
                      <option value="Giáo Dục Mầm Non">Giáo Dục Mầm Non</option>
                      <option value="Giáo Dục Thể Chất">
                        Giáo Dục Thể Chất
                      </option>
                      <option value="Sư Phạm Toán">Sư Phạm Toán</option>
                    </select>
                  </div>
                </div>
                <div className="middle-form">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formDataDepartment?.department.user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formDataDepartment?.department.user.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="startDay">Start Day</label>
                    <input
                      type="date"
                      id="startDay"
                      name="start_date"
                      value={formDataDepartment?.department.start_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="department-table">
        <div className="container-fluid">
          <div>
            <h2>Department List</h2>
          </div>
          <div className="row"

            style={{ maxHeight: "340px", overflowY: "scroll" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DepartmentName</th>
                  <th>StartDay</th>
                  {isAdmin && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {departments.map((body) => (
                  <tr key={body.id}>
                    <td>{body.department.id}</td>
                    <td>{body.department.user.lastName}</td>
                    <td>{body.department.user.firstName}</td>
                    <td>{body.department.user.email}</td>
                    <td>{body.department.user.phone}</td>
                    <td>{body.department.departments_name}</td>
                    <td>{body.department.start_date}</td>
                    {isAdmin && (
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(body)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(body.department.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Department;
