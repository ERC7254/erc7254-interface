export interface INavItem {
  name: string;
  link: string;
  logo: string;
}

export const navList: INavItem[] = [
  {
    name: "Create",
    link: "/",
    logo: "/icons/plus.svg",
  },
  {
    name: "Tokens",
    link: "/tokens",
    logo: "/icons/list.svg",
  },
];

// export const mobileNavList: INavItem[] = [
//   // {
//   //   name: "Home",
//   //   link: "/",
//   //   logo: "/icons/home.svg",
//   // },
//   {
//     name: "Create",
//     link: "/",
//     logo: "/icons/plus.svg",
//   },
//   {
//     name: "Tokens",
//     link: "/tokens",
//     logo: "/icons/list.svg",
//   },
//   {
//     name: "Profile",
//     link: "/profile",
//     logo: "/icons/user.svg",
//   },
// ];
