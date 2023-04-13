// import React from 'react'
// import './Department.css'
// import { useState,useEffect } from 'react';
// import { request } from '../../utils/request';

// function Department() {
  
//   const [department, setDepartment] = useState([]);
//   const [departmentData, setDepartmentData] = useState({
//     lastname:'',
//     firstname:'',
//     email:'',
//     phone:'',
//     department_name:'',
//     start_date:''
//   });
//   // get department data 
//   useEffect(()=>{
//     request.get('/get_departments')
//       .then(res => {
//         setDepartment(res.data);
//       })
//   },[]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log('Form submitted');
//     // console.log(lastname, firstname, email, phone, department, startDay);
//   };
//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       const newUsers = [...users];
//       newUsers.splice(index, 1);
//       setUsers(newUsers);
//     }
//   };
//   const handleEdit = (index) => {
//     // setEditing(true);
//     // setCurrentUser(index);
//     setFirstname(users[index].firstname);
//     setLastname(users[index].lastname);
//     setEmail(users[index].email);
//     setPhone(users[index].phone);
//     setDepartment(users[index].department);
//     // setStartdate(users[index].startdate);
//   };
//   const userss = [
//     {
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'john.doe@example.com',
//       phone: '555-1234',
//       department: 'Marketing',
//       startdate: '2022-01-01'
//     },
//     {
//       firstname: 'Jane',
//       lastname: 'Doe',
//       email: 'jane.doe@example.com',
//       phone: '555-5678',
//       department: 'Sales',
//       startdate: '2022-02-01'
//     },
//     // ...
//   ];
//   return (
//     <>
//     <div className='department-form'>
//       <div className="container">
//         <div>
//           <h2>Department Form</h2>
//         </div>
//         <div className="row">
//           <form onSubmit={handleSubmit}>
//             <div className="header-form">
//               <div>
//                 <label htmlFor="lastname">Last Name:</label>
//                 <input
//                   type="text"
//                   id="lastname"
//                   name="lastname"
//                   value={lastname}
//                   onChange={(e) => setLastname(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="firstname">First Name</label>
//                 <input
//                   type="text"
//                   id="firstname"
//                   name="firstname"
//                   value={firstname}
//                   onChange={(e) => setFirstname(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="department">Department Hear</label>
//                 <select
//                   id="department"
//                   name="department"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="internet">Internet</option>
//                   <option value="friend">Friend</option>
//                   <option value="newspaper">Newspaper</option>
//                 </select>
//               </div>
//             </div>
//             <div className="middle-form">
//               <div>
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="startDay">Start Day</label>
//                 <input
//                   type="date"
//                   id="startDay"
//                   name="startDay"
//                   value={startDay}
//                   onChange={(e) => setStartDay(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <button type="submit">Submit</button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </div>
//     <div className="department-table">
//       <div className="container-fluid">
//         <div className="row">
//         <table>
//   <thead>
//     <tr>
//       <th>Last Name</th>
//       <th>First Name</th>
//       <th>Email</th>
//       <th>Phone</th>
//       <th>Department</th>
//       <th>Start Date</th>
//       <th>Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {userss.map((user, index) => (
//       <tr key={index}>
//         <td>{user.lastname}</td>
//         <td>{user.firstname}</td>
//         <td>{user.email}</td>
//         <td>{user.phone}</td>
//         <td>{user.department}</td>
//         <td>{user.startdate}</td>
//         <td>
//           <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button>
//           <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
//         </div>
//       </div>
//     </div>
//     </>

//   );
// }

// export default Department