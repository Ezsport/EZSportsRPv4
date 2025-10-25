"use client";

import Link from "next/link";
import {
  LayoutDashboardIcon,
  UsersIcon,
  TrophyIcon,
  SettingsIcon,
  HelpCircleIcon,
  CodeIcon,
  DatabaseIcon,
  UserIcon,
  ShieldIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
  CalendarIcon,
  AwardIcon,
  GlobeIcon,
  LayoutGridIcon,
  CogIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MessageCircleIcon,
  UsersRoundIcon,
  ClipboardListIcon,
  BarChart3Icon,
  UserCogIcon,
  PresentationIcon,
  FolderKanbanIcon,
  NetworkIcon,
  BriefcaseIcon,
  MessageSquareIcon,
  LightbulbIcon,
  FileTextIcon,
  CreditCardIcon,
  ActivityIcon,
  PieChartIcon,
  TagIcon,
  MapPinIcon,
  StarIcon,
  FlagIcon,
  TargetIcon,
  BookIcon,
  HeartPulseIcon,
  WrenchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

const adminSidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: PresentationIcon,
    children: [],
  },
  {
    title: "Base Data",
    icon: NetworkIcon,
    children: [
      {
        title: "Sports",
        href: "/admin/sports",
        icon: TrophyIcon,
      },
      {
        title: "Group Levels",
        href: "/admin/group-levels",
        icon: StarIcon,
      },
      {
        title: "Competitions",
        href: "/admin/competitions",
        icon: FlagIcon,
      },
      {
        title: "Countries",
        href: "/admin/countries",
        icon: GlobeIcon,
      },
      {
        title: "Fields",
        href: "/admin/fields",
        icon: MapPinIcon,
      },
    ],
  },
  {
    title: "Access Control",
    icon: ShieldIcon,
    children: [
      {
        title: "Roles",
        href: "/admin/roles",
        icon: TagIcon,
      },
      {
        title: "Permissions",
        href: "/admin/permissions",
        icon: KeyRoundIcon,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: UsersIcon,
      },
      {
        title: "User Roles",
        href: "/admin/user-roles",
        icon: UserCogIcon,
      },
      {
        title: "User Permissions",
        href: "/admin/user-permissions",
        icon: ShieldCheckIcon,
      },
      {
        title: "Access Logs",
        href: "/admin/access-logs",
        icon: ActivityIcon,
      },
      {
        title: "Login Logs",
        href: "/admin/login-logs",
        icon: BookIcon,
      },
    ],
  },
  {
    title: "Sports Settings",
    icon: WrenchIcon,
    children: [
      {
        title: "Event Types",
        href: "/admin/event-types",
        icon: CalendarIcon,
      },
      {
        title: "Game Periods",
        href: "/admin/game-periods",
        icon: TargetIcon,
      },
      {
        title: "Player Positions",
        href: "/admin/player-positions",
        icon: AwardIcon,
      },
      {
        title: "Coach Types",
        href: "/admin/coach-types",
        icon: BriefcaseIcon,
      },
      {
        title: "Manager Types",
        href: "/admin/manager-types",
        icon: UserCogIcon,
      },
      {
        title: "Referee Types",
        href: "/admin/referee-types",
        icon: HeartPulseIcon,
      },
    ],
  },
  {
    title: "Organizations",
    icon: FolderKanbanIcon,
    children: [
      {
        title: "Clubs",
        href: "/admin/clubs",
        icon: ShieldCheckIcon,
      },
      {
        title: "Leagues",
        href: "/admin/leagues",
        icon: TrophyIcon,
      },
      {
        title: "Teams",
        href: "/admin/teams",
        icon: UsersRoundIcon,
      },
    ],
  },
  {
    title: "All Members",
    icon: UsersIcon,
    children: [
      {
        title: "Persons",
        href: "/admin/persons",
        icon: UserIcon,
      },
      {
        title: "Players",
        href: "/admin/players",
        icon: AwardIcon,
      },
      {
        title: "Coaches",
        href: "/admin/coaches",
        icon: BriefcaseIcon,
      },
      {
        title: "Managers",
        href: "/admin/managers",
        icon: UserCogIcon,
      },
      {
        title: "Referees",
        href: "/admin/referees",
        icon: HeartPulseIcon,
      },
      {
        title: "Sponsors",
        href: "/admin/sponsors",
        icon: CreditCardIcon,
      },
      {
        title: "Team Managers",
        href: "/admin/team-managers",
        icon: UserCogIcon,
      },
      {
        title: "Parents",
        href: "/admin/parents",
        icon: UserIcon,
      },
      {
        title: "Club Admins",
        href: "/admin/club-admins",
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    title: "Schedules",
    icon: CalendarIcon,
    children: [
      {
        title: "Games",
        href: "/admin/games",
        icon: TrophyIcon,
      },
      {
        title: "Meetings",
        href: "/admin/meetings",
        icon: MessageSquareIcon,
      },
      {
        title: "Trainings",
        href: "/admin/trainings",
        icon: PieChartIcon,
      },
    ],
  },
  {
    title: "Matches",
    icon: FlagIcon,
    children: [
      {
        title: "Matches",
        href: "/admin/matches",
        icon: TrophyIcon,
      },
      {
        title: "Match Results",
        href: "/admin/match-results",
        icon: PieChartIcon,
      },
      {
        title: "Match Reports",
        href: "/admin/match-reports",
        icon: FileTextIcon,
      },
    ],
  },
  {
    title: "Membership",
    icon: CreditCardIcon,
    children: [
      {
        title: "Memberships",
        href: "/admin/memberships",
        icon: TagIcon,
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCardIcon,
      },
      {
        title: "Invoices",
        href: "/admin/invoices",
        icon: FileTextIcon,
      },
      {
        title: "Transactions",
        href: "/admin/transactions",
        icon: ActivityIcon,
      },
      {
        title: "Refunds",
        href: "/admin/refunds",
        icon: WrenchIcon,
      },
    ],
  },
  {
    title: "Chat Messages",
    icon: MessageCircleIcon,
    children: [
      {
        title: "Messages",
        href: "/admin/messages",
        icon: MessageSquareIcon,
      },
      {
        title: "Notifications",
        href: "/admin/notifications",
        icon: LightbulbIcon,
      },
    ],
  },
  {
    title: "AI Analytics",
    icon: LightbulbIcon,
    children: [
      {
        title: "Training Data",
        href: "/admin/training-data",
        icon: BookIcon,
      },
      {
        title: "Analysis History",
        href: "/admin/analysis-history",
        icon: PieChartIcon,
      },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircleIcon,
    children: [
      {
        title: "Documentation",
        href: "/admin/docs",
        icon: BookOpenIcon,
      },
      {
        title: "Support Ticket",
        href: "/admin/support",
        icon: LifeBuoyIcon,
      },
      {
        title: "API Documentation",
        href: "/admin/api-docs",
        icon: CodeIcon,
      },
    ],
  },
];

export function SidebarAdmin() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href?: string) => pathname === href;

  const renderMenuItem = (item: (typeof adminSidebarNavItems)[0]) => {
    // If no children, render as a simple link
    if (!item.children || item.children.length === 0) {
      return (
        <Link
          key={item.href}
          href={item.href || "#"}
          className={cn(
            "flex items-center p-1.5 rounded-lg transition-colors duration-200",
            isActive(item.href)
              ? "bg-primary-foreground text-primary"
              : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
          )}
        >
          <item.icon className="mr-2.5 h-5 w-5" />
          <span className="font-medium text-sm">{item.title}</span>
        </Link>
      );
    }

    // If has children, render as expandable menu
    const isOpen =
      openMenus[item.title] ||
      // Keep menu open if any child is active
      item.children.some((child) => isActive(child.href));
    const hasActiveChild = item.children.some((child) => isActive(child.href));

    return (
      <div key={item.title} className="space-y-1">
        <div
          onClick={() => toggleMenu(item.title)}
          className={cn(
            "flex items-center p-1.5 rounded-lg cursor-pointer transition-colors duration-200",
            hasActiveChild
              ? "bg-primary-foreground/10 text-primary-foreground"
              : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
          )}
        >
          <item.icon className="mr-2.5 h-5 w-5" />{" "}
          {/* Increased from h-4 w-4 to h-5 w-5 */}
          <span className="font-medium flex-grow text-[0.9rem]">
            {item.title}
          </span>
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </div>

        {isOpen && (
          <div className="pl-4 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center p-1.5 pl-2 rounded-lg text-sm transition-colors duration-200",
                  isActive(child.href)
                    ? "bg-primary-foreground text-primary"
                    : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
                )}
              >
                {child.icon && <child.icon className="mr-2.5 h-4 w-4" />}{" "}
                {/* Increased from h-3.5 w-3.5 to h-4 w-4 */}
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground">
      <div className="flex flex-col h-full py-4 px-3">
        <div className="mb-6 px-4 py-1 text-2xl font-bold text-primary-foreground">
          Admin Panel
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          {adminSidebarNavItems.map(renderMenuItem)}
        </nav>

      </div>
    </aside>
  );
}
