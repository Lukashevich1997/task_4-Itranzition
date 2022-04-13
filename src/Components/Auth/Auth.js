import React, {useState, useEffect} from "react";
import "./Auth.css";
import { NavLink} from "react-router-dom";
import axios from "axios";

const Auth = () => {   

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataDb, setDataDB] = useState();

  useEffect(() => {
    axios
      .get("https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name.json")
      .then((data) =>
        setDataDB(
          data.data
        )
      );
  }, []);

  const login = async () => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
        await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlFQmF_3Z5gx2zi5SeidMLxaEfPkSFUqY",
        authData
      );
    } catch (e) {
      console.log(e);
    }
    let link = document.getElementById("link");
    console.log(link);    
    for (let key in dataDb) {
      console.log(dataDb[key].email);
      if (dataDb[key].email === email && dataDb[key].password === password) {
        dataDb[key].dateOFLastLogin = new Date();
        dataDb[key].isLogin = true                
        link.href = "/main";                
        console.log(dataDb[key]);
        axios
          .put(
            `https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name/${key}.json`,
            dataDb[key]
          )
          .then((response) => {
            console.log(response);
            document.location.href = "http://localhost:3000/main";
          })
          .catch((err) => {
            console.log(err);
          });
      }      
    }
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
  };

  
  return (
    <div className="Auth border p-4 d-flex justify-content-center align-items-center">                
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <div className="text-center">
            <h2>Please Login</h2>
          </div>            
          <label 
            htmlFor="InputEmail"            
            className="form-label"                
          >
            Email address
          </label>
          <input 
            type="email"
            className="form-control"
            //id="InputEmail"
            id="InputEmail"
            aria-describedby="emailHelp"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}   
            required               
          />          
        </div>
        <div className="mb-3">
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
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}                        
          />
        </div>
        <div className="d-grid gap-2">
        <NavLink 
          to="" 
          id="link"
          type="submit"           
          className="btn btn-primary btn-lg"
          onClick={login}
        >
          Login
        </NavLink>

        <NavLink
          to="/sign"           
          className="btn btn-dark btn-lg"          
        >
          Sign up
        </NavLink>
        </div>        
      </form>
    </div>      
  );
};
export default Auth;
