"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function getInitials(name: string | null | undefined): string {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  name?: string | null;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-12 text-sm",
  lg: "size-16 text-base",
};

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(name);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-muted",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name ?? "Avatar"}
          className="aspect-square size-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        delayMs={0}
        className="flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground"
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
