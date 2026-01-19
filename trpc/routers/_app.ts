import { agentRouter } from "@/app/modules/agents/server/procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agent: agentRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
