import { JSX } from "react";
import { CiCalendarDate, CiHome, CiStickyNote, CiWallet } from "react-icons/ci";

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
    name: "Kalender",
    href: "/calendar",
    icon: <CiCalendarDate className={iconClassname} />,
  },
  {
    name: "Catatan",
    href: "/notes",
    icon: <CiStickyNote className={iconClassname} />,
  },
];

export { NAV_ITEMS };
