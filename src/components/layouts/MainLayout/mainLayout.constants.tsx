import { JSX } from "react";
import { CiHome, CiMemoPad, CiStickyNote, CiWallet } from "react-icons/ci";

type NavItem = {
  name: string;
  href: string;
  icon: JSX.Element;
};

const iconClassname = "text-xl";

const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <CiHome className={iconClassname} />,
  },
  {
    name: "Keuangan",
    href: "/finance",
    icon: <CiWallet className={iconClassname} />,
  },
  {
    name: "Tugas",
    href: "/todos",
    icon: <CiMemoPad className={iconClassname} />,
  },
  {
    name: "Catatan",
    href: "/notes",
    icon: <CiStickyNote className={iconClassname} />,
  },
];

export { NAV_ITEMS };
