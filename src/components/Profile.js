import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebase";

function Profile(props) {
  const { userId, setViewProfile } = props;
  const [tweets, setTweets] = useState([]);

  function handleClick() {
    setViewProfile(false);
  }

  async function fetchUsersTweets() {
    const tweetRef = collection(db, "tweets");
    const q = query(tweetRef, where("ownerId", "==", `${userId}`));
    const userTweets = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      userTweets.push(doc);
      setTweets(userTweets);
    });
  }

  useEffect(() => {
    fetchUsersTweets();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <h2>{userId}</h2>
      <div className="users-tweets">
        {tweets.map((tweet) => {
          return (
            <div className="tweet-card" key={tweet.id}>
              <h3>{tweet.data().tweet}</h3>
              <h5 onClick={handleClick} id={tweet.data().ownerId}>
                {tweet.data().username}
              </h5>
              <h5>{`${new Date(tweet.data().timestamp.seconds * 1000)}`}</h5>
            </div>
          );
        })}
      </div>
      <button onClick={handleClick}>Home</button>
    </div>
  );
}

export default Profile;
