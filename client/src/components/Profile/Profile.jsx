import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import "./Profile.css";
import { AppContext } from "../../App";

function Profile() {
  const [data, setData] = useState(null);
  const { user } = useContext(AppContext)
  const getUserId = async (id) => {
    await request.get(`/get_student_byID_user/${id}`).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    if (user) {
      getUserId(user?.id);
    }
  }, [user]);

  return (
    <AuthLayout>
      {data && (
        <div className="profile_user">
          <div className="container-fluid ">
            <div className="row mt-5">
              <div className="col-sm-4">
                <div className="avt">
                  <img
                    className="img-profile rounded-circle h-50 w-50 mt-3 "
                    src="/img/undraw_profile.svg"

                  />
                </div>
              </div>
              <div className="col-sm-8">
                <div className="mt-5">
                  <p className="fullname">
                    {data.student?.user?.firstName}{" "}{data.student?.user?.lastName}

                  </p>
                  <p className="">
                    <a href="/#">{data.student?.user?.email}</a>/
                    {data.student?.user?.account?.role?.name}
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
                  <p>Phone</p>
                  <p>Email</p>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="information mt-4 ">
                  <p>{data.student?.user?.lastName}</p>
                  <p>{data.student?.user?.firstName}</p>
                  <p>{data.student?.user?.account?.username}</p>
                  <p>{data.student?.user?.phone}</p>
                  <p>{data.student?.user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

export default Profile;
