import React, { useState } from 'react'
import './Css/LoginSignup.css'
const LoginSignup = () => {

    const [state,setState]= useState("Login");

    const [formdata,setFormData]=useState({
      username:"",
      password:"",
      email:"",

    })
    const changeHandler = (e)=>{
      setFormData({...formdata,[e.target.name]:e.target.value})

    }
    const login =async () =>{
      console.log ("login Fuction Executed",formdata);
      let responseData;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(FormData),
      }).then ((response)=>response.json())
      .then((data)=>responseData=data)
      if (responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    }
    const Signup =async () =>{
      console.log ("Signup Fuction Executed",formdata);  
      let responseData;
      await fetch('http://localhost:4000/Signup',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(FormData),
      }).then ((response)=>response.json())
      .then((data)=>responseData=data)
      if (responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    }
  return (
    <div className='LoginSignup'>
      <div className="LoginSignup-container">
        <h1>{state}</h1>
        <div className="LoginSignup-fields">
         {state==="Sign Up"?<input name='username'value={FormData.username} onChange={changeHandler} type="text"placeholder='Enter your Name' />:<></>}
          <input name='email'value={FormData.email} onChange={changeHandler} type="Email" placeholder='Email Address...@gmail.com' />
          <input name='password'value={FormData.password} onChange={changeHandler} type="password" placeholder='password' />
        </div>
        <button onClick={()=>{state==="Login"?login():Signup()}}>Continue</button>
        { state==="Sign Up"?<p className="LoginSignup-login">Already have an Account?<span onClick={()=>{setState("Login")}}>login here</span></p>
        :<p className="LoginSignup-login">Create an Account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="LoginSignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continue I  agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
