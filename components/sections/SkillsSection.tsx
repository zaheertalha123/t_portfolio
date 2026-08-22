import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/shared/tag";
import { CodeIcon, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type TechnicalSkills = {
  ai: string[];
  languagesFrameworks: string[];
  cybersecurity: string[];
  styling: string[];
  tools: string[];
  productivity: string[];
};

const SKILL_GROUPS: Array<{
  key: keyof TechnicalSkills;
  label: string;
}> = [
  { key: "ai", label: "Artificial Intelligence & Voice Agents" },
  { key: "languagesFrameworks", label: "Languages & Frameworks" },
  { key: "cybersecurity", label: "Cybersecurity" },
  { key: "styling", label: "Web & UI Styling" },
  { key: "tools", label: "DevOps, Cloud & Automation" },
  { key: "productivity", label: "Productivity Tools" },
];

export function SkillsSection({
  technicalSkills,
}: {
  technicalSkills: TechnicalSkills;
}) {
  const groups = SKILL_GROUPS.filter(
    (group) => (technicalSkills[group.key] ?? []).length > 0
  );

  return (
    <AnimatedSection animation="fade-up" id="skills">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center">
              <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
              <h3 className="text-lg font-medium">Hands-on Skills</h3>
            </div>
            <p className="hidden sm:block text-[11px] text-zinc-500">
              Click a skill to ask the AI
            </p>
          </div>

          {/* Mobile: collapsible groups */}
          <div className="sm:hidden space-y-3">
            {groups.map((group) => (
              <Collapsible key={group.key}>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400 text-left">
                    {group.label}
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400 shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills[group.key].map((skill) => (
                      <Tag key={skill} interactive skill={skill}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Desktop: stacked groups */}
          <div className="hidden sm:block space-y-5">
            {groups.map((group, index) => (
              <AnimatedSection
                key={group.key}
                animation={index % 2 === 0 ? "slide-right" : "slide-left"}
                delay={100 * (index + 1)}
              >
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills[group.key].map((skill) => (
                      <Tag key={skill} interactive skill={skill}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
