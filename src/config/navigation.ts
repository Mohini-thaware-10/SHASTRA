import type { FooterColumn, NavItem } from "@/types/content";

export const primaryNavigation: readonly NavItem[] = [
  { label: "Home", href: "/#top" },
  { label: "Explore", href: "/#universes" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Students", href: "/#experience" },
  { label: "For Teachers", href: "/#teachers" },
];

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Discover",
    links: [
      { label: "About", href: "/#top" },
      { label: "Features", href: "/#capabilities" },
      { label: "Student Experience", href: "/#experience" },
      { label: "Teacher Experience", href: "/#teachers" },
    ],
  },
  {
    title: "The Universes",
    links: [
      { label: "SHATRA Junior", href: "/#universes" },
      { label: "SHATRA Nexus", href: "/#universes" },
      { label: "SHATRA Ascend", href: "/#universes" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const accountNavigation = {
  signIn: { label: "Sign In", href: "/sign-in" },
  getStarted: { label: "Get Started", href: "/sign-in" },
} as const;
