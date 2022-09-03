import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./Firebase";

function Tweets(props) {
  const { setUserId, setViewProfile } = props;
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // listen to firestore for changes to update tweet state
    const q = query(collection(db, "tweets"), orderBy("timestamp", "desc"));
    const snap = onSnapshot(q, (querySnapshot) => {
      const currentTweets = [];
      querySnapshot.forEach((doc) => {
        currentTweets.push(doc);
        setTweets(currentTweets);
      });
    });
  }, []);
  // console.log(tweets);

  function handleClick(e) {
    console.log(e.target.id);
    setUserId(e.target.id);
    setViewProfile(true);
  }

  return (
    <div className="tweet-container">
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
  );
}

export default Tweets;

// fetchTweets();
// const fetchTweets = async () => {
//   const querySnapshot = await getDocs(collection(db, "tweets"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data().tweet);
//     setTweets((prevState) => [...prevState, doc]);
//   });
// };
