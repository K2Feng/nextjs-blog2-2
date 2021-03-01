import React from "react";
import "./Navbar.css";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Navbar = ({ sticky }) => {
return (
  <nav className={sticky ? "navbar navbar-sticky" : "navbar"}>
    <div className="navbar--logo-holder">
      {sticky ? <img src={Logo} alt="logo" className="navbar--logo" /> : null}
      <h1> Stick'Me</h1>
    </div>
    <ul className="navbar--link">
      <li className="navbar--link-item">Home</li>
      <li className="navbar--link-item">About</li>
      <li className="navbar--link-item">Contact us</li>
      <li className="navbar--link-item">Blog</li>
      <Link className="navbar--link-item" to="/">Home </Link>
      <Link className="navbar--link-item" to="/Contact">Contact </Link>
    </ul>
  </nav>
)};
export default Navbar;
