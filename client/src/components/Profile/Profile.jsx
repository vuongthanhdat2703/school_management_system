import React from 'react';
import './Profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'vana',
            password: '1234567',
            lastname: 'Nguyen',
            firstname: 'Van A',
            gender: 'male',
            phone: '123456789',
            address: '123 ABC street',
            email: 'example@gmail.com',
        };
    }

    render() {
        return (
            <>
                <div className="profile_user">
                    <div className="container-fluid ">
                        <div className="row mt-5">
                            <div className="col-sm-4">
                                <div className="avt">
                                    <img className="img-profile rounded-circle h-50 w-50 mt-3 "
                                        src="img/undraw_profile.svg" />
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="mt-5">
                                    <p className='fullname'>
                                        {this.state.lastname} {this.state.firstname}
                                    </p>
                                    <p className=''>
                                        <a href='/#'> {this.state.email}
                                        </a>
                                        /User

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line mt-5"></div>
                    <div className="container-fluid ">
                        <div className="row mt-5">
                            <div className="col-sm-4">
                                <div className="text ml-5 ">
                                    <p>LastName</p>
                                    <p>FirstName</p>
                                    <p>UserName *</p>
                                    <p>Password</p>
                                    <p>Gender</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="information mt-4 ">
                                    <p>
                                        {this.state.lastname}
                                    </p>
                                    <p>
                                        {this.state.firstname}
                                    </p>
                                    <p>
                                        {this.state.username}
                                    </p>
                                    <p>
                                        {this.state.password}
                                    </p>
                                    <p>
                                        {this.state.gender}
                                    </p>
                                    <p>
                                        {this.state.phone}
                                    </p>
                                    <p>
                                        {this.state.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
export default Profile;
