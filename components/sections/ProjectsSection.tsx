"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobeIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import Image from "next/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { MobileProjectViewer } from "@/components/projects/mobile-project-viewer";
import { getProjectBySlug } from "@/lib/data";
import type { Project } from "@/lib/data";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = selectedSlug ? getProjectBySlug(selectedSlug) : null;
  const [desktopImageIdx, setDesktopImageIdx] = useState(0);

  const desktopImages = useMemo(() => {
    if (!selectedProject) return [] as string[];
    const gallery =
      (selectedProject as any).gallery?.map((g: { url: string }) => g.url) ||
      [];
    return (gallery.length ? gallery : [selectedProject.coverImage]).filter(
      Boolean
    ) as string[];
  }, [selectedProject]);

  useEffect(() => {
    if (open) setDesktopImageIdx(0);
  }, [open, selectedSlug]);

  return (
    <AnimatedSection animation="fade-up" id="projects">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
              <h3 className="text-lg font-medium">Personal Projects</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation="zoom-in"
                delay={100 * (index + 1)}
              >
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  image={(project as any).coverImage}
                  slug={project.slug}
                  onSelect={(slug) => {
                    setSelectedSlug(slug);
                    setOpen(true);
                  }}
                />
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-zinc-950 border-zinc-800">
          {selectedProject && (
            <div className="container mx-auto p-4 sm:p-6">
              <MobileProjectViewer project={selectedProject} />

              {/* Desktop/Tablet: side-by-side layout */}
              <div className="hidden md:grid grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="space-y-4  ">
                  <div className="text-sm sm:text-base text-cyan-400">
                    {selectedProject.category}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {selectedProject.title}
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    {selectedProject.shortDescription}
                  </p>
                  {selectedProject.description &&
                    selectedProject.description.length > 0 && (
                      <div className="space-y-3 text-sm text-zinc-300">
                        {selectedProject.description
                          .slice(0, 2)
                          .map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                      </div>
                    )}

                  {selectedProject.client && (
                    <div className="text-sm">
                      <div className="text-zinc-400">Client</div>
                      <div className="text-white">{selectedProject.client}</div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {selectedProject.liveUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-none rounded-xl"
                      >
                        <a href={selectedProject.liveUrl} target="_blank">
                          Visit Site
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-none rounded-xl"
                      >
                        <a href={selectedProject.githubUrl} target="_blank">
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-center rounded-xl">
                  <div className="relative xl:size-[80%] size-[100%] overflow-hidden">
                    <Image
                      src={desktopImages[desktopImageIdx] || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {desktopImages.length > 1 && (
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() =>
                          setDesktopImageIdx((i) =>
                            i === 0 ? desktopImages.length - 1 : i - 1
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-zinc-400">
                        {desktopImageIdx + 1} of {desktopImages.length}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() =>
                          setDesktopImageIdx((i) =>
                            i === desktopImages.length - 1 ? 0 : i + 1
                          )
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </AnimatedSection>
  );
}
