"use client";

import { ErrorState } from "@/components/error";
import { EmptyMeetingsIllustration, EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { DataPagination } from "@/components/data-pagination";
import { columns } from "../components/columns";
import { DEFAULT_PAGE } from "@/constants";
import { useRouter } from "next/navigation";

export const MeetingView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();
  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.meeting.getMany.queryOptions({ ...filters })
  );
  const page = filters.page ?? DEFAULT_PAGE;
  const totalPages = data.totalpages ?? 0;

  if (data.items.length === 0) {
    return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <EmptyState
          title="Create your first meeting"
          description="Start by scheduling a new meeting with one of your agents."
          media={<EmptyMeetingsIllustration />}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(meeting) => router.push(`/meetings/${meeting.id}`)}
      />
      <DataPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(nextPage) =>
          setFilters({
            search: filters.search,
            page: nextPage,
          })
        }
      />
    </div>
  );
};

export const MeetingViewLoading = () => {
    return <LoadingState title="Meetings Loading..." />;
};

export const MeetingViewError = () => {
    return <ErrorState title="Error loading Meetings." />;
};