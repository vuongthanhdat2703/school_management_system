import React from 'react'
import { useState } from 'react';
import { faHome, faUser, faGauge, faBars, faRightFromBracket, faBell, faBook, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css'
import Dashboard from '../../components/Dashboard/Dashboard';
import Subject from '../../components/Subject/Subject';
import Homepage from '../../components/HomePage/HomePage';
import Department from '../../components/Department/Department';
import Notification from '../../components/Notification/Notification';
import Student from '../../components/Student/Student';

function Header() {


  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [currentTab, setCurrentTab] = useState('')

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard setCurrentTab={setCurrentTab} /> 

      case "subject":
        return < Subject />
      case "department":
        return < Department/>
      case "student":
        return <Student/>
      case "notification":
        return <Notification />
      case "homepage":
        return <Homepage />
        
      default:
        return <Dashboard setCurrentTab={setCurrentTab}/>
    }
  }
  return (
    <div className='Page'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <div className='navigation-left'>
              <div className="logo">
                <h2>Dashboard</h2>
                <hr />
              </div>
              <div className="category">
                <ul>
                  <li ><a href='/#'><i><FontAwesomeIcon icon={faUser} /></i>Admin</a></li>
                  <li onClick={() => setCurrentTab("dashboard")}><a ><i><FontAwesomeIcon icon={faGauge} /></i>Dashboard</a></li>
                  <li onClick={() => setCurrentTab("homepage")}><a><i><FontAwesomeIcon icon={faHome} /></i>Homepage</a></li>
                  <li className='drowdown' onClick={toggling}><a><i><FontAwesomeIcon icon={faBars} /></i>Classification Of Notification</a>
                    {isOpen && (
                      <ul className='drowdown-m' >
                        <li onClick={() => setCurrentTab("department")}><a><i><FontAwesomeIcon icon={faUserGroup} /></i>Department</a></li>
                        <li onClick={() => setCurrentTab("subject")}><a><i><FontAwesomeIcon icon={faBook} /></i>Subject</a></li>
                        <li onClick={() => setCurrentTab("notification")}><a><i><FontAwesomeIcon icon={faBell} /></i>All Notification</a></li>
                      </ul>
                    )}

                  </li>
                  <li><a href='/login'><i><FontAwesomeIcon icon={faRightFromBracket} /></i>LogOut</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className='Navigation-right'>
              {renderTab()}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header