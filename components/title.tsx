"use client";

import { ShuffleTextSimple } from "./shuffle-text";

export default function Title({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-xl font-mono tracking-widest text-zinc-400 uppercase mb-4 border-l-4 border-cyan-500 pl-4">
        {title}
      </h2>
      <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
        <ShuffleTextSimple text={subtitle} />
      </p>
    </div>
  );
}
