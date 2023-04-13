import './Student.css'
import React, { useState, useEffect } from 'react';
import { request } from '../../utils/request';
import { message } from "antd";


function Student() {
  const [students, setStudents] = useState([])
  const [formDataStudent, setFormDataStudent] = useState({

  });


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
          <div className="row">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>BirthDay</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((body) => (
                  <tr key={body.id}>
                    <td>{body.id}</td>
                    <td>{body.lastname}</td>
                    <td>{body.firstname}</td>
                    <td>{body.email}</td>
                    <td>{body.phone}</td>
                    <td>{body.gender}</td>
                    <td>{body.birthDay}</td>
                    <td>
                      {/* <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button> */}
                      <button className='delete-btn' onClick={() => handleDelete(body.id)}>Delete</button>
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