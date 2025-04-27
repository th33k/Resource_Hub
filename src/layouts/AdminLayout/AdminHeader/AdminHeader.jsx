import { Link } from "react-router-dom";
import logo from "/Resource Hub Logo.png";
import Button from "@mui/material/Button";
import { MdOutlineMenuOpen } from "react-icons/md";
import Search from "./AdminSearch.jsx";
import clientlogo from "/WSO2 logo.png";
import NotificationBtn from "./AdminNotificationBtn.jsx";
import SwitchBtn from "./AdminSwitchBtn.jsx";
import "./AdminHeader.css";
import Profile from "./AdminProfile.jsx";

function AdminHeader() {
  return (
    <header className="adminheader">
      <div className="adminheader__container">
        <div className="adminheader__row">
          <div className="adminheader__part1">
            <Link to="/" className="adminheader__logo">
              <img src={logo} className="adminheader__logo" alt="Resource Hub Logo" />
            </Link>
          </div>
          <div className="adminheader__part1">
            <img className="adminheader__clientlogo" src={clientlogo} alt="clientlogo" />
          </div>
          <div className="adminheader__part2"></div>
          <div className="adminheader__part3">
            <Search />
          </div>
          <div className="adminheader__part4">
            <SwitchBtn />
          </div>
          <div className="adminheader__part5">
            <NotificationBtn />
          </div>
          <div className="adminheader__part6">
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
