import { createContext, useEffect, useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Department from './components/Department/Department';
import Department_Noti from './components/Department_Noti/Department_Noti';
import HomePage from './components/HomePage/HomePage';
import Notification from './components/Notification/Notification';
import Profile from './components/Profile/Profile';
import Student from './components/Student/Student';
import Subject from './components/Subject/Subject';
import User from './components/User/User';
import './index.css';
import Auth from './pages/Auth/login';
import Home from './pages/Home/Home';
import { request } from './utils/request';
import { getCookie, setCookie, eraseCookie } from './utils/cookies';
import { KEYS } from './constants/keys';
import Profile_Department from './components/Profile/Profile_Department';

export const AppContext = createContext()

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await request.post("/login", { username, password });
    const data = response.data;
    setUser(data.users);
    setCookie(KEYS.TOKEN_ROLE, data?.token_role, 10);
    setCookie(KEYS.USER, JSON.stringify(data?.users), 10);
  }

  const handleLogout = async () => {
    eraseCookie(KEYS.TOKEN_ROLE)
    eraseCookie(KEYS.USER)
    setTimeout(() => {
      setUser(null);
    }, 500)
  }
  useEffect(() => {
    const tokenRole = getCookie(KEYS.TOKEN_ROLE)
    if (tokenRole) {
      if (!user) {
        const _user = getCookie(KEYS.USER)
        _user && setUser(JSON.parse(_user))
      }
      navigate("/home/dashboard")
    } else {
      navigate("/login");
    }
  }, [user])

  const isAdmin = useMemo(() => {
    return user?.account?.role?.name === 'Admin'

  }, [user])
  // 
  const isDepartment = useMemo(() => {
    return user?.account?.role?.name === 'Department'
  }, [user])

  const isStudent = useMemo(() => {
    return user?.account?.role?.name === 'Student'
  }, [user])
  return (
    <AppContext.Provider value={{ handleLogin, handleLogout, setUsername, setPassword, username, password, user, setUser, isAdmin, isDepartment, isStudent }}>
      <Routes>
        <Route exact path='/login' element={< Auth />} />
        <Route path='/home' element={< Home />} />
        <Route path='/home/homepage' element={< HomePage />} />
        <Route path='/home/dashboard' element={< Dashboard />} />
        <Route path='/home/department' element={< Department />} />
        <Route path='/home/department_noti' element={< Department_Noti />} />
        <Route path='/home/notification' element={< Notification />} />
        <Route path='/home/subject' element={< Subject />} />
        <Route path='/home/profile' element={< Profile />} />
        <Route path='/home/profile_department' element={< Profile_Department />} />
        <Route path='/home/user' element={<User />} />
        <Route path='/home/department/add' element={< Department />} />
        <Route path='/home/student/add' element={< Student />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App;

