import SvgInsert from "@/components/SvgInsert";

export interface INavItem {
  name: string;
  link: string;
  logo?: React.ReactElement;
}

export const navList: INavItem[] = [
  {
    name: "Create",
    link: "/",
    logo: <SvgInsert src="/icons/" />,
  },
  {
    name: "Tokens",
    link: "/tokens",
    logo: <SvgInsert src="/icons/" />,
  },
];

export const mobileNavList: INavItem[] = [
  {
    name: "Home",
    link: "/",
    logo: <SvgInsert src="/icons/" />,
  },
  {
    name: "Create",
    link: "/",
    logo: <SvgInsert src="/icons/" />,
  },
  {
    name: "Tokens",
    link: "/tokens",
    logo: <SvgInsert src="/icons/" />,
  },
  {
    name: "Profile",
    link: "/profile",
    logo: <SvgInsert src="/icons/" />,
  },
];
