export const nodes = [
  { id: "python-basics", label: "Python Basics", x: 0, y: 0, video: "https://www.youtube.com/watch?v=7ntXZtde8Dk" },
  { id: "control-flow", label: "Control Flow", x: 0, y: 120, video: "https://www.youtube.com/watch?v=MFMFzM9b0_g" },
  { id: "data-structures", label: "Lists, Tuples, Dicts & Sets", x: 0, y: 240, video: "https://www.youtube.com/watch?v=IlsiEW_l0YI" },
  { id: "functions", label: "Functions & Lambdas", x: 0, y: 360, video: "https://www.youtube.com/watch?v=fqAIZplpKNs" },
  { id: "file-handling", label: "File Handling", x: 0, y: 480, video: "https://www.youtube.com/watch?v=2wlx-OO1oew" },
  { id: "modules-packages", label: "Modules & Packages", x: 0, y: 600, video: "https://www.youtube.com/watch?v=_MU6_n4o4Ik" },
  { id: "error-handling", label: "Error Handling", x: 0, y: 720, video: "https://www.youtube.com/watch?v=mdoGp5Uue_o" },
  { id: "comprehensions-iterators", label: "Comprehensions & Iterators", x: 0, y: 840, video: "https://www.youtube.com/watch?v=7McukYivvQs" },
  { id: "oop-python", label: "Object-Oriented Python", x: 0, y: 960, video: "https://www.youtube.com/watch?v=lYI8kl_T0Iw" },
  { id: "working-with-data", label: "JSON, Dates & Collections", x: 0, y: 1080, video: "https://www.youtube.com/watch?v=xWuXpdkv3us" },
  { id: "python-apis-projects", label: "APIs & Projects", x: 0, y: 1200, video: "https://www.youtube.com/watch?v=jURaz8ZO-XU" },
];

export const edges = [
  { source: "python-basics", target: "control-flow" },
  { source: "control-flow", target: "data-structures" },
  { source: "data-structures", target: "functions" },
  { source: "functions", target: "file-handling" },
  { source: "file-handling", target: "modules-packages" },
  { source: "modules-packages", target: "error-handling" },
  { source: "error-handling", target: "comprehensions-iterators" },
  { source: "comprehensions-iterators", target: "oop-python" },
  { source: "oop-python", target: "working-with-data" },
  { source: "working-with-data", target: "python-apis-projects" },
];
