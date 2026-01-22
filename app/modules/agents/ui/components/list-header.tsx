"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const ListHeader = () => {
  return (
    <div className="mb-4 flex items-center justify-between px-4 py-4 md:px-8">
      {/* Left side */}
      <h1 className="text-2xl font-semibold">My Agents</h1>

      {/* Right side */}
      <Button
        className="bg-linear-to-r from-indigo-600 to-sky-500 px-4 py-2 rounded text-white 
   transition-all duration-300"
      >
        <PlusIcon />
        New Agent
      </Button>
    </div>
  );
};
