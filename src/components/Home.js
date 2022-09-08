import React, { useState } from "react";
import Compose from "./Compose";
import Links from "./Links";
import Profile from "./Profile";
import Tweets from "./Tweets";

const Home = (props) => {
  const { user, username, handleSignOut } = props;

  const [viewProfile, setViewProfile] = useState(false);
  const [profileUsername, setProfileUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [signedInUser, setSignedInUser] = useState(false);

  function showProfile() {
    setProfileUsername(user.displayName);
    setUserId(user.uid);
    setViewProfile(true);
  }

  return (
    <div className="home-container">
      <div className="user-info-container">
        <div className="user-info">
          <div className="profile-container">
            <img
              src={require("../assets/account-circle-outline.png")}
              alt="profile pic"
              id="profile-pic"
            />
            <p className="greeting">
              {user.displayName ? user.displayName : username}
            </p>
          </div>

          <p className="user-email">{user.email}</p>
          <img
            src={require("../assets/logout-variant.png")}
            alt="signout icon"
            id="signout-icon"
            onClick={handleSignOut}
          />
        </div>
        <Links
          viewProfile={viewProfile}
          setViewProfile={setViewProfile}
          signedInUser={signedInUser}
          showProfile={showProfile}
        />
      </div>
      {!viewProfile ? (
        <Tweets
          setUserId={setUserId}
          setViewProfile={setViewProfile}
          setProfileUsername={setProfileUsername}
        />
      ) : (
        <Profile
          userId={userId}
          user={user}
          profileUsername={profileUsername}
          setSignedInUser={setSignedInUser}
          signedInUser={signedInUser}
        />
      )}
      <Compose />
    </div>
  );
};

export default Home;
