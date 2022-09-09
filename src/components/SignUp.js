import React, { useState } from "react";
import "../style/signup.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { hasAccount, setHasAccount, username, setUsername } = props;

  const auth = getAuth();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleLogin() {
    setHasAccount(!hasAccount);
  }

  // on account creation, app component renders before changing displayName
  function onSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    console.log(email);
    console.log(password);
  }

  return (
    <div className="main-container">
      <div className="signup-container">
        <div className="logo-container">
          <img
            src={require("../assets/bird.png")}
            alt="logo"
            id="signup-logo"
          />
          <h1>Twotter!</h1>
        </div>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit} className="signup-form">
          <label id="username-label">
            Username:
            <input type="test" value={username} onChange={handleUsername} />
          </label>
          <label id="email-label">
            Email:
            <input type="text" value={email} onChange={handleEmail} />
          </label>
          <label id="password-label">
            Password:
            <input type="password" value={password} onChange={handlePassword} />
          </label>
        </form>
        <button type="submit" id="signup-btn">
          Sign Up
        </button>
        <button onClick={handleLogin} id="login-btn">
          Have an Account?
        </button>
      </div>
    </div>
  );
};

export default SignUp;
/*
<div className="main-container">
        <div className="login-container">
          <div className="logo-container">
            <img
              src={require("../assets/bird.png")}
              alt="logo"
              id="login-logo"
            />
          </div>

          <h1>Twotter!</h1>
          <form onSubmit={onSubmit} className="login-form">
            <label id="email-label">
              Email:
              <input type="text" value={email} onChange={handleEmail} />
            </label>
            <label id="password-label">
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </label>
          </form>

          <button type="submit" id="login-btn">
            LOGIN
          </button>
          <button onClick={handleSignUp} id="signup-btn">
            Create New Account
          </button>
        </div>
      </div>
*/
