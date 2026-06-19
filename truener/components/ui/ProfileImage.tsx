"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  gender?: "male" | "female";
};

export default function ProfileImage({ src, alt, fill, className, sizes, gender }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    const bgColor = gender === "female" ? "bg-[#FFF0F0]" : "bg-[#EFF6FF]";
    const iconColor = gender === "female" ? "text-[#FF6B6B]" : "text-[#3B82F6]";
    return (
      <div className={`${bgColor} flex items-center justify-center ${fill ? "absolute inset-0" : ""} ${className ?? ""}`}>
        <User size={32} className={iconColor} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
