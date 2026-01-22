import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "../schema";

export const agentRouter = createTRPCRouter({
  //to-do; change getmany to use protected procedure
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // throw new TRPCError({
    //   code: "FORBIDDEN",
    //   message: "You do not have access to view agents.",
    // });

    return data;
  }),
  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
    const [createdAgent] = await db
    .insert(agents)
    .values({
      ...input,
      userId: ctx.auth.user.id,
    })
    .returning();
    
  return createdAgent;
}),
});
