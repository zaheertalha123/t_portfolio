"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Mail,
  Languages,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { getPersonalInfo, getLanguagesInfo } from "@/lib/data";
import Image from "next/image";
import { ContactDialog } from "@/components/contact/contact-dialog";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  layout?: "sidebar" | "stacked";
};

export function ProfileCard({ layout = "stacked" }: ProfileCardProps) {
  const personalInfo = getPersonalInfo();
  const languages = getLanguagesInfo();
  const isSidebar = layout === "sidebar";

  const linkedIn = personalInfo.social.find(
    (social) => social.platform === "LinkedIn"
  );
  const github = personalInfo.social.find(
    (social) => social.platform === "GitHub"
  );
  const xProfile = personalInfo.social.find(
    (social) => social.platform === "X" || social.platform === "Twitter"
  );
  const instagram = personalInfo.social.find(
    (social) => social.platform === "Instagram"
  );

  return (
    <Card
      className={cn(
        "bg-zinc-900/70 border-zinc-800 backdrop-blur-sm col-span-1 rounded-xl",
        isSidebar &&
          "lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-hide lg:overscroll-y-contain"
      )}
    >
      <CardContent className="p-0 flex flex-col">
        <div
          className={cn(
            "bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 flex flex-col items-center border-b border-zinc-800",
            isSidebar ? "p-3 lg:p-3" : "p-4 sm:p-5"
          )}
        >
          <div className="flex flex-col items-center w-full">
            <div className={cn(isSidebar ? "my-2 lg:my-2" : "my-3 sm:my-4")}>
              <div
                className={cn(
                  "relative rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-lg",
                  isSidebar
                    ? "w-28 h-28 sm:w-36 sm:h-36 lg:w-32 lg:h-32 xl:w-44 xl:h-44"
                    : "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
                )}
              >
                <Image
                  src={personalInfo.profileImage || "/placeholder-user.jpg"}
                  alt={`${personalInfo.name} - Profile Picture`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-center">
              <h2
                className={cn(
                  "text-cyan-400",
                  isSidebar
                    ? "text-base sm:text-lg lg:text-base xl:text-lg"
                    : "text-base sm:text-lg"
                )}
              >
                {personalInfo.title}
              </h2>
              <h1
                className={cn(
                  "font-bold text-white",
                  isSidebar
                    ? "text-lg sm:text-xl lg:text-lg xl:text-2xl my-2 lg:my-1.5 xl:my-3"
                    : "text-xl sm:text-2xl my-2 sm:my-3"
                )}
              >
                {personalInfo.name}
              </h1>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-wrap gap-2 justify-center",
              isSidebar ? "mb-2 sm:mb-3 lg:mb-2" : "mb-3 sm:mb-4"
            )}
          >
            {personalInfo.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-zinc-800/50 hover:bg-zinc-700 px-2 py-1 text-xs sm:text-sm"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          {personalInfo.about && (
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {personalInfo.about}
            </p>
          )}

          {personalInfo.workingHours && (
            <div className="flex items-start">
              <User className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-cyan-400 text-sm sm:text-base">
                  Working Hours
                </h4>
                <p className="text-sm text-zinc-200">
                  {personalInfo.workingHours}
                </p>
              </div>
            </div>
          )}

          {languages.map(
            (language: { name: string; proficiency: string }, index: number) => (
              <div key={index} className="flex items-start">
                <Languages className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm sm:text-base">
                    {language.name} Skills
                  </h4>
                  <p className="text-sm text-zinc-200">
                    {language.proficiency}
                  </p>
                </div>
              </div>
            )
          )}

          <div className="border-t border-zinc-800 pt-4 space-y-4 pb-2">
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {linkedIn && (
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
              >
                <Mail className="w-6 h-6" />
              </a>

              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}

              {instagram && (
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}

              {xProfile && (
                <a
                  href={xProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}

              {personalInfo.location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Location: ${personalInfo.location}`}
                  title={personalInfo.location}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-zinc-800/60"
                >
                  <MapPin className="w-6 h-6" />
                </a>
              )}
            </div>

            <div className="flex justify-center">
              <ContactDialog />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
