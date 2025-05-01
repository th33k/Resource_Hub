import React from "react";
import AppHeader from "../shared/AppHeader";

const UserHeader = () => {
  return (
    <AppHeader
      title="UserX"
      logo="U"
      showCart={true}
      cartCount={3}
      notificationCount={1}
      showSettings={false}
      showOrdersInProfile={true}
    />
  );
};

export default UserHeader;
