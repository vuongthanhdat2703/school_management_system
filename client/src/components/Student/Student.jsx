import { message } from "antd";
import React, { useEffect, useState } from 'react';
import { request } from '../../utils/request';
import './Student.css';


function Student() {
  const [students, setStudents] = useState([]);
  const [formDataStudent, setFormDataStudent] = useState({});



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataStudent({ ...formDataStudent, [name]: value });
  };


  useEffect(() => {
    request.get("/get_students")
      .then(response => {
        setStudents(response.data);
      })
  }, []);

  const handleDelete = (id) => {
    const newStudent = [...students];
    request.delete(`/delete_student/${id}`)
      .then(response => {
        // console.log(response);
        setStudents(students.filter(item => item.id !== id));
        message.success('Delete student success!')
      })
  };
  const handleSubmit = () => {
    if (formDataStudent.id) {
      // If studentData is present, update the existing student
      request.put(`/student/${formDataStudent.id}`, formDataStudent)
        .then((response) => {
          setStudents(students.map(student => student.id === response.data.id ? response.data : student));
        })

    } else {// If studentData is not present, create a new student
      request.post("/student/new", formDataStudent)
        .then((response) => {
          setStudents([...students, response.data]);
        })
    }
  };

  console.log(students);

  return (
    <>
      <div className='student-form'>
        <div className="container-fluid ">
          <div>
            <h2>Student Form</h2>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="header-form">
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formDataStudent.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formDataStudent.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formDataStudent.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                    value={formDataStudent.email}
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
                    value={formDataStudent.phone}
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
                    value={formDataStudent.birthDay}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
              <div className="footer-form">
                <div className="mb-3">
                  <label htmlFor="formFileMultiple" className="form-label">Avatar</label>
                  <input className="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <div>
                  <label htmlFor="departmentName">DepartmentName</label>
                  <select
                    id="departmentname"
                    name="department_name"
                    value={formDataStudent.department_name}
                    onChange={handleChange}
                  >
                    <option value="Công Nghệ Thông Tin">Công Nghệ Thông Tin</option>
                    <option value="Quản Trị Kinh Doanh">Quản Trị Kinh Doanh</option>
                    <option value="Giáo Dục Mầm Non">Giáo Dục Mầm Non</option>
                    <option value="Giáo Dục Thể Chất">Giáo Dục Thể Chất</option>
                    <option value="Sư Phạm Toán">Sư Phạm Toán</option>
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
      <div className="student-table">
        <div className="container-fluid">
          <div>
            <h2>Student List</h2>
          </div>
          <div className="row " style={{ maxHeight: "500px", overflowY: "scroll" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>LastName</th>
                  <th>FirstName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>BirthDay</th>
                  <th>Avatar</th>
                  <th>DepartmentName</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, id) => (
                  <tr key={id}>
                    <td>{student.student.id}</td>
                    <td>{student.student.user.lastName}</td>
                    <td>{student.student.user.firstName}</td>
                    <td>{student.student.user.email}</td>
                    <td>{student.student.user.phone}</td>
                    <td>{student.student.gender}</td>
                    <td>{student.student.birthDay}</td>
                    <td>{student.student.images}</td>
                    <td>{student.department_name}</td>
                    <td>
                      <button className='edit-btn' onClick={() => setFormDataStudent(student)}>Edit</button>
                      <button className='delete-btn' onClick={() => handleDelete(student.id)}>Delete</button>
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

export default Student