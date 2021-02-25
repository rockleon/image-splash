import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../logo.svg";

class TitleBar extends Component {
  render() {
    return (
      <Navbar className="topbar">
        <Navbar.Brand href="#home" style={{ fontSize: 26 }}>
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="App-logo d-inline-block align-top"
          />
          {"   "}
          Image Splash
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default TitleBar;
