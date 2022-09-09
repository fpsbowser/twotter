import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignUp from "./SignUp";
import "../style/login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const auth = getAuth();
  const { username, setUsername } = props;
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSignUp() {
    setHasAccount(!hasAccount);
  }

  function onSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  if (hasAccount) {
    return (
      <div className="main-container">
        <div className="login-container">
          <div className="logo-container">
            <img
              src={require("../assets/bird.png")}
              alt="logo"
              id="login-logo"
            />
            <h1>Twotter!</h1>
          </div>

          <h1>Login</h1>
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
    );
  } else {
    return (
      <SignUp
        setHasAccount={setHasAccount}
        hasAccount={hasAccount}
        username={username}
        setUsername={setUsername}
      />
    );
  }
}

export default Login;
