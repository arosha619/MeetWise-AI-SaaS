"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Zap, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Manage your meetings, agents, and productivity from one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage your scheduled meetings
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group-hover:text-primary">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/agents">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure your AI agents
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group-hover:text-primary">
                Manage Agents <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-primary/20">
          <Link href="/dashboard/upgrade">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upgrade to Pro</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mt-1">
                Unlock advanced features and priority support
              </p>
              <Button className="mt-4 w-full" size="sm">
                Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Create Meeting CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Your First Meeting
          </CardTitle>
          <CardDescription>
            Get started by scheduling a new meeting or setting up an agent to help automate your workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
