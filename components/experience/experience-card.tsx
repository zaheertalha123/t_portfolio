import { CheckCircle2, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ExperienceCardProps {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  achievements: string[];
}

export function ExperienceCard({
  title,
  company,
  companyUrl,
  period,
  description,
  achievements,
}: ExperienceCardProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-zinc-800 last:border-0 last:pb-0 tracking-wide">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <div>
          <h4 className="font-medium text-base sm:text-lg">{title}</h4>
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
        </div>
        <div className="text-xs text-zinc-400 bg-zinc-800/70 px-2 py-1 sm:px-3 sm:py-1 rounded-full self-start mt-1 sm:mt-0 sm:self-auto">
          {period}
        </div>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed">{description}</p>

      <div className="space-y-3">
        {/* Mobile: collapsible achievements */}
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

        {/* Desktop: original layout */}
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
