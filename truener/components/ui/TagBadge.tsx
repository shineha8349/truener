import type { Tag } from "@/types";

type TagBadgeProps = {
  tag: Tag;
  variant?: "default" | "common";
  size?: "sm" | "md";
};

export default function TagBadge({ tag, variant = "default", size = "md" }: TagBadgeProps) {
  const baseClass = "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap";
  const sizeClass = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-3 py-1";
  const variantClass =
    variant === "common"
      ? "bg-[#e8faf6] text-[#1ABC9C] border border-[#1ABC9C]/30"
      : "bg-[#F8F8F8] text-[#555555] border border-[#E5E5E5]";

  return (
    <span className={`${baseClass} ${sizeClass} ${variantClass}`}>
      <span>{tag.emoji}</span>
      <span>{tag.name}</span>
    </span>
  );
}
