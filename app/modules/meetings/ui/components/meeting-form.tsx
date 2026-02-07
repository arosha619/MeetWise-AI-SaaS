"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { meetingInsertSchema } from "../../schema";
import { MeetingOne } from "../../types";
import { NewAgentDialog } from "@/app/modules/agents/ui/components/new-agent-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MeetingFormValues = z.infer<typeof meetingInsertSchema>;

interface MeetingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: MeetingOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const meetingId = initialValues?.id as string | undefined;

  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingInsertSchema),
    defaultValues: {
      name: String(initialValues?.name ?? ""),
      agentId: String(initialValues?.agentId ?? ""),
    },
  });

  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const { data: agentsData, refetch: refetchAgents } = useQuery(
    trpc.agent.getMany.queryOptions({})
  );
  const agents = agentsData?.items ?? [];

  const createMeeting = useMutation(
    trpc.meeting.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.meeting.getMany.queryOptions({}).queryKey,
        });
        if (meetingId) {
          await queryClient.invalidateQueries({
            queryKey: trpc.meeting.getOne.queryOptions({ id: meetingId })
              .queryKey,
          });
        }
        form.reset();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meeting.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.meeting.getMany.queryOptions({}).queryKey,
        });
        if (meetingId) {
          await queryClient.invalidateQueries({
            queryKey: trpc.meeting.getOne.queryOptions({ id: meetingId })
              .queryKey,
          });
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const onSubmit = async (values: MeetingFormValues) => {
    if (meetingId) {
      updateMeeting.mutate({ id: meetingId, ...values });
      return;
    }
    createMeeting.mutate(values);
  };

  const isEdit = !!meetingId;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  return (
    <>
      <NewAgentDialog
        open={agentDialogOpen}
        onOpenChange={(open) => {
          setAgentDialogOpen(open);
          if (!open) void refetchAgents();
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter meeting name"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agents.length === 0 ? (
                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                      No agents yet.{" "}
                      <button
                        type="button"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={() => setAgentDialogOpen(true)}
                      >
                        Create your first agent
                      </button>
                    </div>
                  ) : (
                    agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="-mt-1 h-auto p-0 text-muted-foreground hover:text-primary"
                onClick={() => setAgentDialogOpen(true)}
              >
                <PlusIcon className="mr-1 size-3.5" />
                Create new agent
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Meeting"
                : "Create Meeting"}
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
};
