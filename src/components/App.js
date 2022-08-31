import { app, cdb, auth } from "./Firebase";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  // let test = true;
  // console.log(app);
  // console.log(db);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        setUser(user);
        setSignedIn(true);
      } else {
        setUser({});
        setSignedIn(false);
      }
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
      {signedIn ? (
        <Home user={user} username={username} />
      ) : (
        <Login username={username} setUsername={setUsername} />
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
