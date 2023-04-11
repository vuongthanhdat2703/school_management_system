import React from 'react'
import './Student.css'
import { useState } from 'react';
import { request } from '../../utils/request';

const userss = [
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    gender: 'female',
    data_of_birth: '2022-02-01'
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane.doe@example.com',
    phone: '555-5678',
    gender: 'male',
    data_of_birth: '2022-02-01'
  },
  // ...
];

function Student() {

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    avatar: null,
    gender: '',
    birthDay: ''
  });
// get student data
  useEffect(() => {
    request.get('/api/get_students')
      .then(res => {
        setStudents(res.data);
      })
  }, []);
// Event handler
  const handleInputChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setNewStudent({ ...newStudent, avatar: event.target.files[0] });
  };
// data processing
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('student', JSON.stringify(newStudent));
    formData.append('avatar', newStudent.avatar);
    request.post(`/api/add_students/${account_id}`, formData)
      .then(res => {
        console.log(res.data);
        setNewStudent({
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          avatar: null,
          gender: '',
          birthDay: ''
        });
        setStudents([...students, res.data.student]);
      })

  };
//student data deletion function
  const handleDelete = (id) => {
    request.post(`/api/delete_student/${id}`)
      .then(res => {
        console.log(res.data);
        setStudents(students.filter(student => student.id !== id));
      })

  };
// Student data editing function
  const handleUpdate = (id, data) => {
    request.post(`/api/update_student/${id}`, data)
      .then(res => {
        console.log(res.data);
        setStudents(students.map(student => student.id === id ? { ...student, ...data } : student));
      })
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
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={newStudent.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <select>
                    <input type="radio" name="gender" value="male" checked={newStudent.gender === 'male'} onChange={handleInputChange} /> Male
                    <input type="radio" name="gender" value="female" checked={newStudent.gender === 'female'} onChange={handleInputChange} /> Female
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
                    value={newStudent.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newStudent.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthDay">Date Of Birth</label>
                  <input
                    type="date"
                    id="birthDay"
                    name="birthDay"
                    value={newStudent.birthDay}
                    onChange={handleInputChange}
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
          <div className="row">
            <table>
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Date Of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.lastname}</td>
                    <td>{student.firstname}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.gender}</td>
                    <td>{student.birthDay}</td>
                    <td>
                      <button className='delete-btn' onClick={() => handleDelete(student.id)}>Delete</button>
                      <button className='edit-btn' onClick={() => handleUpdate(student)}>Edit</button>
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