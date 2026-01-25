"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/error";
import { LoadingState } from "@/components/loading-state";

interface AgentDetailViewProps {
  agentId: string;
}

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "MMM d, yyyy • h:mm a");
};

export const AgentDetailView = ({ agentId }: AgentDetailViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agent.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 px-4 pb-6 pt-4 md:px-8">
      <div className="mb-6 flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/agents">Agents</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{data.name}</h1>
              <Badge variant="secondary">Agent</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Created {formatDate(data.createdAt)} • Updated {formatDate(data.updatedAt)}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/agents">Back to agents</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>How this agent should behave.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm text-foreground">
              {data.instructions}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Reference information for this agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Agent ID</p>
              <p className="font-mono text-xs">{data.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created at</p>
              <p>{formatDate(data.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last updated</p>
              <p>{formatDate(data.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const AgentDetailViewLoading = () => {
  return <LoadingState title="Loading agent..." />;
};

export const AgentDetailViewError = () => {
  return <ErrorState title="Error loading agent." />;
};
