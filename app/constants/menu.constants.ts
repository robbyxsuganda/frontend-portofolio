import { IconType } from "react-icons";
import {
  HiHome,
  HiUser,
  HiLightningBolt,
  HiBriefcase,
  HiDocumentText,
  HiCollection,
  HiAcademicCap,
  HiStar,
  HiMail,
} from "react-icons/hi";

export interface Menu {
  key: string;
  label: string;
  href: string;
  icon: IconType;
}

export const MENU: Menu[] = [
  {
    key: "home",
    label: "Home",
    href: "#home",
    icon: HiHome,
  },
  {
    key: "about",
    label: "About",
    href: "#about",
    icon: HiUser,
  },
  {
    key: "skills",
    label: "Skills",
    href: "#skills",
    icon: HiLightningBolt,
  },
  {
    key: "services",
    label: "Services",
    href: "#services",
    icon: HiBriefcase,
  },
  {
    key: "resume",
    label: "Resume",
    href: "#resume",
    icon: HiDocumentText,
  },
  {
    key: "projects",
    label: "Projects",
    href: "#projects",
    icon: HiCollection,
  },
  {
    key: "certificates",
    label: "Certificates",
    href: "#certificates",
    icon: HiAcademicCap,
  },
  {
    key: "other",
    label: "Other",
    href: "#other",
    icon: HiStar,
  },
  {
    key: "contact",
    label: "Contact",
    href: "#contact",
    icon: HiMail,
  },
];