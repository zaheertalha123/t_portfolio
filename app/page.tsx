import { PortfolioHeader } from "@/components/header/portfolio-header";
import { AIRecruiterChat } from "@/components/chat/ai-recruiter-chat";
import { FloatingAIButton } from "@/components/chat/floating-ai-button";
import { AnimatedSection } from "@/components/layout/animated-section";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import type { Project } from "@/lib/data";
import {
  getAllProjects,
  getExperienceInfo,
  getAchievementsInfo,
  getTechnicalSkillsInfo,
} from "@/lib/data";

export default function Home() {
  const projects: Project[] = getAllProjects();
  const experienceInfo = getExperienceInfo();
  const achievementsInfo = getAchievementsInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-black text-white">
      <PortfolioHeader />

      <div className="relative container px-2 sm:px-4 pt-24 lg:pt-20 lg:grid lg:grid-cols-3 lg:gap-6">
        <ProfileSection />

        <div
          id="right-pane"
          className="rounded-xl lg:col-span-2 lg:h-[calc(100vh-6rem)] lg:overflow-y-scroll scrollbar-hide space-y-6"
        >
          <AnimatedSection
            animation="fade-up"
            id="ai-chat"
            className="hidden lg:block"
          >
            <AIRecruiterChat />
          </AnimatedSection>

          <SkillsSection technicalSkills={technicalSkills} />
          <ExperienceSection experience={experienceInfo} />
          <AchievementsSection achievements={achievementsInfo} />
          <EducationSection />
          <ProjectsSection projects={projects} />
        </div>
      </div>

      <FloatingAIButton />
    </main>
  );
}
