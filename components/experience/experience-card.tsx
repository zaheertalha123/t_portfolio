import { CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export type RoleStatus = "current" | "completed";

interface ExperienceCardProps {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  status?: RoleStatus;
  description: string;
  achievements: string[];
}

function resolveStatus(period: string, status?: RoleStatus): RoleStatus {
  if (status) return status;
  return /present/i.test(period) ? "current" : "completed";
}

export function ExperienceCard({
  title,
  company,
  companyUrl,
  period,
  location,
  status,
  description,
  achievements,
}: ExperienceCardProps) {
  const roleStatus = resolveStatus(period, status);
  const isCurrent = roleStatus === "current";

  return (
    <div className="space-y-4 pb-6 border-b border-zinc-800 last:border-0 last:pb-0 tracking-wide">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium text-base sm:text-lg">{title}</h4>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium border",
                isCurrent
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-zinc-800/80 text-zinc-400 border-zinc-700/80"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isCurrent
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-zinc-500"
                )}
                aria-hidden
              />
              {isCurrent ? "In Progress" : "Completed"}
            </span>
          </div>
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              {company}
            </a>
          ) : (
            <div className="text-sm text-cyan-400">{company}</div>
          )}
          {location && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-cyan-400/80" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <div className="text-xs text-zinc-400 bg-zinc-800/70 px-2 py-1 sm:px-3 sm:py-1 rounded-full self-start shrink-0">
          {period}
        </div>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed">{description}</p>

      <div className="space-y-3">
        <div className="sm:hidden">
          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
              <h5 className="text-sm font-medium text-cyan-400">
                Key Achievements
              </h5>
              <ChevronDown className="h-4 w-4 text-cyan-400" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="hidden sm:block">
          <h5 className="text-sm font-medium text-zinc-400">
            Key Achievements
          </h5>
          <ul className="space-y-2 mt-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
