import React from "react";

function Links(props) {
  const { viewProfile, setViewProfile, signedInUser, showProfile } = props;

  // const [signedInUser, setSignedInUser] = useState(false);

  function handleclick() {
    if (viewProfile) {
      setViewProfile(false);
    }
  }

  if (viewProfile && signedInUser) {
    return (
      <div className="links-container">
        <div className="home-link" onClick={handleclick}>
          <p>Home</p>
        </div>
        <div className="profile-link" onClick={showProfile}>
          <img
            src={require("../assets/circle-medium.png")}
            alt="active circle"
            id="home-link-dot"
          />
          <p>Profile</p>
        </div>
      </div>
    );
  } else if (!viewProfile) {
    return (
      <div className="links-container">
        <div className="home-link" onClick={handleclick}>
          <img
            src={require("../assets/circle-medium.png")}
            alt="active circle"
            id="home-link-dot"
          />
          <p>Home</p>
        </div>
        <div className="profile-link" onClick={showProfile}>
          <p>Profile</p>
        </div>
      </div>
    );
  } else if (viewProfile) {
    return (
      <div className="links-container">
        <div className="home-link" onClick={handleclick}>
          <p>Home</p>
        </div>
        <div className="profile-link" onClick={showProfile}>
          <p>Profile</p>
        </div>
      </div>
    );
  }
}

export default Links;
