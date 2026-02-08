"use client";

import Link from "next/link";
import { format } from "date-fns";
import { PlayCircleIcon, XCircleIcon } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
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
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { MeetingForm } from "../components/meeting-form";
import { MeetingOne } from "../../types";
import { useState } from "react";

interface MeetingDetailViewProps {
  meetingId: string;
}

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "MMM d, yyyy • h:mm a");
};

const statusVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" => {
  switch (status) {
    case "upcoming":
      return "info";
    case "active":
      return "success";
    case "completed":
      return "secondary";
    case "processing":
      return "warning";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

export const MeetingDetailView = ({ meetingId }: MeetingDetailViewProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const { data: meetingData } = useSuspenseQuery(
    trpc.meeting.getOne.queryOptions({ id: meetingId })
  );
  const data = meetingData as MeetingOne;
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete this meeting?",
    description:
      "This action cannot be undone. This will permanently delete the meeting.",
    confirmText: "Delete meeting",
  });

  const [CancelMeetingDialog, confirmCancel] = useConfirm({
    title: "Cancel this meeting?",
    description:
      "The meeting will be marked as cancelled. You can still view its details.",
    confirmText: "Cancel meeting",
    cancelText: "Keep meeting",
  });

  const removeMeeting = useMutation(
    trpc.meeting.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.meeting.getMany.queryOptions({}).queryKey,
        });
        await queryClient.invalidateQueries({
          queryKey: trpc.meeting.getOne.queryOptions({ id: meetingId }).queryKey,
        });
        toast.success("Meeting deleted");
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleDelete = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;
    removeMeeting.mutate({ id: meetingId });
  };

  const invalidateMeeting = async () => {
    await queryClient.invalidateQueries({
      queryKey: trpc.meeting.getMany.queryOptions({}).queryKey,
    });
    await queryClient.invalidateQueries({
      queryKey: trpc.meeting.getOne.queryOptions({ id: meetingId }).queryKey,
    });
  };

  const startMeeting = useMutation(
    trpc.meeting.startMeeting.mutationOptions({
      onSuccess: async () => {
        await invalidateMeeting();
        toast.success("Meeting started");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const cancelMeeting = useMutation(
    trpc.meeting.cancelMeeting.mutationOptions({
      onSuccess: async () => {
        await invalidateMeeting();
        toast.success("Meeting cancelled");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleStartMeeting = () => {
    startMeeting.mutate({ id: meetingId });
  };

  const handleCancelMeeting = async () => {
    const confirmed = await confirmCancel();
    if (!confirmed) return;
    cancelMeeting.mutate({ id: meetingId });
  };

  const canStart = data.status === "upcoming";
  const canCancel = data.status === "upcoming" || data.status === "active";

  return (
    <div className="flex-1 px-4 pb-6 pt-4 md:px-8">
      <div className="mb-6 flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/meetings">Meetings</Link>
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
              <Badge variant={statusVariant(data.status)}>{data.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Created {formatDate(data.createdAt)} • Updated{" "}
              {formatDate(data.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/meetings">Back to meetings</Link>
            </Button>
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button
              variant="destructive"
              disabled={removeMeeting.isPending}
              onClick={handleDelete}
            >
              {removeMeeting.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog />
      <CancelMeetingDialog />
      <ResponsiveDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Meeting"
        description="Update meeting details"
      >
        <MeetingForm
          initialValues={data}
          onSuccess={() => setEditOpen(false)}
          onCancel={() => setEditOpen(false)}
        />
      </ResponsiveDialog>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Meeting information and content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(canStart || canCancel) && (
              <div className="flex flex-wrap gap-3 rounded-lg border border-dashed bg-muted/30 p-4">
                {canStart && (
                  <Button
                    onClick={handleStartMeeting}
                    disabled={startMeeting.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                  >
                    <PlayCircleIcon className="mr-2 size-5" />
                    {startMeeting.isPending ? "Starting..." : "Start Meeting"}
                  </Button>
                )}
                {canCancel && (
                  <Button
                    variant="outline"
                    onClick={handleCancelMeeting}
                    disabled={cancelMeeting.isPending}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-950/50"
                  >
                    <XCircleIcon className="mr-2 size-5" />
                    {cancelMeeting.isPending ? "Cancelling..." : "Cancel Meeting"}
                  </Button>
                )}
              </div>
            )}
            {data.summary && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Summary
                </p>
                <p className="whitespace-pre-wrap break-all text-sm text-foreground">
                  {data.summary}
                </p>
              </div>
            )}
            {data.transcriptUrl && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Transcript
                </p>
                <a
                  href={data.transcriptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View transcript
                </a>
              </div>
            )}
            {!data.summary && !data.transcriptUrl && (
              <p className="text-sm text-muted-foreground">
                No additional details yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
            <CardDescription>Reference information for this meeting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Meeting ID</p>
              <p className="font-mono text-xs">{data.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Agent</p>
              <p>{(data as MeetingOne & { agentName?: string | null }).agentName ?? data.agentId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="capitalize">{data.status}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Started at</p>
              <p>{formatDate(data.startedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Ended at</p>
              <p>{formatDate(data.endedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p>{(data as MeetingOne & { duration?: string | null }).duration ?? "—"}</p>
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

export const MeetingDetailViewLoading = () => {
  return <LoadingState title="Loading meeting..." />;
};

export const MeetingDetailViewError = () => {
  return <ErrorState title="Error loading meeting." />;
};
