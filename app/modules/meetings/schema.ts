import { z } from "zod";

export const meetingInsertSchema = z.object({
  name: z.string().min(1, { message: " Name is required" }),
  agentId: z.string().min(1, { message: " agent id is required" }),
});

export const meetingStatusEnum = z.enum([
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
]);

export const meetingUpdateSchema = meetingInsertSchema
  .extend({
    id: z.string().min(1, { message: "ID is required" }),
  })
  .extend({
    status: meetingStatusEnum.optional(),
  });
