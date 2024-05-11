
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Mytasks from './components/Mytasks';
import Addtask from './components/Addtask';
import { Toaster } from 'react-hot-toast';
import { context } from '.';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export const bserver = "https://todoapp-backend-shnb.onrender.com" 


function App() {
  const {isauthenticated} = useContext(context);
  return (
    <>
  <Router>
        <Navbar />
        <div className='container'>
          <Routes>
          <Route exact path='/' element={ isauthenticated ? <Mytasks/> : <Login/>} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/addtask' element={isauthenticated ? <Addtask/> : <Login/>} />
          </Routes>
          <Toaster/>
        </div>
      </Router>
    </>
  );
}

export default App;
