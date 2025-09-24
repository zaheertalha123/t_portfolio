import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { getEducationInfo, type Education } from "@/lib/data";

export function EducationSection() {
  const education = getEducationInfo();
  return (
    <AnimatedSection animation="fade-up" id="education">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <GraduationCap className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Education</h3>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {education.map((edu: Education, idx: number) => (
              <AnimatedSection
                key={idx}
                animation="fade-up"
                delay={100 * (idx + 1)}
              >
                <div className="space-y-2 pb-6 border-b border-zinc-800 last:border-0 last:pb-0 tracking-wide">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <div>
                      <h4 className="font-medium text-base sm:text-lg">
                        {edu.degree}
                      </h4>
                      <div className="text-sm text-cyan-400">
                        {edu.institution}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-400 bg-zinc-800/70 px-2 py-1 sm:px-3 sm:py-1 rounded-full self-start mt-1 sm:mt-0 sm:self-auto">
                      {edu.year}
                    </div>
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
