import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import {
  ExperienceCard,
  type RoleStatus,
} from "@/components/experience/experience-card";

type CommunityRole = {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  status?: RoleStatus;
  description: string;
  achievements: string[];
};

export function CommunityWorkSection({
  communityWork,
}: {
  communityWork: CommunityRole[];
}) {
  return (
    <AnimatedSection animation="fade-up" id="community">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <Users className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Community Work</h3>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {communityWork.map((item, index) => (
              <div key={`${item.company}-${item.title}`}>
                <AnimatedSection animation="fade-up" delay={100 * (index + 1)}>
                  <ExperienceCard
                    title={item.title}
                    company={item.company}
                    companyUrl={item.companyUrl}
                    period={item.period}
                    location={item.location}
                    status={item.status}
                    description={item.description}
                    achievements={item.achievements}
                  />
                </AnimatedSection>
                {index < communityWork.length - 1 && (
                  <div className="mt-6 sm:mt-8 border-t border-zinc-800/50" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
