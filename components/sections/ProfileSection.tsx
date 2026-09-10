import { AnimatedSection } from "@/components/layout/animated-section";
import { ProfileCard } from "@/components/profile/profile-card";

export function ProfileSection() {
  return (
    <div className="mb-6 lg:col-span-1 lg:sticky lg:top-20 lg:self-start lg:mb-0">
      <AnimatedSection animation="slide-right" eager>
        <ProfileCard />
      </AnimatedSection>
    </div>
  );
}
