import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignUp from "./SignUp";

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
    console.log(email);
    console.log(password);
  }

  if (hasAccount) {
    return (
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmail} />
          </label>

          <label>
            Password:
            <input type="password" value={password} onChange={handlePassword} />
          </label>
          <button onClick={handleSignUp}>Sign Up</button>
          <button type="submit">Submit</button>
        </form>
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
