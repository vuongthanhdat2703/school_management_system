import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../App";
import { request } from "../../utils/request";
import "./Department.css";
var FormData = require("form-data");

function Department() {
  const [department, setDepartment] = useState([]);
  const [formDataDepartment, setFormDataDepartment] = useState({});
  const location = useLocation();
  const { isAdmin } = useContext(AppContext);
  console.log({ formDataDepartment });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataDepartment({ ...formDataDepartment, [name]: value });
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = () => {
    request.get("/get_departments").then((response) => {
      setDepartment(response.data);
    });
  };

  console.log(department);
  const handleDelete = (id) => {
    const newDepartment = [...department];
    request.delete(`/delete_student/${id}`).then((response) => {
      // console.log(response);
      setDepartment(department.filter((item) => item.id !== id));
      message.success("Delete student success!");
    });
  };
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // if (formDataDepartment.id) {
  //     //     // If studentData is present, update the existing student
  //     //     request.put(`/departments/${formDataDepartment.id}`, formDataDepartment)
  //     //         .then((response) => {
  //     //             setDepartment(department.map(departments => departments.id === response.data.id ? response.data : departments));
  //     //         })

  //     // } else {// If studentData is not present, create a new student
  //     request.post(url, formDataDepartment, headers)
  //         .then((response) => {
  //             console.log(response.data)

  //         })
  // }
  // // };

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append(
      "department",
      `{\n    "lastName":"${formDataDepartment.lastName}",\n    "firstName": "${formDataDepartment.firstName}",\n    "email": "${formDataDepartment.email}",\n    "phone": "${formDataDepartment.phone}",\n    "departments_name": "${formDataDepartment.departments_name}",\n    "start_date": "${formDataDepartment.start_date}"\n}`
    );
    // data.append("department", JSON.stringify(formDataDepartment));
    var config = {
      method: "post",
      url: `/add_department/${location.state.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*",
      },
      data: data,
    };

    request(config)
      .then(function (response) {
        message.success("Add department success!");
        getDepartments();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
    {isAdmin &&(
      <div className="department-form">
        <div className="container">
          <div>
            <h2>Department Form</h2>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="header-form">
                <div>
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    value={formDataDepartment.lastName}
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
                    value={formDataDepartment.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="departmentName">Department Name</label>
                  <select
                    id="department"
                    name="departments_name"
                    value={formDataDepartment.departments_name}
                    defaultValue={"Công Nghệ Thông Tin"}
                    onChange={handleChange}
                  >
                    <option value="Công Nghệ Thông Tin">
                      Công Nghệ Thông Tin
                    </option>
                    <option value="Quản Trị Kinh Doanh">
                      Quản Trị Kinh Doanh
                    </option>
                    <option value="Giáo Dục Mầm Non">Giáo Dục Mầm Non</option>
                    <option value="Giáo Dục Thể Chất">Giáo Dục Thể Chất</option>
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
                    value={formDataDepartment.email}
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
                    value={formDataDepartment.phone}
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
                    value={formDataDepartment.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
      
      <div className="department-table">
        <div className="container-fluid">
          <div className="row">
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {department.map((body) => (
                  <tr key={body.id}>
                    <td>{body.department.id}</td>
                    <td>{body.department.user.lastName}</td>
                    <td>{body.department.user.firstName}</td>
                    <td>{body.department.user.email}</td>
                    <td>{body.department.user.phone}</td>
                    <td>{body.department.departments_name}</td>
                    <td>{body.department.start_date}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => setFormDataDepartment(body)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(body.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Department;
