import React, {useState, useEffect} from "react";
import Auth from "./Components/Auth/Auth";
import Sign from "./Components/Sign/Sign";
import Main from "./Components/Main/Main"
import {BrowserRouter, Routes, Route } from "react-router-dom";
import fire from "./firebase";

const App = () => {
  // const [user, setUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");  

  // const clearInputs = () => {
  //   setEmail("");
  //   setPassword("");
  // }

  // const clearErrors = () => {
  //   setEmailError("");
  //   setPasswordError("");
  // }

  // const handleLogin = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(err => {
  //       switch(err.code) {
  //         case "auth/Invalid-email":
  //         case "auth/user-disabled":
  //         case "auth/user-not-found":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/wrong-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // }

  // const handleSignup = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch(err => {
  //       switch(err.code) {
  //         case "auth/email-already-in-use":
  //         case "auth/invalid-email":          
  //           setEmailError(err.message);
  //           break;
  //         case "auth/weak-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // }

  // const handleLogout = () => {
  //   fire.auth().signOut();
  // }

  // const authListener = () => {
  //   fire.auth().onAuthStateChanged((user)=>{
  //     if (user) {
  //       clearInputs();
  //       setUser(user)
  //     } else {
  //       setUser("");
  //     }
  //   });
  // }

  // useEffect(()=>{
  //   authListener();
  // },[])

  return (
    <BrowserRouter>
    <div className="container pt-5 d-flex justify-content-center">    
      <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/sign" element={<Sign/>}/>
      <Route path="/main" element={<Main/>}/>
      </Routes>              
    </div>
    </BrowserRouter>        
  );
};

export default App;
