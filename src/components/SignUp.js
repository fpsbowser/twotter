import React, { useState } from "react";
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
        <button type="submit" id="signup-btn" onClick={onSubmit}>
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
