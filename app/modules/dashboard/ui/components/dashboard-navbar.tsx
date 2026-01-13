"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";


export const DashboardNavBar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
    <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
      <Button className="size-9" variant="outline" onClick={toggleSidebar}>
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon />
        ) : (
          <PanelLeftCloseIcon />
        )}
      </Button>
      <Button
        className="h-9 w-66.5 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        variant="outline"
        size="sm"
        onClick={() => setCommandOpen((open)=>!open)}
      >
        <SearchIcon />
        Search agents, Meetings and all...
        <Kbd>
          <span>&#8984;</span>
        </Kbd>
      </Button>
    </nav>
    </>
  );
};
