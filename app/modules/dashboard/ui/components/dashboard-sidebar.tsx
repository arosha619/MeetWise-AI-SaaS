"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Calendar, Zap, Settings, LogOut, Sparkles, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSession {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

const navigationItems = [
  {
    href: "/dashboard",
    label: "Meetings",
    icon: Calendar,
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
  },
  {
    href: "/dashboard/agents",
    label: "Agents",
    icon: Settings,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    href: "/dashboard/upgrade",
    label: "Upgrade",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    badge: "Pro",
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await response.json();
        setUser(data.session);
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <Sidebar className="border-r border-slate-200/60 bg-gradient-to-b from-white via-slate-50/30 to-white backdrop-blur-sm">
      <SidebarHeader className="border-b border-slate-200/60 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-full h-full text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MeetWise
            </span>
            <span className="text-xs text-slate-500 font-medium">AI Meeting Assistant</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between flex-1 px-4 py-6">
        <SidebarMenu className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  size="lg"
                  className={cn(
                    "group relative overflow-hidden rounded-xl transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-lg",
                    active
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-md shadow-indigo-500/25`
                      : "hover:bg-slate-100/80 text-slate-700 hover:text-slate-900"
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-3 w-full">
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-all duration-300",
                        active
                          ? "bg-white/20 backdrop-blur-sm"
                          : `bg-gradient-to-br ${item.bgGradient} group-hover:scale-110`
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-all duration-300",
                          active ? "text-white" : `text-slate-600 group-hover:text-slate-900`
                        )}
                      />
                    </div>
                    <span className="font-semibold flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-bold",
                          active
                            ? "bg-white/30 text-white"
                            : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    {active && (
                      <ArrowRight className="w-4 h-4 ml-auto animate-in slide-in-from-right-2 duration-300" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <div className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 px-4 pt-6 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-xl shadow-indigo-500/20">
          <div className="rounded-2xl bg-white/95 backdrop-blur-md p-4">
            <div className="flex items-center gap-3 mb-4">
              {user?.user?.image ? (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-indigo-500/20 shadow-lg">
                  <Image
                    src={user.user.image}
                    alt={user.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg ring-2 ring-indigo-500/20">
                  {user?.user?.name?.charAt(0).toUpperCase() || <User className="w-6 h-6" />}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {user?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-600 truncate">
                  {user?.user?.email || "Loading..."}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full group hover:bg-slate-100 font-semibold text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-[1.02]"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              Sign Out
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}