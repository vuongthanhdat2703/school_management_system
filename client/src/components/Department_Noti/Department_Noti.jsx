import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import "./Department_Noti.css";

function Department_Noti() {
  const posts = [
    {
      title: "How to Build a Website",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.",
      time: "12/03/2023",
    },
    {
      title: "ReactJS Tutorial",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.",
      time: "13/03/2023",
    },
    {
      title: "JavaScript Basics",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.",
      time: "14/03/2023",
    },
  ];
  return (
    <AuthLayout>
      <div className="department-noti">
        <h1>Department Notification</h1>
        {posts.map((post, index) => (
          <div key={index}>
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-footer">
              <p className="post-time">Posting time({post.time})</p>
            </div>
            {index !== posts.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>
    </AuthLayout>
  );
}

export default Department_Noti;
