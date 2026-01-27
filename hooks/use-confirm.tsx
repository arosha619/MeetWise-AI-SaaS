"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

interface UseConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const useConfirm = ({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: UseConfirmOptions) => {
  const [open, setOpen] = useState(false);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback(() => {
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleClose = useCallback((value: boolean) => {
    setOpen(false);
    if (resolverRef.current) {
      resolverRef.current(value);
      resolverRef.current = null;
    }
  }, []);

  const ConfirmDialog = useMemo(
    () =>
      function ConfirmDialog() {
        return (
          <ResponsiveDialog
            open={open}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                handleClose(false);
              }
            }}
            title={title}
            description={description}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:items-center">
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                onClick={() => handleClose(false)}
              >
                {cancelText}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="destructive"
                onClick={() => handleClose(true)}
              >
                {confirmText}
              </Button>
            </div>
          </ResponsiveDialog>
        );
      },
    [cancelText, confirmText, description, handleClose, open, title]
  );

  return [ConfirmDialog, confirm] as const;
};
