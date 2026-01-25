"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (canGoPrevious) {
                onPageChange(page - 1);
              }
            }}
            className={!canGoPrevious ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={(event) => event.preventDefault()}>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (canGoNext) {
                onPageChange(page + 1);
              }
            }}
            className={!canGoNext ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};