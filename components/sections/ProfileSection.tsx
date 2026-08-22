import { AnimatedSection } from "@/components/layout/animated-section";
import { ProfileCard } from "@/components/profile/profile-card";

export function ProfileSection() {
  return (
    <>
      <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
        <AnimatedSection animation="slide-right">
          <ProfileCard layout="sidebar" />
        </AnimatedSection>
      </div>

      {/* Mobile + tablet profile */}
      <div className="lg:hidden mb-6">
        <AnimatedSection animation="slide-right">
          <ProfileCard layout="stacked" />
        </AnimatedSection>
      </div>
    </>
  );
}
