import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { context } from '..';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { bserver } from '../App';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  let log = "Login";
  const { isauthenticated, isloading, setisauthenticated, setisloading } = useContext(context);
  
  if (isauthenticated) {
    log = "Switch account";
  } else {
    log = "Login";
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setisloading(true);
      const confirm = window.confirm("Are you sure want to logout");
      if (confirm) {
        const { data } = await axios.get(`${bserver}/user/logout`, {
          withCredentials: true,
        });
        toast.success(data.message);
        setisloading(false);
        setisauthenticated(false);
        navigate("/login");
        log = "Login";
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setisloading(false);
      setisauthenticated(true);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      setisloading(true);
      const confirm = window.confirm("Are you sure you want to permanently delete your account?");
      if (confirm) {
        const { data } = await axios.delete(`${bserver}/user/delete`, {
          withCredentials: true,
        });
        toast.success(data.message);
        setisloading(false);
        setisauthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setisloading(false);
      setisauthenticated(true);
    }
  };

  const getProfile = async () => {
    try {
      setisloading(true);
      const { data } = await axios.get(`${bserver}/user/getprofile`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setisloading(false);
      setisauthenticated(true);
      console.log(data);
    } catch (error) {
      console.error(error);
      setisloading(false);
      setisauthenticated(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">To-Do Work</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/addtask">Create Task</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">{log}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
            {isauthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to="/login">Logout</Link>
              </li>
            ) : null}
            {isauthenticated ? (
              <li className="nav-item">
                <i className="fas fa-user-minus" onClick={deleteUser} style={{ color: "white", marginTop: "13px", cursor: "pointer", marginLeft: "10px" }}></i>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
