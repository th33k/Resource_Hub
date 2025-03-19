import { Outlet } from "react-router-dom";
import IconBreadcrumbs from "../IconBreadcrumbs";
import './UserLayout.css'
import UserSideBar from './UserSideBar/UserSlideBar'
import UserHeader from './UserHeader/UserHeader'

function UserLayout() {
  return (
    <>
      <UserHeader />
      <div className="main">
        <div className="slidebarWrapper">
          <UserSideBar />
        </div>
        <div className="content flex-grow-1 p-3">
          <IconBreadcrumbs />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
