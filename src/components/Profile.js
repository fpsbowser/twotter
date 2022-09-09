import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebase";

function Profile(props) {
  const { userId, user, profileUsername, setSignedInUser, signedInUser } =
    props;
  const [tweets, setTweets] = useState([]);

  async function fetchUsersTweets() {
    const tweetRef = collection(db, "tweets");
    const q = query(
      tweetRef,
      where("ownerId", "==", `${userId}`),
      orderBy("timestamp", "desc")
    );
    const userTweets = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data().username);
      userTweets.push(doc);
      setTweets(userTweets);
    });
  }

  useEffect(() => {
    user.displayName === profileUsername
      ? setSignedInUser(true)
      : setSignedInUser(false);
    fetchUsersTweets();
  }, [tweets]);

  return (
    <div className="tweet-container">
      <div className="tweet-container-header">
        <h2 className="tweet-container-header-text">
          {signedInUser ? `your twots` : `twots from ${profileUsername}`}
        </h2>
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
              <p className="profile-tweet-owner" id={tweet.data().ownerId}>
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

export default Profile;
