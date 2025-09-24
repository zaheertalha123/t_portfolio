import Image from "next/image";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
  onSelect?: (slug: string) => void;
}

export function ProjectCard({
  title,
  category,
  image,
  slug,
  onSelect,
}: ProjectCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${title}`}
      onClick={() => onSelect?.(slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(slug);
        }
      }}
      className="block h-full w-full text-left cursor-pointer focus:outline-none"
    >
      <Card className="bg-zinc-800/50 border-zinc-700 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-all h-full">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-cyan-400 mb-1">{category}</div>
            <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
