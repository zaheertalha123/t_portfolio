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
  languagesFrameworks: string[];
  styling: string[];
  tools: string[];
  ai: string[];
  productivity: string[];
};

export function SkillsSection({
  technicalSkills,
}: {
  technicalSkills: TechnicalSkills;
}) {
  return (
    <AnimatedSection animation="fade-up" id="skills">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Hands-on Skills</h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Mobile: collapsible groups */}
            <div className="sm:hidden space-y-4">
              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Languages & Frameworks
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.languagesFrameworks.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Web & Mobile Styling
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.styling.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Version Control & Deployment
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.tools.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/30 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Artificial Intelligence
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.ai.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl bg-zinc-800/40 px-3 py-2">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Favorite Productivity Tools
                  </h4>
                  <ChevronDown className="h-4 w-4 text-cyan-400" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.productivity.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Desktop and up: original layout */}
            <div className="hidden sm:block space-y-4 sm:space-y-6">
              <AnimatedSection animation="slide-right" delay={100}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Languages & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.languagesFrameworks.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-left" delay={200}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Web & Mobile Styling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.styling.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={300}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Version Control & Deployment
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.tools.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-left" delay={400}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Artificial Intelligence
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.ai.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={500}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400">
                    Favorite Productivity Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.productivity.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
