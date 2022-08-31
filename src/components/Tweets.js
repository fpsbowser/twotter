import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

function Tweets() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const querySnapshot = await getDocs(collection(db, "tweets"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data().tweet);
      setTweets((prevState) => [...prevState, doc]);
    });
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  console.log(tweets);
  return (
    <div className="tweet-container">
      {tweets.map((tweet) => {
        return (
          <div className="tweet-card" key={tweet.id}>
            <h3>{tweet.data().tweet}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Tweets;
