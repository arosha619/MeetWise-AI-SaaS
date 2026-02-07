import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  title: string
  description?: string
  media?: React.ReactNode
  children?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  media,
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Empty className={cn("bg-muted/10", className)} {...props}>
      <EmptyHeader>
        {media ? <EmptyMedia>{media}</EmptyMedia> : null}
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {children ? <EmptyContent>{children}</EmptyContent> : null}
    </Empty>
  )
}

export function EmptyAgentsIllustration() {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <Image
        src="/empty-agents.svg"
        alt="Empty agents"
        width={96}
        height={96}
        className="size-24 text-muted-foreground/70"
      />
    </div>
  )
}

export function EmptyMeetingsIllustration() {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <Image
        src="/empty-agents.svg"
        alt="Empty meetings"
        width={96}
        height={96}
        className="size-24 text-muted-foreground/70"
      />
    </div>
  )
}
