import React from "react";
import "./Navbar.css";

class NavBar extends React.Component {
  state = {
    icon_path: "logo192.png",
  };
  render() {
    return (
      <div id="navbar">
        <button
          onClick={() => (window.location.href = "http://localhost:3000")}
        >
          <img alt="logo" id="navIcon" src={this.state.icon_path}></img>
        </button>
      </div>
    );
  }
}

export default NavBar;
