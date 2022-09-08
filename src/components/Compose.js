import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Compose() {
  const [tweet, setTweet] = useState("");
  const [toggle, setToggle] = useState(false);

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
      <div className="compose-container">
        <div className="compose-btn-container" onClick={toggleTextarea}>
          <img
            src={require("../assets/minus-circle.png")}
            alt="compose logo"
            id="compose-logo"
            onClick={toggleTextarea}
          />
          <p>What's on your mind?</p>
        </div>
        <form onSubmit={onSubmit} id="compose-form">
          <textarea
            name="tweet"
            id="compose-textarea"
            maxLength={"160"}
            value={tweet}
            onChange={handleChange}
            placeholder={"surely your twot will be necessary, right?"}
          ></textarea>
          <button id="tweet-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="compose-container">
        <div className="compose-btn-container" onClick={toggleTextarea}>
          <img
            src={require("../assets/plus-circle.png")}
            alt="compose logo"
            id="compose-logo"
            onClick={toggleTextarea}
          />
          <p>New twot</p>
        </div>
      </div>
    );
  }
}

export default Compose;
