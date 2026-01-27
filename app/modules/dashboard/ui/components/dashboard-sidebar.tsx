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
import { Calendar, Zap, Settings, LogOut, User } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

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
  },
  {
    href: "/agents",
    label: "Agents",
    icon: Settings,
  },
  {
    href: "/upgrade",
    label: "Upgrade",
    icon: Zap,
    badge: "Pro",
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserSession | null>(null);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Sign out?",
    description: "You will need to sign in again to access your account.",
    confirmText: "Sign out",
  });

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await response.json();
        setUser(data.session);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };

    fetchUserSession();
  }, []);

  const handleSignOut = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;
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
    <Sidebar className="border-r border-border bg-background">
      <ConfirmDialog />
      <SidebarHeader className="border-b border-border px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative h-8 w-32">
            <Image
              src="/logo-color.svg"
              alt="MeetWise Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  size="lg"
                  tooltip={item.label}
                >
                  <Link href={item.href} className="flex items-center gap-3 w-full">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border px-3 pt-4 pb-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            {user?.user?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image
                  src={user.user.image}
                  alt={user.user.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium shrink-0">
                {user?.user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.user?.email || "Loading..."}
              </p>
            </div>
          </div>

          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start"
            size="lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}