import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { bserver } from '../App'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from '..';
const Signup = () => {
  const { setisauthenticated, setisloading} = useContext(context);
  const navigate = useNavigate();
  const [scred, setscred] = useState({ name: "", email: "", password: "", confpassword: "" });
  const onChange = (e) => {
    setscred({ ...scred, [e.target.name]: e.target.value });
  }
  const handlesignin = async (e) => {
    e.preventDefault();
    if(scred.password!==scred.confpassword){
      setscred({password:"", confpassword:""})
      return 0;
    }
    try {
      setisloading(true);
      const { name, email, password } = scred;
      const { data } = await axios.post(`${bserver}/user/register`, {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(data);
      toast.success(data.message);
      setisloading(false);
      setisauthenticated(true)
      navigate("/addtask")
    } catch (error) {
      setisloading(false);
      setisauthenticated(false)
      console.error(error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className='my-4'>Hey User! Sign up by creating a new account : </h1>
        <div className="content">
          <form className="form">
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Name : </label>
              <input type="text" className="form-control" id="exampleInputPassword1" name='name' value={scred.name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address : </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={scred.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password : </label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={scred.password} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Confirm Password * : </label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='confpassword' value={scred.confpassword} onChange={onChange} />
              <div id="emailHelp" className="form-text">We want to confirm your password for further security.</div>
            </div>
            <button type="submit" className="btn btn-success" onClick={handlesignin}>Sign up</button>
            <div id="emailHelp" className="form-text my-3">Already have an account?<Link className="nav-link active" aria-disabled="true" to="/login" style={{ color: "green", textDecoration: 'underline' }}>Login Now!</Link></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
