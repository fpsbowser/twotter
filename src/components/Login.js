import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
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

  return (
    <div className="signup-form">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
