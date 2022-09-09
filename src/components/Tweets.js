import React, { useEffect, useState } from "react";
import "../style/tweets.css";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./Firebase";

function Tweets(props) {
  const { setUserId, setViewProfile, setProfileUsername } = props;
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // listen to firestore for changes to update tweet state array
    const q = query(collection(db, "tweets"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const currentTweets = [];
      snapshot.forEach((doc) => {
        currentTweets.push(doc);
        setTweets(currentTweets);
      });
    });
  }, []);

  function handleClick(e) {
    setProfileUsername(e.target.innerHTML);
    setUserId(e.target.id);
    setViewProfile(true);
  }

  return (
    <div className="tweet-container">
      <div className="tweet-container-header">
        <h2 className="tweet-container-header-text">Home</h2>
      </div>
      {tweets.map((tweet) => {
        return (
          <div className="tweet-card" key={tweet.id}>
            <div className="tweet-header">
              <img
                src={require("../assets/account-circle-outline.png")}
                alt="profile pic"
                id="tweet-profile-pic"
              />
              <p
                className="tweet-owner"
                onClick={handleClick}
                id={tweet.data().ownerId}
              >
                {tweet.data().username}
              </p>
            </div>

            <p className="tweet-text">{tweet.data().tweet}</p>
            <p className="tweet-date">{`${new Date(
              tweet.data().timestamp.seconds * 1000
            )}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Tweets;
