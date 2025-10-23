"use client"

import Link from "next/link"
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  TrophyIcon, 
  SettingsIcon, 
  HelpCircleIcon,
  CalendarIcon,
  TentIcon,
  UsersRoundIcon,
  UserIcon,
  ListIcon,
  MessageCircleIcon,
  UserCircleIcon,
  BarChartIcon,
  BuildingIcon,
  RefreshCwIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: LayoutDashboardIcon
  },
  {
    title: "Calendar",
    href: "/app/calendar",
    icon: CalendarIcon
  },
  {
    title: "Events",
    href: "/app/events",
    icon: TentIcon
  },
  {
    title: "Teams",
    href: "/app/teams",
    icon: UsersRoundIcon
  },
  {
    title: "Players",
    href: "/app/players",
    icon: UserIcon
  },
  {
    title: "Roster",
    href: "/app/roster",
    icon: ListIcon
  },
  {
    title: "Messages",
    href: "/app/messages",
    icon: MessageCircleIcon
  },
  {
    title: "User Info",
    href: "/app/user-info",
    icon: UserCircleIcon
  },
  {
    title: "Comparison",
    href: "/app/comparison",
    icon: BarChartIcon
  },
  {
    title: "Clubs",
    href: "/app/clubs",
    icon: BuildingIcon
  },
  {
    title: "Referees",
    href: "/app/referees",
    icon: RefreshCwIcon
  },
  {
    title: "Settings",
    href: "/app/settings",
    icon: SettingsIcon
  },
  {
    title: "Help",
    href: "/app/help",
    icon: HelpCircleIcon
  }
]

export function SidebarApp() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r">
      <div className="flex flex-col h-full py-4 px-3 pt-20">
        <nav className="space-y-2">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-lg transition-colors duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <Button variant="outline" className="w-full">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </aside>
  )
}
