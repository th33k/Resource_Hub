import React from "react";
import AppHeader from "../shared/AppHeader";

const UserHeader = () => {
  return (
    <AppHeader
      title="Resource Hub" // Updated title
      logo="/Resource Hub Logo.png" // Updated logo path
      showCart={true}
      cartCount={3}
      notificationCount={1}
      showSettings={false}
      showOrdersInProfile={true}
    />
  );
};

export default UserHeader;
