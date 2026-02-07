import { db } from "@/db";
import { meetings } from "@/db/schema";
import {
    createTRPCRouter,
    protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { meetingInsertSchema } from "../schema";

export const meetingRouter = createTRPCRouter({
    create: protectedProcedure
        .input(meetingInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdMeeting;
        }),
    //to-do; change getmany to use protected procedure
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {

        const [existingMeeting] = await db.select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, input.id),
                    eq(meetings.userId, ctx.auth.user.id)
                ));
        if (!existingMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found" });
        }

        return existingMeeting;
    }),

    getMany: protectedProcedure
        .input(
            z.object({
                page: z.number().default(DEFAULT_PAGE),
                pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
                search: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { page, pageSize, search } = input;
            const offset = (page - 1) * pageSize;
            const data = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined
                    )
                )
                .orderBy(desc(meetings.createdAt), desc(meetings.id))
                .limit(pageSize)
                .offset(offset);

            const [total] = await db
                .select({ count: count() })
                .from(meetings)
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined
                    )
                );
            const totalCount = Number(total.count ?? 0);
            const totalpages = Math.ceil(totalCount / pageSize);
            return {
                items: data,
                total: totalCount,
                totalpages
            };
        }),


});
