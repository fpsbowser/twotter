import React, { useState, useEffect } from "react";
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
    <div className="signup-form">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <label>
          Username:
          <input type="test" value={username} onChange={handleUsername} />
        </label>

        <label>
          Email:
          <input type="text" value={email} onChange={handleEmail} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={handlePassword} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
