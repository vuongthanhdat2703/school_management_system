import { createContext, useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Department from './components/Department/Department';
import User from './components/User/User';
import './index.css';
import Auth from './pages/Auth/login';
import Home from './pages/Home/Home';
export const AppContext = createContext

function App() {
  const [account, setAccount] = useState([]);
  const isAdmin = useMemo(() => {
    return account.isAdmin
  }, [account])
  return (
    // <AppContext.Provider value={{ account, setAccount, isAdmin }}>
    <Router>
      <Routes>
        <Route exact path='/login' element={< Auth />} />
        <Route exact path='/home' element={< Home />} />
        <Route exact path='/home/account/add' element={<User />} />
        <Route exact path='/home/department/add' element={< Department />} />
      </Routes>
    </Router>
    // </AppContext.Provider>
  );
}

export default App;

