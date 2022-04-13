import React, {useState,} from "react";
import "./Sign.css";
import { NavLink } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase"
import axios from "axios";

const Sign = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const register = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response.data);
      postData();
    } catch (e) {
      console.log(e.message);
    }  
  };

  const postData = ()=>{
    const data = {
      email:email,
      password:password,
      name:name,
      surname: surname,
      dateOfSign: new Date(),
      dateOFLastLogin:'',
      status:'unblock',
      isLogin:false
    }
    axios.post('https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name.json',data)
    .then(response=>{
      console.log(response)
      document.location.href = "http://localhost:3000/";
    })
    .catch(error => console.log(error))
  }

  const submitHandler = event => {
    event.preventDefault()
  }


  
  return (
    <div className="Sign border p-4 d-flex justify-content-center align-items-center">
      <form className="row g-3" onSubmit={submitHandler}>
        <h2 className="text-center">Sign up</h2>
        <div className="col">          
          <label 
            htmlFor="InputName"
            className="form-label"
          >
            Name
          </label>
          <input 
            type="text"
            className="form-control"
            id="InputName"
            aria-describedby="emailHelp"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">          
          <label 
            htmlFor="InputSurname"
            className="form-label"
          >
            Surname
          </label>
          <input 
            type="text"
            className="form-control"
            id="InputSurname"            
            placeholder="Your surname"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label 
          htmlFor="InputEmail1" 
          className="form-label"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp" 
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}           
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div>
          <label 
          htmlFor="InputPassword" 
          className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"             
            placeholder="Enter password"   
            onChange={(e) => setPassword(e.target.value)}        
          />
        </div>
        <div className="d-grid">
          <button     
            onClick={register}       
            className="btn btn-primary btn-lg"
            >
            Sign up
          </button>
          <NavLink
          to="/"
          className="btn btn-dark btn-lg mt-2"          
          >
          Login
        </NavLink>
        </div>
      </form>
    </div>
  )
}
export default Sign;