"use client";

import { useMemo } from "react";

function groupIntoRows(nodes) {
  const byY = new Map();
  for (const node of nodes) {
    if (!byY.has(node.y)) byY.set(node.y, []);
    byY.get(node.y).push(node);
  }
  return [...byY.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, group]) => [...group].sort((a, b) => a.x - b.x));
}

export default function RoadmapTree({ nodes }) {
  const rows = useMemo(() => groupIntoRows(nodes), [nodes]);

  return (
    <ol className="flex flex-col">
      {rows.map((row, i) => (
        <li key={row.map((node) => node.id).join("-")} className="flex gap-4 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-accent bg-accent/10 text-sm font-semibold text-accent">
              {i + 1}
            </span>
            {i < rows.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
          </div>

          <div className={`grid flex-1 gap-3 pt-0.5 ${row.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
            {row.map((node) => (
              <div
                key={node.id}
                className="rounded-xl border border-border bg-surface p-4 transition duration-300 ease-out hover:border-accent/40 hover:shadow-md motion-safe:hover:-translate-y-0.5"
              >
                <p className="font-heading text-base font-semibold text-foreground">{node.label}</p>
                {node.video ? (
                  <a
                    href={node.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-accent no-underline hover:underline"
                  >
                    Watch on YouTube →
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-foreground/64">Video coming soon.</p>
                )}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
