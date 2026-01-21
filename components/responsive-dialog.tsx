"use client";
import { useIsMobile } from "@/hooks/use-mobile";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

interface ResponsiveDialogProps {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
export function ResponsiveDialog({
  title,
  description,
  open,
  onOpenChange,
  children,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>;
}
