import { AnimatedSection } from "@/components/layout/animated-section";
import { ProfileCard } from "@/components/profile/profile-card";

export function ProfileSection() {
  return (
    <>
      <div className="hidden lg:block sticky h-full lg:col-span-1 overflow-clip">
        <AnimatedSection animation="slide-right" className="h-full">
          <ProfileCard />
        </AnimatedSection>
      </div>

      {/* Mobile Profile Section */}
      <div className="lg:hidden sm:px-1 -mt-8 mb-6">
        <AnimatedSection animation="slide-right">
          <ProfileCard />
        </AnimatedSection>
      </div>
    </>
  );
}
