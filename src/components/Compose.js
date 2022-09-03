import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Compose() {
  const [tweet, setTweet] = useState("");
  const [toggle, setToggle] = useState(true);

  function toggleTextarea() {
    setToggle(!toggle);
    setTweet("");
  }

  function handleChange(e) {
    setTweet(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(tweet);
    console.log(auth.currentUser.displayName);
    // push to tweet to firestore
    const docRef = await addDoc(collection(db, "tweets"), {
      tweet: tweet,
      ownerId: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      timestamp: serverTimestamp(),
      date: new Date(),
    });
    console.log("doc written with id: ", docRef.id);
    setToggle(!toggle);
  }

  if (toggle) {
    return (
      <div>
        <button onClick={toggleTextarea}>Toggle</button>
        <form onSubmit={onSubmit}>
          <textarea
            name="tweet"
            cols="40"
            rows="10"
            value={tweet}
            onChange={handleChange}
            placeholder={"surely your tweet will be necessary, right?"}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={toggleTextarea}>Toggle</button>
      </div>
    );
  }
}

export default Compose;
