import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { TrophyIcon, Info } from "lucide-react";

type Achievement = {
  title: string;
  event: string;
  description: string;
};

export function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <AnimatedSection animation="fade-up" id="achievements">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <TrophyIcon className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Achievements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                <div className="bg-zinc-800/30 rounded-xl p-3 sm:p-4 border border-zinc-700/50 hover:border-cyan-400/30 transition-colors h-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-cyan-400 flex-1">
                      {achievement.title}
                    </h4>
                    <div className="relative group flex-shrink-0">
                      <Info className="w-4 h-4 text-zinc-400 hover:text-cyan-400 cursor-help transition-colors" />
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-50 pointer-events-none">
                        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 shadow-lg max-w-xs w-64">
                          <p className="text-xs text-zinc-300 whitespace-normal leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-zinc-300">
                    {achievement.event}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
