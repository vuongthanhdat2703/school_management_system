import React from 'react'
import './Student.css'
import { useState } from 'react';

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
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDay, setBirthDay] = useState('');
  const [users, setUsers] = useState ('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(lastname, firstname, email, phone, gender, birthDay);
  };
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);
    }
  };
  const handleEdit = (index) => {
    // setEditing(true);
    // setCurrentUser(index);
    setFirstname(users[index].firstname);
    setLastname(users[index].lastname);
    setEmail(users[index].email);
    setPhone(users[index].phone);
    setGender(users[index].gender);
    setBirthDay(users[index].data_of_birth);
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
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="internet">Male</option>
                  <option value="female">Female</option>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="birthDay">Date Of Birth</label>
                <input
                  type="date"
                  id="birthDay"
                  name="birthDay"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
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
    {userss.map((user, index) => (
      <tr key={index}>
        <td>{user.lastname}</td>
        <td>{user.firstname}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.gender}</td>
        <td>{user.data_of_birth}</td>
        <td>
          <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button>
          <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
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