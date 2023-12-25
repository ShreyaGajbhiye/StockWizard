import React, { forwardRef, useState, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { database } from "../../firebase_setup/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
// import ForgotPassword from "../ForgotPassword/ForgotPassword";
import "firebase/compat/auth";
import { FcGoogle } from "react-icons/fc";

//for checking username and password
// const usersRef = database.ref("users");
// usersRef.once("value").then((snapshot) => {
//   snapshot.forEach((userSnapshot) => {
//     const user = userSnapshot.val();
//     console.log(user.name, user.password);
//   });
// });

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize Firebase Authentication
  const auth = firebase.auth();
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setIsLoggedIn(true);
          const loginButton = document.getElementById("Login-button");
          const signupButton = document.getElementById("Signup-button");
          const logoutButton = document.getElementById("logout-button");
          if (loginButton && signupButton) {
            loginButton.style.display = "none";
            signupButton.style.display = "none";
            logoutButton.style.display = "block";
          }
          history.push("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const usersRef = database.ref("users");
    const emailQuery = usersRef.orderByChild("email").equalTo(email);
    const usernameQuery = usersRef.orderByChild("name").equalTo(name);
    console.log(email);
    console.log(name);
    Promise.all([emailQuery.once("value"), usernameQuery.once("value")])
      .then((snapshots) => {
        const users = [];
        console.log("Promise.all executed ");
        snapshots.forEach((snapshot) => {
          snapshot.forEach((userSnapshot) => {
            const user = userSnapshot.val();
            console.log(user.name, user.password);
            users.push(user);
          });
        });
        const matchingUser = users.find((user) => user.password === password);
        console.log(password);
        if (matchingUser) {
          // console.log(matchingUser.name)
          console.log("User matched");
          setIsLoggedIn(true);
          const loginButton = document.getElementById("Login-button");
          const signupButton = document.getElementById("Signup-button");
          const logoutButton = document.getElementById("logout-button");
          const ActionButton = document.getElementById("ActionButton");
          if (loginButton && signupButton) {
            loginButton.style.display = "none";
            signupButton.style.display = "none";
            logoutButton.style.display = "block";
            //ActionButton.style.display = "block";
          }
          history.push("/dashboard");
        } 
        else {
          setError("Incorrect email or password");
        }
      })
      .catch(() => {
        setError("Incorrect email or password");
      });
  };

  const handleAlertClose = () => {
    setError("");
  };

  return (
    <div className="b_container">
      <div className="header">Login</div>
      <div className="content">
        <div className="form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email/Username</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input classname="input-login"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="subscript-r">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <div className="footerlogin">
              <Button className="login_btn" onClick={handleLogin}>
                Login
              </Button>
              <div>
                <Button className="google_button" onClick={handleGoogleLogin}>
                  <FcGoogle /> Google
                </Button>
              </div>
            </div>
            <div className="subscript-c">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div className="alert">
          <span className="closebtn" onClick={handleAlertClose}>
            &times;
          </span>
          {error}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
