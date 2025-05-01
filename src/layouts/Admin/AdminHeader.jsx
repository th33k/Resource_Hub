import React from "react";
import AppHeader from "../shared/AppHeader";

const AdminHeader = () => {
  return (
    <AppHeader
      title="AdminX"
      logo="A"
      showCart={false}
      notificationCount={2}
      showSettings={true}
      showOrdersInProfile={false}
    />
  );
};

export default AdminHeader;
