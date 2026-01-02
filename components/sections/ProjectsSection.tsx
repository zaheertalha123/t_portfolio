"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobeIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getProjectBySlug } from "@/lib/data";
import type { Project } from "@/lib/data";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = selectedSlug ? getProjectBySlug(selectedSlug) : null;
  const [imageIdx, setImageIdx] = useState(0);

  const images = useMemo(() => {
    if (!selectedProject) return [] as string[];
    const gallery =
      (selectedProject as any).gallery?.map((g: { url: string }) => g.url) ||
      [];
    return (gallery.length ? gallery : [selectedProject.coverImage]).filter(
      Boolean
    ) as string[];
  }, [selectedProject]);

  useEffect(() => {
    if (open) setImageIdx(0);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800 rounded-xl">
          {selectedProject && (
            <div className="space-y-6 p-2 pt-0">

              {/* Header */}
              <div className="space-y-2">
                <div className="text-sm text-cyan-400">
                  {selectedProject.category}
                </div>
                <h2 className="text-2xl font-semibold">
                  {selectedProject.title}
                </h2>
                <p className="text-zinc-400">
                  {selectedProject.shortDescription}
                </p>
              </div>

              {/* Image Slider */}
              {images.length > 0 && (
                <div className="space-y-4">
                  <div className="relative w-full aspect-video bg-zinc-800/50 rounded-xl overflow-hidden">
                    <Image
                      src={images[imageIdx] || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() =>
                          setImageIdx((i) =>
                            i === 0 ? images.length - 1 : i - 1
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-zinc-400 min-w-[60px] text-center">
                        {imageIdx + 1} of {images.length}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() =>
                          setImageIdx((i) =>
                            i === images.length - 1 ? 0 : i + 1
                          )
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {selectedProject.description &&
                selectedProject.description.length > 0 && (
                  <div className="space-y-3 text-sm text-zinc-300">
                    {selectedProject.description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

              {/* Features */}
              {(selectedProject as any).features && (selectedProject as any).features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-300">Features</h3>
                  <ul className="space-y-1 text-sm text-zinc-400">
                    {(selectedProject as any).features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-cyan-400 text-lg leading-none">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {(selectedProject as any).technologies && (selectedProject as any).technologies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-300">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject as any).technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="flex gap-2 pt-4">
                <Button
                  asChild={!!selectedProject.githubUrl}
                  size="sm"
                  variant="outline"
                  className="border-cyan-400/30 rounded-xl"
                  disabled={!selectedProject.githubUrl}
                >
                  {selectedProject.githubUrl ? (
                    <a href={selectedProject.githubUrl} target="_blank">
                      View Code
                    </a>
                  ) : (
                    <span>Code Available on Demand</span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
}
