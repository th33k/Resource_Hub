import React, { useState } from "react";
import Pagination from "../components/Maintenance/PaginationComponent";

function MaintenanceNotification2({ sentNotifications = [] }) {
  // Merge static data with sent notifications
  const [notifications, setNotifications] = useState([
    ...sentNotifications,
    // Optional: Keep static data if needed
    {
      id: 1,
      date: "2023-12-10",
      name: "Alice",
      description: "Air conditioning failure, Floor 2, HR Department",
      priorityLevel: "4",
      status: "Pending",
      profilePicture: "https://ui-avatars.com/api/?name=Alice",
    },
    // ... other static items if you want to keep them
  ]);

  // Add new notification (called by parent component)
  const addNotification = (newNotification) => {
    setNotifications((prev) => [
      { ...newNotification, id: prev.length + 1 }, // Assign new ID
      ...prev,
    ]);
  };

  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  return (
    <section className="relative flex flex-col justify-start bg-slate-50 overflow-hidden antialiased">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Maintenance Notifications</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Priority Level</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Profile</th>
            </tr>
          </thead>
          <tbody>
            {notifications
              .slice(0, itemsPerPage) // For demo; Pagination component should handle slicing
              .map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.name || item.username}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">{item.priorityLevel}</td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border">
                    <img
                      src={item.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} data={notifications} />
    </section>
  );
}

export default MaintenanceNotification2;