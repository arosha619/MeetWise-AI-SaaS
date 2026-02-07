"use client";

import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandShortcut,
  ResponsiveCommandDialog,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Calendar, Settings, Zap, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();

  const handleSelect = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <ResponsiveCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search agents, meetings, and more..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => handleSelect(() => router.push("/dashboard"))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Meetings</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() => router.push("/dashboard/agents"))
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Agents</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() => router.push("/dashboard/upgrade"))
            }
          >
            <Zap className="mr-2 h-4 w-4" />
            <span>Upgrade</span>
            <CommandShortcut>Pro</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() =>
              handleSelect(() => {
                // Handle create meeting
                console.log("Create meeting");
              })
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Create Meeting</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleSelect(() => {
                // Handle create agent
                console.log("Create agent");
              })
            }
          >
            <User className="mr-2 h-4 w-4" />
            <span>Create Agent</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </ResponsiveCommandDialog>
  );
};
