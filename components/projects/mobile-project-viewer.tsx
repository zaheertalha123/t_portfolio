"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/projects/image-gallery";

export function MobileProjectViewer({ project }: { project: Project }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Collect all available images
  const images = (
    ((project as any).gallery?.map((img: { url: string }) => img.url) || [])
      .length
      ? (project as any).gallery!.map((img: { url: string }) => img.url)
      : [project.coverImage]
  ).filter(Boolean) as string[];

  return (
    <div className="md:hidden">
      <div className="space-y-4">
        <div className="text-sm sm:text-base text-cyan-400">
          {project.category}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold">{project.title}</h2>
        <p className="text-zinc-400 text-sm">{project.shortDescription}</p>
        {project.description && project.description.length > 0 && (
          <div className="space-y-3 text-sm text-zinc-300">
            {project.description.slice(0, 2).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {project.client && (
          <div className="text-sm">
            <div className="text-zinc-400">Client</div>
            <div className="text-white">{project.client}</div>
          </div>
        )}

        <div className="flex gap-2 pt-2 justify-center">
          {project.liveUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-none rounded-xl"
            >
              <a href={project.liveUrl} target="_blank">
                Visit Site
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-none rounded-xl"
            >
              <a href={project.githubUrl} target="_blank">
                View Code
              </a>
            </Button>
          )}
          {images.length > 0 && (
            <Button
              onClick={() => setIsGalleryOpen(true)}
              size="sm"
              variant="outline"
              className="border-none rounded-xl"
            >
              {images.length > 1 ? "View Images" : "View Image"}
            </Button>
          )}
        </div>
      </div>

      <ImageGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
