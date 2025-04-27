// import React, { useContext } from "react";
// import { MaintenanceDetails } from '../pages/Admin/Maintenance/MaintenanceDetails';
// import  Pagination from "../components/Maintenance/PaginationComponent";

function MaintenanceNotification2() {
//   const notifications = useContext(MaintenanceDetails);

//   console.log("Received notifications:", notifications);

//   const notificationData = [
//     {
//       id: 1,
//       date: "2023-12-10",
//       name: "Alice",
//       description: "Air conditioning failure, Floor 2, HR Department",
//       priorityLevel: "4",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Alice",
//     },
//     {
//       id: 2,
//       date: "2023-12-09",
//       name: "Bob",
//       description: "Internet outage, Floor 5, IT Department",
//       priorityLevel: "5",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=Bob",
//     },
//     {
//       id: 3,
//       date: "2023-12-08",
//       name: "Charlie",
//       description: "Broken door lock, Floor 1, Security Office",
//       priorityLevel: "3",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Charlie",
//     },
//     {
//       id: 4,
//       date: "2023-12-07",
//       name: "Diana",
//       description: "Power outage, Floor 7, Conference Room",
//       priorityLevel: "5",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Diana",
//     },
//     {
//       id: 5,
//       date: "2023-12-06",
//       name: "Ethan",
//       description: "Printer jam, Floor 3, Admin Office",
//       priorityLevel: "2",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Ethan",
//     },
//     {
//       id: 6,
//       date: "2023-12-05",
//       name: "Fiona",
//       description: "Water leakage in restroom, Floor 4",
//       priorityLevel: "4",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Fiona",
//     },
//     {
//       id: 7,
//       date: "2023-12-04",
//       name: "George",
//       description: "Flickering lights, Floor 6, Cafeteria",
//       priorityLevel: "3",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=George",
//     },
//     {
//       id: 8,
//       date: "2023-12-03",
//       name: "Hannah",
//       description: "Broken elevator button, Floor 10",
//       priorityLevel: "4",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Hannah",
//     },
//     {
//       id: 9,
//       date: "2023-12-02",
//       name: "Isaac",
//       description: "Coffee machine malfunction, Break Room",
//       priorityLevel: "2",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Isaac",
//     },
//     {
//       id: 10,
//       date: "2023-12-01",
//       name: "Julia",
//       description: "Emergency exit sign not working, Floor 8",
//       priorityLevel: "5",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=Julia",
//     },
//     {
//       id: 11,
//       date: "2023-11-30",
//       name: "Kevin",
//       description: "Projector not functioning, Floor 7, Meeting Room",
//       priorityLevel: "3",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Kevin",
//     },
//     {
//       id: 12,
//       date: "2023-11-29",
//       name: "Laura",
//       description: "Unstable WiFi connection, Floor 5",
//       priorityLevel: "4",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Laura",
//     },
//     {
//       id: 13,
//       date: "2023-11-28",
//       name: "Mike",
//       description: "CCTV camera not recording, Parking Lot",
//       priorityLevel: "5",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=Mike",
//     },
//     {
//       id: 14,
//       date: "2023-11-27",
//       name: "Nina",
//       description: "Ventilation issue, Floor 9, Server Room",
//       priorityLevel: "4",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Nina",
//     },
//     {
//       id: 15,
//       date: "2023-11-26",
//       name: "Oliver",
//       description: "Leaking ceiling, Floor 6",
//       priorityLevel: "3",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Oliver",
//     },
//     {
//       id: 16,
//       date: "2023-11-25",
//       name: "Paula",
//       description: "Fire alarm false triggers, Floor 1",
//       priorityLevel: "5",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=Paula",
//     },
//     {
//       id: 17,
//       date: "2023-11-24",
//       name: "Quinn",
//       description: "AC unit noise, Floor 3",
//       priorityLevel: "2",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Quinn",
//     },
//     {
//       id: 18,
//       date: "2023-11-23",
//       name: "Rachel",
//       description: "Desk lamp flickering, Floor 2",
//       priorityLevel: "1",
//       status: "Pending",
//       profilePicture: "https://ui-avatars.com/api/?name=Rachel",
//     },
//     {
//       id: 19,
//       date: "2023-11-22",
//       name: "Steve",
//       description: "Parking gate not opening, Basement 1",
//       priorityLevel: "5",
//       status: "In Progress",
//       profilePicture: "https://ui-avatars.com/api/?name=Steve",
//     },
//     {
//       id: 20,
//       date: "2023-11-21",
//       name: "Tina",
//       description: "Conference phone not connecting, Floor 7",
//       priorityLevel: "3",
//       status: "Resolved",
//       profilePicture: "https://ui-avatars.com/api/?name=Tina",
//     },
//   ];
  
 
  

//    function MovePage(Number) {
//     console.log(Number + " display");
//   }

// const numberOfPages = 3;


//   return (
//     <section className="relative flex flex-col justify-start bg-slate-50 overflow-hidden antialiased">
      

//       <Pagination totalPages =  {numberOfPages}  data =  {notificationData} />

      
//     </section>
//   );
}

export default MaintenanceNotification2;
