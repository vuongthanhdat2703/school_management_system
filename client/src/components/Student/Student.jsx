import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../App";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import "./Student.css";

function Student() {
  const [students, setStudents] = useState([]);
  const [formDataStudent, setFormDataStudent] = useState({
    student: {
      birthDay: "",
      gender: "",
      avatar: "",
      user: {
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showData, setShowData] = useState(false);
  const location = useLocation();
  const [avatar, setAvatar] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { isAdmin, isDepartment } = useContext(AppContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDataStudent({
      ...formDataStudent,
      student: {
        ...formDataStudent.student,
        [name]: value,
        user: {
          ...formDataStudent.student.user,
          [name]: value,
        },
      },
    });
  };
  console.log(formDataStudent);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    request.get("/get_students").then((response) => {
      setStudents(response.data);
    });
  };

  const handleDeleteSelected = () => {
    request
      .delete("/delete_selected_student", {
        data: { selected_students: selectedStudents },
      })
      .then((response) => {
        message.success("Selected students have been deleted.");
        setStudents(students.filter((s) => !selectedStudents.includes(s.id)));
        setSelectedStudents([]);
        getStudents();
      })
  };
  const handleSelect = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleDelete = (id) => {
    request.delete(`/delete_student/${id}`).then((response) => {
      console.log(response);
      setStudents(students.filter((item) => item.id !== id));
      getStudents();
      message.success("Delete student success!");
    });
  };
  const onUploadAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSubmit = (e, id) => {
    e.preventDefault();
    var data = new FormData();
    data.append(
      "avatar",
      avatar
    );
    const student = {
      ...formDataStudent.student.user,
    }
    data.append(
      "student",
      JSON.stringify(student)
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*",
      },
      data: data,
    };
    console.log(data);
    if (isEditing) {
      request
        .post(`/update_student/${id}`, config.data, config.headers)
        .then((response) => {
          message.success("Update department success!");
          getStudents()
        });
    } else {
      request.post(`/add_students/${location.state.id}`, config.data, config.headers).then((response) => {
        message.success("Add department success!");
        getStudents();
      });
    }
  };
  const handleEdit = (body) => {
    setIsEditing(true);
    setFormDataStudent(body);
    setShowData(true);
    getStudents();
  };

  return (
    <AuthLayout>
      {(isAdmin || isDepartment) && (
        <div className="student-form">
          <div className="container-fluid ">
            <div>
              <h2>Student Form</h2>
            </div>
            <div className="row">
              <form
                onSubmit={(e) => handleSubmit(e, formDataStudent.student.id)}
                show={showData}
              >
                <div className="header-form">
                  <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastName"
                      value={formDataStudent.student.user.lastName}
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
                      value={formDataStudent.student.user.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formDataStudent.student.gender}
                      onChange={handleChange}
                    >
                      <option value="0">Male</option>
                      <option value="1">Female</option>
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
                      value={formDataStudent.student.user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formDataStudent.student.user.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDay">BirthDay</label>
                    <input
                      type="date"
                      id="birthDay"
                      name="birthDay"
                      value={formDataStudent.student.birthDay}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="footer-form">
                  <div className="mb-3">
                    <label htmlFor="Avt" className="form-label">
                      Avatar
                    </label>
                    <input
                      type="file"
                      id="Avt"
                      multiple
                      name="avatar"
                      value={formDataStudent.avatar}
                      onChange={onUploadAvatar}
                    />
                  </div>
                  <div>
                    <label htmlFor="departmentName">DepartmentName</label>
                    <select
                      id="departmentname"
                      name="department_id"
                      value={formDataStudent.student.department_id}
                      onChange={handleChange}
                    >
                      <option value="5">Công Nghệ Thông Tin</option>
                      <option value="6">Quản Trị Kinh Doanh</option>
                      <option value="7">Giáo Dục Mầm Non</option>
                      <option value="8">Giáo Dục Thể Chất</option>
                      <option value="9">Sư Phạm Toán</option>
                    </select>
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
      <div className="student-table">
        <div className="container-fluid">
          <div>
            <h2>Student List</h2>
          </div>

          <div
            className="row "
            style={{ maxHeight: "230px", overflowY: "scroll" }}

          >
            <button className="delete-btn-all pull-right " onClick={handleDeleteSelected}>Delete All</button>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>LastName</th>
                  <th>FirstName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>BirthDay</th>
                  <th>Avatar</th>
                  {/* <th>DepartmanetName</th> */}
                  {(isAdmin || isDepartment) && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student, id) => (
                  <tr key={id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.student?.id)}
                        onChange={() => handleSelect(student.student?.id)}
                      />
                    </td>
                    <td>{student.student.id}</td>
                    <td>{student.student.user.lastName}</td>
                    <td>{student.student.user.firstName}</td>
                    <td>{student.student.user.email}</td>
                    <td>{student.student.user.phone}</td>
                    <td>{student.student.gender}</td>
                    <td>{student.student.birthDay}</td>
                    <td>{student.student.images}</td>
                    {/* <td>{student.student.department_name}</td> */}
                    {(isAdmin || isDepartment) && (
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(student.student?.id)}
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

export default Student;
