import { agentRouter } from "@/app/modules/agents/server/procedures";
import { meetingRouter } from "@/app/modules/meetings/server/procedure";
import { createTRPCRouter } from "../init";


export const appRouter = createTRPCRouter({
  agent: agentRouter,
  meeting: meetingRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
