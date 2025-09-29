import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { TrophyIcon } from "lucide-react";

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

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <AnimatedSection animation="fade-up" delay={100 * (index + 1)}>
                  <div className="bg-zinc-800/30 rounded-xl p-3 sm:p-4 border border-zinc-700/50 hover:border-cyan-400/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-1 sm:mb-0">
                        {achievement.title}
                      </h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-300 mb-1">
                      {achievement.event}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {achievement.description}
                    </p>
                  </div>
                </AnimatedSection>
                {index < achievements.length - 1 && (
                  <div className="mt-3 border-t border-zinc-800/50"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
