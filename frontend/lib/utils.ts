import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  TrophyIcon,
  GlobeIcon,
  LayoutGridIcon,
  UserIcon,
  ShieldIcon,
  KeyRoundIcon,
  CalendarIcon,
  AwardIcon,
  SettingsIcon,
  CogIcon,
  CodeIcon,
  DatabaseIcon,
  HelpCircleIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  LayoutDashboardIcon,
  UsersIcon,
  UsersRoundIcon,
  ShieldCheckIcon,
  MessageCircleIcon,
  BarChart3Icon,
  StarIcon
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSectionIcon(section: string) {
  const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    sports: TrophyIcon,
    countries: GlobeIcon,
    fields: LayoutGridIcon,
    "group-levels": StarIcon,
    competitions: TrophyIcon,
  };

  return sectionIcons[section] || LayoutDashboardIcon;
}
