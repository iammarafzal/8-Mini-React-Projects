export const sideMenu = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Profile",
    to: "/profile",
    children: [
      {
        label: "Details",
        to: "/profile/details",
        children: [
          {
            label: "Location",
            to: "/profile/details/location",
          },
        ],
      },
      {
        label: "Edit Profile",
        to: "/profile/edit",
      },
    ],
  },
  {
    label: "Settings",
    to: "/settings",
    children: [
      {
        label: "Preferences",
        to: "/settings/preferences",
        children: [
          {
            label: "Theme",
            to: "/settings/preferences/theme",
          },
        ],
      },
    ],
  },
];

export default sideMenu;
