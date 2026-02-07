import {
  parseAsInteger,
  parseAsStringLiteral,
  parseAsString,
  useQueryStates,
} from "nuqs";

import { DEFAULT_PAGE } from "@/constants";

const meetingStatuses = [
  "all",
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
] as const;

export type MeetingStatusFilter = (typeof meetingStatuses)[number];

export const useMeetingsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    status: parseAsStringLiteral(meetingStatuses).withDefault("all").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  });
};
