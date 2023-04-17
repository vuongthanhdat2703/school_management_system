import {
  faBars,
  faBell,
  faBook,
  faGauge,
  faHome,
  faRightFromBracket,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { AppContext } from "../../App";
import Dashboard from "../../components/Dashboard/Dashboard";
import Department from "../../components/Department/Department";
import Department_Noti from "../../components/Department_Noti/Department_Noti";
import Homepage from "../../components/HomePage/HomePage";
import Notification from "../../components/Notification/Notification";
import Profile from "../../components/Profile/Profile";
import Student from "../../components/Student/Student";
import Subject from "../../components/Subject/Subject";
import User from "../../components/User/User";
import { getToken, removeToken } from "../../utils/localstorage";
import "./Home.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [currentTab, setCurrentTab] = useState("");
  // const { isAdmin } = useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard setCurrentTab={setCurrentTab} />;

      case "subject":
        return <Subject />;
      case "department":
        return <Department />;
      case "department_noti":
        return <Department_Noti />;
      case "student":
        return <Student />;
      case "notification":
        return <Notification />;
      case "homepage":
        return <Homepage />;
      case "profile":
        return <Profile />;
      case "user":
        return <User />;

      default:
        return <Dashboard setCurrentTab={setCurrentTab} />;
    }
  };
  return (
    <div className="Page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <div className="navigation-left">
              <div className="logo">
                <h2>Dashboard</h2>
                <hr />
              </div>
              <div className="category">
                <ul>
                  <li>
                    <a onClick={() => setCurrentTab("profile")}>
                      <i>
                        <FontAwesomeIcon icon={faUser} />
                      </i>
                      User
                    </a>
                  </li>
                  <li onClick={() => setCurrentTab("dashboard")}>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faGauge} />
                      </i>
                      Dashboard
                    </a>
                  </li>
                  <li onClick={() => setCurrentTab("homepage")}>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faHome} />
                      </i>
                      Homepage
                    </a>
                  </li>
                  <li className="drowdown" onClick={toggling}>
                    <a>
                      <i>
                        <FontAwesomeIcon icon={faBars} />
                      </i>
                      Classification Of Notification
                    </a>
                    {isOpen && (
                      <ul className="drowdown-m">
                        <li onClick={() => setCurrentTab("department_noti")}>
                          <a>
                            <i>
                              <FontAwesomeIcon icon={faUserGroup} />
                            </i>
                            Department
                          </a>
                        </li>
                        <li onClick={() => setCurrentTab("subject")}>
                          <a>
                            <i>
                              <FontAwesomeIcon icon={faBook} />
                            </i>
                            Subject
                          </a>
                        </li>
                        <li onClick={() => setCurrentTab("notification")}>
                          <a>
                            <i>
                              <FontAwesomeIcon icon={faBell} />
                            </i>
                            All Notification
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <a onClick={() => setCurrentTab("user")}>
                      <i>
                        <FontAwesomeIcon icon={faUser} />
                      </i>
                      User
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <i>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </i>
                      LogOut
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="Navigation-right">{renderTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
