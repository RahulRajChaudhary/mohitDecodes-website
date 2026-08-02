export const nodes = [
  { id: "html-basics", label: "HTML Basics", x: 0, y: 0, video: "https://www.youtube.com/watch?v=K1Lx1JJ3Bu8" },
  { id: "css-basics", label: "CSS Basics", x: 0, y: 120, video: "https://www.youtube.com/watch?v=ef6nmGg73sQ" },
  { id: "js-fundamentals", label: "JavaScript Fundamentals", x: 0, y: 240, video: "https://www.youtube.com/watch?v=moRFcW7xayc" },
  { id: "git-github", label: "Git & GitHub", x: 220, y: 240, video: "https://www.youtube.com/watch?v=hebwERejgI4" },
  { id: "react-basics", label: "React Basics", x: 0, y: 360, video: "https://www.youtube.com/watch?v=cHIn7PUAxlg" },
  { id: "nextjs", label: "Next.js", x: 0, y: 480, video: "https://www.youtube.com/watch?v=yKuBE7TJm7M" },
  { id: "nodejs-basics", label: "Node.js Basics", x: -220, y: 480, video: "https://www.youtube.com/watch?v=pdk60AyhMNM" },
  { id: "deployment", label: "Deployment", x: 0, y: 600, video: "https://www.youtube.com/watch?v=IpTQ5T869NI" },
];

export const edges = [
  { source: "html-basics", target: "css-basics" },
  { source: "css-basics", target: "js-fundamentals" },
  { source: "js-fundamentals", target: "git-github" },
  { source: "js-fundamentals", target: "react-basics" },
  { source: "react-basics", target: "nextjs" },
  { source: "js-fundamentals", target: "nodejs-basics" },
  { source: "nextjs", target: "deployment" },
  { source: "nodejs-basics", target: "deployment" },
];
