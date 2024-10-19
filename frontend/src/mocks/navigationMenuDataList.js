import { nanoid } from "@reduxjs/toolkit";

export const navigationDataList = [
  {
    id: 10,
    name: "menu",
    items: [
      {
        id: nanoid(),
        text: "Dashboard",
        href: "./",
        icon: "LuLayoutDashboard",
      },
      {
        id: nanoid(),
        text: "Notification",
        href: "./notification",
        icon: "IoNotificationsOutline",
      },
      {
        id: nanoid(),
        text: "Projects",
        href: "./projects",
        icon: "IoBriefcaseOutline",
      },
      {
        id: nanoid(),
        text: "Timeline",
        href: "./timeline",
        icon: "MdOutlineViewTimeline",
      },
    ],
  },
  {
    id: 20,
    name: "",
    items: [
      {
        id: nanoid(),
        text: "Setting",
        href: "./setting",
        icon: "IoSettingsOutline",
      },
      { id: nanoid(), text: "user", href: "./profile" },
    ],
  },
];
