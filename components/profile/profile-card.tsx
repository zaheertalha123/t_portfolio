"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Languages,
  Clock,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { getPersonalInfo, getLanguagesInfo } from "@/lib/data";
import Image from "next/image";
import { ContactDialog } from "@/components/contact/contact-dialog";

function formatSocialUrl(platform: string, url: string): string {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return url.includes("linkedin.com/in/")
        ? `linkedin.com/in/${url
            .split("linkedin.com/in/")[1]
            .replace(/\/$/, "")}`
        : `linkedin.com/${url}`;
    case "github":
      return url.includes("github.com/")
        ? `github.com/${url.split("github.com/")[1].replace(/\/$/, "")}`
        : `github.com/${url}`;
    case "x":
    case "twitter":
      return url.includes("x.com/") || url.includes("twitter.com/")
        ? `x.com/${url.split(/x\.com\/|twitter\.com\//)[1].split("?")[0]}`
        : `x.com/${url}`;
    default:
      return url;
  }
}

export function ProfileCard() {
  const [activeTab, setActiveTab] = useState("about");

  const personalInfo = getPersonalInfo();
  const languages = getLanguagesInfo();

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm col-span-1 flex flex-col h-full rounded-xl overflow-clip">
      <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 p-3 sm:p-4 flex flex-col items-center border-b border-zinc-800">
          <div className="flex flex-col items-center w-full">
            <div className="my-3 sm:my-4">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-lg">
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
              <h2 className="text-lg sm:text-xl text-cyan-400">
                {personalInfo.title}
              </h2>
              <h1 className="text-xl sm:text-2xl font-bold text-white my-3">
                {personalInfo.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-3 sm:mb-4">
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

        <Tabs
          defaultValue="about"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="border-b border-zinc-800">
            <TabsList className="w-full bg-transparent border-b border-zinc-800 rounded-none h-auto p-0">
              <TabsTrigger
                value="about"
                className={`flex-1 rounded-none border-b-2 px-3 sm:px-3 py-2 sm:py-1.5 text-xs sm:text-sm ${
                  activeTab === "about"
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-zinc-200"
                }`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className={`flex-1 rounded-none border-b-2 px-3 sm:px-3 py-2 sm:py-1.5 text-xs sm:text-sm ${
                  activeTab === "contact"
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-zinc-200"
                }`}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Connect
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="about"
            className="p-3 sm:p-4 space-y-4 focus:outline-none"
          >
            {personalInfo.about && (
              <p className="text-gray-300 leading-relaxed mb-8">
                {personalInfo.about}
              </p>
            )}

            {/* Canadian Status */}
            {personalInfo.workingHours && (
              <div className="flex items-start">
                <User className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-cyan-400 text-base">
                    Working Hours
                  </h4>
                  <p className="text-sm text-zinc-200">
                    {personalInfo.workingHours}
                  </p>
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.map(
              (
                language: { name: string; proficiency: string },
                index: number
              ) => (
                <div key={index} className="flex items-start">
                  <Languages className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-base">
                      {language.name} Skills
                    </h4>
                    <p className="text-sm text-zinc-200">
                      {language.proficiency}
                    </p>
                  </div>
                </div>
              )
            )}

            {/* Working Hours removed */}

            {/* Location */}
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
              <div>
                <h4 className="font-semibold text-cyan-400 text-base">
                  Location
                </h4>
                <p className="text-sm text-zinc-200">{personalInfo.location}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="contact"
            className="p-3 sm:p-4 space-y-4 focus:outline-none"
          >
            {/* Social Links */}
            <div className="space-y-4">
              {/* LinkedIn */}
              {personalInfo.social.find(
                (social) => social.platform === "LinkedIn"
              ) && (
                <div className="flex items-start">
                  <Linkedin className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-base">
                      LinkedIn
                    </h4>
                    <a
                      href={
                        personalInfo.social.find(
                          (social) => social.platform === "LinkedIn"
                        )?.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-200 hover:text-cyan-400 transition-colors break-all"
                    >
                      {formatSocialUrl(
                        "LinkedIn",
                        personalInfo.social.find(
                          (social) => social.platform === "LinkedIn"
                        )?.url || ""
                      )}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-cyan-400 text-base">
                    Email
                  </h4>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-zinc-200 hover:text-cyan-400 transition-colors break-all"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              {personalInfo.social.find(
                (social) => social.platform === "GitHub"
              ) && (
                <div className="flex items-start">
                  <Github className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-base">
                      GitHub
                    </h4>
                    <a
                      href={
                        personalInfo.social.find(
                          (social) => social.platform === "GitHub"
                        )?.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-200 hover:text-cyan-400 transition-colors break-all"
                    >
                      {formatSocialUrl(
                        "GitHub",
                        personalInfo.social.find(
                          (social) => social.platform === "GitHub"
                        )?.url || ""
                      )}
                    </a>
                  </div>
                </div>
              )}

              {/* X (Twitter) */}
              {personalInfo.social.find(
                (social) =>
                  social.platform === "X" || social.platform === "Twitter"
              ) && (
                <div className="flex items-start">
                  <Twitter className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-base">
                      X (Twitter)
                    </h4>
                    <a
                      href={
                        personalInfo.social.find(
                          (social) =>
                            social.platform === "X" ||
                            social.platform === "Twitter"
                        )?.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-200 hover:text-cyan-400 transition-colors break-all"
                    >
                      {formatSocialUrl(
                        "X",
                        personalInfo.social.find(
                          (social) =>
                            social.platform === "X" ||
                            social.platform === "Twitter"
                        )?.url || ""
                      )}
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {/* {personalInfo.phone && (
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-base">
                      Phone
                    </h4>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm text-zinc-200 hover:text-cyan-400 transition-colors break-all"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              )} */}
            </div>

            {/* Contact Dialog */}
            <div className="flex justify-center pt-4">
              <ContactDialog />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
