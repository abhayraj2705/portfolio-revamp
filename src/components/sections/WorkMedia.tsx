import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Screenshot when we have one, otherwise a typographic poster in the project's colour. */
export function WorkMedia({
  project,
  className,
  sizes = "(min-width: 768px) 400px, 100vw",
  priority,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title}: ${project.kind} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${project.title}: ${project.kind}`}
      className={cn("absolute inset-0 flex flex-col justify-between p-[6%]", className)}
      style={{ background: `radial-gradient(120% 120% at 0% 0%, ${project.accent}55, transparent 60%), #0d0f0d` }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/60">{project.kind}</span>
      <span className="display text-[clamp(2rem,6vw,5rem)] text-white">{project.title}</span>
      <span className="font-mono text-[10px] text-white/60">{project.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
    </div>
  );
}
