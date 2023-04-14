import React from 'react'
import './Department.css'
import { useState, useEffect } from 'react';
import { request } from '../../utils/request';
import { message } from "antd";

function Department() {
    const [department, setDepartment] = useState([])
    const [formDataDepartment, setFormDataDepartment] = useState({

    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataDepartment({ ...formDataDepartment, [name]: value });
    };

    useEffect(() => {
        request.get("/get_departments")
            .then(response => {
                setDepartment(response.data);
            })
    }, []);

    const handleDelete = (id) => {
        const newDepartment = [...department];
        request.delete(`/delete_student/${id}`)
            .then(response => {
                // console.log(response);
                setDepartment(department.filter(item => item.id !== id));
                message.success('Delete student success!')
            })
    };
    const handleSubmit = () => {
        if (formDataDepartment.id) {
            // If studentData is present, update the existing student
            request.put(`/departments/${formDataDepartment.id}`, formDataDepartment)
                .then((response) => {
                    setDepartment(department.map(departments => departments.id === response.data.id ? response.data : departments));
                })

        } else {// If studentData is not present, create a new student
            request.post("/add_department", formDataDepartment)
                .then((response) => {
                    setDepartment([...department, response.data]);
                })
        }
    };



    return (
        <>
            <div className='department-form'>
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
                                        name="lastname"
                                        value={formDataDepartment.lastname}
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
                                        value={formDataDepartment.firstname}
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
                                        onChange={handleChange}
                                    >
                                        <option value="internet">Internet</option>
                                        <option value="friend">Friend</option>
                                        <option value="newspaper">Newspaper</option>
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
                                        name="startdate"
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
                                        <td>{body.id}</td>
                                        <td>{body.lastname}</td>
                                        <td>{body.firstname}</td>
                                        <td>{body.email}</td>
                                        <td>{body.phone}</td>
                                        <td>{body.departments_name}</td>
                                        <td>{body.start_date}</td>
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

export default Department