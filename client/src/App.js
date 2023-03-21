import Auth from './pages/Auth/login';
import {Route, BrowserRouter as Router,Routes}from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './pages/Home/Home'
import './index.css'
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path='/login' element = {< Auth/>}/>
        <Route exact path='/home' element = {< Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

