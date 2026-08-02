export const nodes = [
  { id: "dsa-roadmap-intro", label: "DSA Roadmap Intro", x: 0, y: 0, video: "https://www.youtube.com/watch?v=t5fnhXuxQIw" },
  { id: "complexity-analysis", label: "Time & Space Complexity", x: 0, y: 120, video: "https://www.youtube.com/watch?v=UcfegZLJWnE" },
  { id: "recursion-math", label: "Math & Recursion", x: 0, y: 240, video: "https://www.youtube.com/watch?v=_27r-i_7UhQ" },
  { id: "arrays-strings", label: "Arrays & Strings", x: 0, y: 360, video: "https://www.youtube.com/watch?v=OnaTYvQZZCU" },
  { id: "array-patterns", label: "Two Pointer & Sliding Window", x: 0, y: 480, video: "https://www.youtube.com/watch?v=vG2_VAskYgk" },
  { id: "stacks-queues", label: "Stacks & Queues", x: 0, y: 600, video: "https://www.youtube.com/watch?v=aVI87AHOUM0" },
  { id: "linked-lists", label: "Linked Lists", x: 0, y: 720, video: "https://www.youtube.com/watch?v=w4UaJihXtbM" },
  { id: "hashmaps-sets", label: "HashMaps & Sets", x: 0, y: 840, video: "https://www.youtube.com/watch?v=aVxXSt90TE4" },
  { id: "searching-sorting", label: "Searching & Sorting", x: 0, y: 960, video: "https://www.youtube.com/watch?v=nrlbChBrd6M" },
  { id: "trees", label: "Trees", x: 0, y: 1080, video: "https://www.youtube.com/watch?v=p2qkRMq9gJg" },
  { id: "graphs", label: "Graphs", x: 0, y: 1200, video: "https://www.youtube.com/watch?v=oy2tpEXKlMg" },
  { id: "greedy-backtracking", label: "Greedy & Backtracking", x: 0, y: 1320, video: "https://www.youtube.com/watch?v=E5BlLqpoL4Q" },
];

export const edges = [
  { source: "dsa-roadmap-intro", target: "complexity-analysis" },
  { source: "complexity-analysis", target: "recursion-math" },
  { source: "recursion-math", target: "arrays-strings" },
  { source: "arrays-strings", target: "array-patterns" },
  { source: "array-patterns", target: "stacks-queues" },
  { source: "stacks-queues", target: "linked-lists" },
  { source: "linked-lists", target: "hashmaps-sets" },
  { source: "hashmaps-sets", target: "searching-sorting" },
  { source: "searching-sorting", target: "trees" },
  { source: "trees", target: "graphs" },
  { source: "graphs", target: "greedy-backtracking" },
];
