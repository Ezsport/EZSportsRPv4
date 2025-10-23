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
  BarChart3Icon
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSectionIcon = (section: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    // Base Data
    sports: TrophyIcon,
    countries: GlobeIcon,
    fields: LayoutGridIcon,

    // User Management
    users: UserIcon,
    roles: ShieldIcon,
    permissions: KeyRoundIcon,

    // Sports Management
    "event-types": CalendarIcon,
    "player-positions": AwardIcon,

    // Competition Management
    calendar: CalendarIcon,
    events: TrophyIcon,
    teams: UsersRoundIcon,
    players: UserIcon,
    clubs: ShieldCheckIcon,

    // Communication
    messages: MessageCircleIcon,

    // User Profile
    "user-info": UserIcon,
    comparison: BarChart3Icon,

    // System Configuration
    settings: SettingsIcon,
    "general-settings": CogIcon,

    // Other sections
    dashboard: LayoutDashboardIcon,
    dev: CodeIcon,
    database: DatabaseIcon,
    help: HelpCircleIcon,
    documentation: BookOpenIcon,
    support: LifeBuoyIcon,
  };

  // Default to Users icon if no specific icon is found
  return iconMap[section.toLowerCase()] || UsersIcon;
};
