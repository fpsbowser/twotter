import { app, db } from "./Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  // let test = true;
  // console.log(app);
  // console.log(db);
  const [signedIn, setSignedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setSignedIn(true) : setSignedIn(false);
    });
    // const user = auth.currentUser;
    // user ? setSignedIn(true) : setSignedIn(false);
    console.log(signedIn);
  }, []);

  function handleSignOut(e) {
    signOut(auth)
      .then(() => {
        setSignedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <h2>App</h2>
      {signedIn ? <Home /> : <Login />}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
