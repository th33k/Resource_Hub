import { Link } from "react-router-dom";
import logo from "/Resource Hub Logo.png";
import Button from "@mui/material/Button";
import { MdOutlineMenuOpen } from "react-icons/md";
import Search from "./Search.jsx";
import clientlogo from "/WSO2 logo.png";
import NotificationBtn from "./NotificationBtn.jsx";
import SwitchBtn from "./SwitchBtn.jsx";
import "./Header.css";
import Profile from "./Profile.jsx";

function UserHeader() {
  return (
    <header className="userheader">
      <div className="userheader__container">
        <div className="userheader__row">
          <div className="userheader__part1">
            <Link to="/" className="userheader__logo">
              <img src={logo} className="userheader__logo" alt="Resource Hub Logo" />
            </Link>
          </div>
          <div className="userheader__part1">
            <img className="userheader__clientlogo" src={clientlogo} alt="clientlogo" />
          </div>
          <div className="userheader__part2"></div>
          <div className="userheader__part3">
            <Search />
          </div>
          <div className="userheader__part4">
            <SwitchBtn />
          </div>
          <div className="userheader__part5">
            <NotificationBtn />
          </div>
          <div className="userheader__part6">
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
