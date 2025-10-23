"use client"

import Link from "next/link"
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
  UserCogIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"

const adminSidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboardIcon,
    children: []
  },
  {
    title: "Base Data",
    icon: UsersIcon,
    children: [
      {
        title: "Sports",
        href: "/admin/sports",
        icon: TrophyIcon
      },
      {
        title: "Countries",
        href: "/admin/countries",
        icon: GlobeIcon
      },
      {
        title: "Fields",
        href: "/admin/fields",
        icon: LayoutGridIcon
      }
    ]
  },
  {
    title: "User Management",
    icon: UsersIcon,
    children: [
      {
        title: "Users",
        href: "/admin/users",
        icon: UserIcon
      },
      {
        title: "Roles",
        href: "/admin/roles",
        icon: ShieldIcon
      },
      {
        title: "Permissions",
        href: "/admin/permissions",
        icon: KeyRoundIcon
      }
    ]
  },
  {
    title: "Sports Management",
    icon: TrophyIcon,
    children: [
      {
        title: "Sports",
        href: "/admin/sports",
        icon: ShieldCheckIcon
      },
      {
        title: "Event Types",
        href: "/admin/event-types",
        icon: CalendarIcon
      },
      {
        title: "Player Positions",
        href: "/admin/player-positions",
        icon: AwardIcon
      }
    ]
  },
  {
    title: "Competition Management",
    icon: ClipboardListIcon,
    children: [
      {
        title: "Calendar",
        href: "/admin/calendar",
        icon: CalendarIcon
      },
      {
        title: "Events",
        href: "/admin/events",
        icon: TrophyIcon
      },
      {
        title: "Teams",
        href: "/admin/teams",
        icon: UsersRoundIcon
      },
      {
        title: "Players",
        href: "/admin/players",
        icon: UserIcon
      },
      {
        title: "Clubs",
        href: "/admin/clubs",
        icon: ShieldCheckIcon
      }
    ]
  },
  {
    title: "Communication",
    icon: MessageCircleIcon,
    children: [
      {
        title: "Messages",
        href: "/admin/messages",
        icon: MessageCircleIcon
      }
    ]
  },
  {
    title: "User Profile",
    icon: UserCogIcon,
    children: [
      {
        title: "User Info",
        href: "/admin/user-info",
        icon: UserIcon
      },
      {
        title: "Comparison",
        href: "/admin/comparison",
        icon: BarChart3Icon
      }
    ]
  },
  {
    title: "System Configuration",
    icon: SettingsIcon,
    children: [
      {
        title: "Countries",
        href: "/admin/countries",
        icon: GlobeIcon
      },
      {
        title: "Fields",
        href: "/admin/fields",
        icon: LayoutGridIcon
      },
      {
        title: "General Settings",
        href: "/admin/settings",
        icon: CogIcon
      }
    ]
  },
  {
    title: "Development",
    href: "/admin/dev",
    icon: CodeIcon,
    children: []
  },
  {
    title: "Database",
    href: "/admin/database",
    icon: DatabaseIcon,
    children: []
  },
  {
    title: "Help & Support",
    icon: HelpCircleIcon,
    children: [
      {
        title: "Documentation",
        href: "/admin/docs",
        icon: BookOpenIcon
      },
      {
        title: "Support Ticket",
        href: "/admin/support",
        icon: LifeBuoyIcon
      }
    ]
  }
]

export function SidebarAdmin() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({})

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  const isActive = (href?: string) => pathname === href

  const renderMenuItem = (item: typeof adminSidebarNavItems[0]) => {
    // If no children, render as a simple link
    if (!item.children || item.children.length === 0) {
      return (
        <Link 
          key={item.href} 
          href={item.href || "#"}
          className={cn(
            "flex items-center p-2 rounded-lg transition-colors duration-200",
            isActive(item.href)
              ? "bg-primary-foreground text-primary" 
              : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          <span className="font-medium">{item.title}</span>
        </Link>
      )
    }

    // If has children, render as expandable menu
    const isOpen = openMenus[item.title] || false
    const hasActiveChild = item.children.some(child => isActive(child.href))

    return (
      <div key={item.title} className="space-y-1">
        <div 
          onClick={() => toggleMenu(item.title)}
          className={cn(
            "flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200",
            hasActiveChild 
              ? "bg-primary-foreground/10 text-primary-foreground" 
              : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          <span className="font-medium flex-grow">{item.title}</span>
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </div>
        
        {isOpen && (
          <div className="pl-6 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center p-2 rounded-lg text-sm transition-colors duration-200",
                  isActive(child.href)
                    ? "bg-primary-foreground text-primary" 
                    : "hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground/80"
                )}
              >
                {child.icon && <child.icon className="mr-3 h-4 w-4" />}
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground">
      <div className="flex flex-col h-full py-4 px-3">
        <div className="mb-6 px-4 py-2 text-2xl font-bold text-primary-foreground">
          Admin Panel
        </div>
        
        <nav className="space-y-2 flex-1 overflow-y-auto">
          {adminSidebarNavItems.map(renderMenuItem)}
        </nav>

        <div className="mt-auto pt-4 border-t border-primary-foreground/20">
          <Button 
            variant="outline" 
            className="w-full bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </aside>
  )
}
