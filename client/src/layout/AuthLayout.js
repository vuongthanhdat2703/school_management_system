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
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AppContext } from "../App";
import { getToken } from "../utils/localstorage";
import './AuthLayout.css';

function AuthLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const [currentTab, setCurrentTab] = useState("");
    const { isAdmin, handleLogout, isStudent, isDepartment } = useContext(AppContext);

    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate("/home");
        }
    }, []);

    const logout = () => {
        // removeToken();
        handleLogout()
    };

    useEffect(() => {
        currentTab && navigate(`/home/${currentTab}`)
    }, [currentTab])
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
                                    {isDepartment && (
                                        <li>
                                            <a onClick={() => setCurrentTab("profile_department")}>
                                                <i>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </i>
                                                <>Department</>
                                            </a>
                                        </li>
                                    )}
                                    {isStudent && (
                                        <li>
                                            <a onClick={() => setCurrentTab("profile")}>
                                                <i>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </i>
                                                <>Student</>
                                            </a>
                                        </li>
                                    )}




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
                                    {(isAdmin || isDepartment) && (
                                        <li>
                                            <a onClick={() => setCurrentTab("user")}>
                                                <i>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </i>
                                                Account
                                            </a>
                                        </li>
                                    )}

                                    <li>
                                        <a onClick={logout}>
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
                        {/* <div className="Navigation-right">{renderTab()}</div> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
