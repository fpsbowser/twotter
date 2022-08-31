import React from "react";
import Tweets from "./Tweets";

const Home = (props) => {
  const { user, username } = props;
  // console.log(user);
  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="user-info">
        <h1>{user.displayName ? user.displayName : username}</h1>
        <h2>{user.email}</h2>
      </div>
      <Tweets />
    </div>
  );
};

export default Home;
