import { auth } from "./Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import "../style/app.css";
import Social from "./Social";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setSignedIn(true);
      } else {
        setUser({});
        setSignedIn(false);
      }
    });
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
      <div className="header">
        <img src={require("../assets/bird.png")} alt="twotter logo" id="logo" />
      </div>
      {signedIn ? (
        <Home user={user} username={username} handleSignOut={handleSignOut} />
      ) : (
        <Login username={username} setUsername={setUsername} />
      )}
      <Social />
    </div>
  );
}

export default App;
