"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export function CareerShiftCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-transparent border-none shadow-none">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full py-3 px-3 sm:py-6 sm:px-4 lg:py-8 flex items-center justify-between rounded-xl transition-colors duration-200 hover:bg-black/25 data-[state=open]:bg-black/25 data-[state=open]:rounded-t-xl data-[state=open]:rounded-b-none"
            >
              <div className="text-left flex-1 min-w-0 pr-2">
                <div className="text-sm sm:text-base font-medium text-white truncate">
                  Degree or Certification
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 truncate">
                  Institution Name • Year or Range
                </div>
              </div>
              <div className="flex items-center text-cyan-400 flex-shrink-0">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 sm:p-5 rounded-b-xl bg-black/25 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Placeholder education note. Share a concise highlight about your
            academic journey: focus areas, notable coursework, awards, or
            extracurriculars that shaped your skills. Mention relevant tools or
            technologies you practiced and how the experience informs your work.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
