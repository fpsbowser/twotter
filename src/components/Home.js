import React, { useState } from "react";
import Compose from "./Compose";
import Profile from "./Profile";
import Tweets from "./Tweets";

const Home = (props) => {
  const { user, username } = props;

  const [viewProfile, setViewProfile] = useState(false);
  const [userId, setUserId] = useState("");
  // console.log(user);
  if (!viewProfile) {
    console.log(user.uid);
    return (
      <div className="home-container">
        <h1>Home</h1>
        <div className="user-info">
          <h1>{user.displayName ? user.displayName : username}</h1>
          <h2>{user.email}</h2>
        </div>
        <Tweets setUserId={setUserId} setViewProfile={setViewProfile} />
        <Compose />
      </div>
    );
  } else {
    return <Profile userId={userId} setViewProfile={setViewProfile} />;
  }
};

export default Home;
