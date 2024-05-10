import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { bserver } from '../App';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from '..';
const Login = () => {
  const {isauthenticated, isloading, setisauthenticated, setisloading} = useContext(context);
  const navigate = useNavigate();
  const [cred, setcred] = useState({email : "", password : ""});
  const onChange = (e)=>{
  setcred({...cred, [e.target.name] : e.target.value})
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      setisloading(true);
      const {email, password } = cred;
      const { data } = await axios.post(`${bserver}/user/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success(data.message);
      setisloading(false);
      setisauthenticated(true)
      navigate("/addtask")
      console.log(data)

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
      setisloading(false);
      setisauthenticated(false)
    }
  }
  const getprofile = async (e)=>{
    try {
      setisloading(true);
      const { data } = await axios.get(`${bserver}/user/getprofile`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      setisloading(false);
      setisauthenticated(true)
      
      console.log(data)

    } catch (error) {
      console.error(error);
      setisloading(false);
      setisauthenticated(false)
    }
  }
  useEffect(() => {
    getprofile();
  }, []);
  let h = "Welcome! Login with an account : ";
  if(!isauthenticated){
    h = "Welcome User! Login with your account : "
  }
  else{
    h = "Welcome User! Please switch your account"
  }
  return (
          <div className='container my-5'>
            <h1>{h}</h1>
      <form className='my-5'>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address : </label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password : </label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-success" onClick={handlelogin} >Log in</button>
  <div id="emailHelp" className="form-text my-3">Do not have an account?<Link className="nav-link active" aria-disabled="true" to="/signup" style={{color:"green",textDecoration: 'underline'}}>Signup Now!</Link></div>
</form>
    </div>
  )
}

export default Login;
