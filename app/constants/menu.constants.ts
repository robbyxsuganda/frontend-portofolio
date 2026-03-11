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
  translationKey: string;
  href: string;
  icon: IconType;
}

export const MENU: Menu[] = [
  { key: "home",         translationKey: "nav.home",         href: "#home",         icon: HiHome },
  { key: "about",        translationKey: "nav.about",        href: "#about",        icon: HiUser },
  { key: "skills",       translationKey: "nav.skills",       href: "#skills",       icon: HiLightningBolt },
  { key: "services",     translationKey: "nav.services",     href: "#services",     icon: HiBriefcase },
  { key: "resume",       translationKey: "nav.resume",       href: "#resume",       icon: HiDocumentText },
  { key: "projects",     translationKey: "nav.projects",     href: "#projects",     icon: HiCollection },
  { key: "certificates", translationKey: "nav.certificates", href: "#certificates", icon: HiAcademicCap },
  { key: "other",        translationKey: "nav.other",        href: "#other",        icon: HiStar },
  { key: "contact",      translationKey: "nav.contact",      href: "#contact",      icon: HiMail },
];