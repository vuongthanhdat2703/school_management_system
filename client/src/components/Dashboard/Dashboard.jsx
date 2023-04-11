import {React,useState} from 'react'
import { faUserGraduate, faBell, faUserGroup, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

import './Dashboard.css'
function Dashboard(props) {
  
  const handleStudentClick = () =>{
    props.setCurrentTab('student')
    
  }
  const handleDepartmentClick = () =>{
    props.setCurrentTab('student')
    
  }
  
  return (
    <>    
    <div className='statistics'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 student">
            <div className="student-1">
              <div className="icon">
                <i><FontAwesomeIcon icon={faUserGraduate} /></i>
              </div>
              <div className="text">
                <p>Student</p>
                <h2>16400</h2>
              </div>
            </div>
            <div className="line"></div>
            <div className="update">
              <a onClick={handleStudentClick}><i><FontAwesomeIcon icon={faRotateRight} /></i>Update Now</a>
            </div>
          </div>
          <div className="col-sm-3 department">
            <div className="department-1">
              <div className="icon">
                <i><FontAwesomeIcon icon={faUserGroup} /></i>
              </div>
              <div className="text">
                <p>Department</p>
                <h2>16400</h2>
              </div>
            </div>
            <div className="line"></div>
            <div className="update">
              <a onClick={handleDepartmentClick}><i><FontAwesomeIcon icon={faRotateRight} /></i>Update Now</a>
            </div>
          </div>
          <div className="col-sm-3 notification">
            <div className="notification-1">
              <div className="icon">
                <i><FontAwesomeIcon icon={faBell} /></i>
              </div>
              <div className="text">
                <p>Notification</p>
                <h2>16400</h2>
              </div>
            </div>
            <div className="line"></div>
            <div className="update">
              <a href='/#'><i><FontAwesomeIcon icon={faRotateRight} /></i>Update Now</a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div className="recent-user">
      <div className="container-fluid">
        <div className="row">
          <div className="user">
              <h2>Recent User</h2>
              <div className="line"></div>
              <div className="account">
                <div className="avt">
                  <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                </div>
                <div className="text-1">
                  <div className="name-user">
                    <h4>Messi</h4>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                  </div>
                
                
                </div>
                <div className="time">
                  <p>11 MAY 12:56:59</p>
                </div>
                <div className="reject">
                  <button>Reject</button>
                </div>
                <div className="approve">
                  <button>Approve</button>
                </div>
              </div>
              <div className="line"></div>
              <div className="account">
                <div className="avt">
                  <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                </div>
                <div className="text-1">
                  <div className="name-user">
                    <h4>Messi</h4>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                  </div>
                </div>
                <div className="time">
                  <p>11 MAY 12:56:59</p>
                </div>
                <div className="reject">
                  <button>Reject</button>
                </div>
                <div className="approve">
                  <button>Approve</button>
                </div>
              </div>
              <div className="line"></div>
              <div className="account">
                <div className="avt">
                  <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                </div>
                <div className="text-1">
                  <div className="name-user">
                    <h4>Messi</h4>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                  </div>
                </div>
                <div className="time">
                  <p>11 MAY 12:56:59</p>
                </div>
                <div className="reject">
                  <button>Reject</button>
                </div>
                <div className="approve">
                  <button>Approve</button>
                </div>
              </div>
              <div className="line"></div>
              <div className="account">
                <div className="avt">
                  <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                </div>
                <div className="text-1">
                  <div className="name-user">
                    <h4>Messi</h4>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                  </div>
                </div>
                <div className="time">
                  <p>11 MAY 12:56:59</p>
                </div>
                <div className="reject">
                  <button>Reject</button>
                </div>
                <div className="approve">
                  <button>Approve</button>
                </div>
              </div>
              <div className="line"></div>
              <div className="account">
                <div className="avt">
                  <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                </div>
                <div className="text-1">
                  <div className="name-user">
                    <h4>Messi</h4>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                  </div>
                </div>
                <div className="time">
                  <p>11 MAY 12:56:59</p>
                </div>
                <div className="reject">
                  <button>Reject</button>
                </div>
                <div className="approve">
                  <button>Approve</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Dashboard
