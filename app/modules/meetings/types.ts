import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type MeetingOne = inferRouterOutputs<AppRouter>["meeting"]["getOne"];

type MeetingGetManyOutput = inferRouterOutputs<AppRouter>["meeting"]["getMany"];
export type MeetingListItem = MeetingGetManyOutput["items"][number];
