"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { cn } from "@/lib/utils";


export const DashboardNavBar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
    <nav className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <Button 
        className="size-9" 
        variant="ghost" 
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon className="h-5 w-5" />
        ) : (
          <PanelLeftCloseIcon className="h-5 w-5" />
        )}
      </Button>
      
      <div className="flex-1 max-w-2xl">
        <button
          onClick={() => setCommandOpen((open) => !open)}
          className={cn(
            "relative flex w-full items-center gap-3 rounded-lg border border-input bg-background px-4 py-2.5",
            "text-sm text-muted-foreground shadow-sm transition-all",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:border-primary/50"
          )}
        >
          <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
          <span className="flex-1 text-left">Search agents, Meetings and all...</span>
          <Kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </Kbd>
        </button>
      </div>
    </nav>
    </>
  );
};
