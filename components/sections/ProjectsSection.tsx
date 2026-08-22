"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Code2,
  GlobeIcon,
  Layers3,
  Maximize2,
} from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ImageModal } from "@/components/ui/image-modal";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProjectBySlug } from "@/lib/data";
import type { Project } from "@/lib/data";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = selectedSlug ? getProjectBySlug(selectedSlug) : null;
  const [imageIdx, setImageIdx] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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
    if (open) {
      setImageIdx(0);
      setIsImageViewerOpen(false);
    }
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
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setIsImageViewerOpen(false);
        }}
      >
        <DialogContent className="project-modal max-h-[88dvh] max-w-5xl overflow-y-auto overflow-x-hidden border-cyan-400/15 bg-zinc-950 p-0 shadow-2xl shadow-cyan-950/40 sm:rounded-2xl">
          {selectedProject && (
            <div className="relative">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_70%)]" />
              <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                {images.length > 0 && (
                  <div className="relative flex min-h-[17rem] items-center bg-zinc-900/70 p-4 sm:min-h-[22rem] sm:p-6 lg:min-h-full lg:p-8">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_45%,rgba(59,130,246,0.08))]" />
                    <div
                      className="group/image relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-2xl shadow-black/40"
                      onClick={() => setIsImageViewerOpen(true)}
                    >
                    <Image
                      src={images[imageIdx] || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                        className="object-contain p-2 transition-transform duration-500 group-hover/image:scale-[1.025]"
                    />
                      <div className="pointer-events-none absolute inset-0 bg-cyan-400/0 transition-colors duration-300 group-hover/image:bg-cyan-400/5" />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        aria-label="Enlarge image"
                        className="absolute right-3 top-3 h-8 rounded-lg border-white/15 bg-zinc-950/75 px-2.5 text-xs text-white opacity-0 backdrop-blur transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 group-hover/image:opacity-100 focus:opacity-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsImageViewerOpen(true);
                        }}
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        Enlarge
                      </Button>
                    </div>
                    {images.length > 1 && (
                      <div className="absolute inset-x-7 bottom-8 flex items-center justify-between sm:inset-x-10 sm:bottom-10">
                        <Button
                          size="icon"
                          variant="outline"
                          aria-label="Previous project image"
                          className="h-9 w-9 rounded-full border-white/15 bg-zinc-950/70 backdrop-blur hover:border-cyan-400/60 hover:bg-cyan-400/10"
                          onClick={(event) => {
                            event.stopPropagation();
                            setImageIdx((i) => (i === 0 ? images.length - 1 : i - 1));
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
                          {String(imageIdx + 1).padStart(2, "0")} <span className="text-zinc-600">/</span> {String(images.length).padStart(2, "0")}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          aria-label="Next project image"
                          className="h-9 w-9 rounded-full border-white/15 bg-zinc-950/70 backdrop-blur hover:border-cyan-400/60 hover:bg-cyan-400/10"
                          onClick={(event) => {
                            event.stopPropagation();
                            setImageIdx((i) => (i === images.length - 1 ? 0 : i + 1));
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                    <CircleDot className="h-3.5 w-3.5" />
                    {selectedProject.category}
                  </div>
                  <DialogTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
                    {selectedProject.shortDescription}
                  </DialogDescription>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {(selectedProject as { liveUrl?: string }).liveUrl && (
                      <Button asChild className="rounded-xl bg-cyan-400 px-4 text-zinc-950 hover:bg-cyan-300">
                        <a href={(selectedProject as { liveUrl?: string }).liveUrl} target="_blank" rel="noopener noreferrer">
                          Visit site <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild={!!selectedProject.githubUrl}
                      variant="outline"
                      className="rounded-xl border-zinc-700 bg-zinc-900/50 px-4 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                      disabled={!selectedProject.githubUrl}
                    >
                      {selectedProject.githubUrl ? (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Code2 className="h-4 w-4" /> View code
                        </a>
                      ) : (
                        <span>Code on request</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 border-t border-white/10 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
                {selectedProject.description && selectedProject.description.length > 0 && (
                  <section className="space-y-3 text-sm leading-relaxed text-zinc-300">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Overview</p>
                    {selectedProject.description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </section>
                )}

                <div className="space-y-7">
                  {(selectedProject as any).technologies?.length > 0 && (
                    <section className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        <Layers3 className="h-3.5 w-3.5 text-cyan-400" /> Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProject as any).technologies.map((tech: string) => (
                          <span key={tech} className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {(selectedProject as any).features?.length > 0 && (
                    <section className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Highlights</p>
                      <ul className="space-y-2.5 text-sm text-zinc-300">
                        {(selectedProject as any).features.map((feature: string) => (
                          <li key={feature} className="flex gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <ImageModal
        images={images}
        currentIndex={imageIdx}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        onIndexChange={setImageIdx}
        alt={selectedProject?.title ?? "Project preview"}
      />
    </AnimatedSection>
  );
}
