export const skills = {
  "Programming Languages": [
    { name: "JavaScript", level: 90, icon: "SiJavascript", color: "#F7DF1E" },
    { name: "Python", level: 85, icon: "SiPython", color: "#3776AB" },
    { name: "C++", level: 88, icon: "SiCplusplus", color: "#00599C" },
    { name: "Java", level: 75, icon: "SiJava", color: "#ED8B00" },
    { name: "TypeScript", level: 80, icon: "SiTypescript", color: "#3178C6" }
  ],
  "Frontend Technologies": [
    { name: "React.js", level: 92, icon: "SiReact", color: "#61DAFB" },
    { name: "HTML5", level: 95, icon: "SiHtml5", color: "#E34F26" },
    { name: "CSS3", level: 90, icon: "SiCss3", color: "#1572B6" },
    { name: "Tailwind CSS", level: 88, icon: "SiTailwindcss", color: "#06B6D4" },
    { name: "Bootstrap", level: 85, icon: "SiBootstrap", color: "#7952B3" },
    { name: "Redux", level: 82, icon: "SiRedux", color: "#764ABC" }
  ],
  "Backend Technologies": [
    { name: "Node.js", level: 90, icon: "SiNodedotjs", color: "#339933" },
    { name: "Express.js", level: 88, icon: "SiExpress", color: "#000000" },
    { name: "Flask", level: 80, icon: "SiFlask", color: "#000000" },
    { name: "RESTful APIs", level: 85, icon: "SiPostman", color: "#FF6C37" }
  ],
  "Databases": [
    { name: "MongoDB", level: 87, icon: "SiMongodb", color: "#47A248" },
    { name: "MySQL", level: 75, icon: "SiMysql", color: "#4479A1" },
    { name: "PostgreSQL", level: 70, icon: "SiPostgresql", color: "#336791" }
  ],
  "Tools & Technologies": [
    { name: "Git", level: 90, icon: "SiGit", color: "#F05032" },
    { name: "GitHub", level: 88, icon: "SiGithub", color: "#181717" },
    { name: "VS Code", level: 95, icon: "SiVisualstudiocode", color: "#007ACC" },
    { name: "Postman", level: 85, icon: "SiPostman", color: "#FF6C37" },
    { name: "Docker", level: 70, icon: "SiDocker", color: "#2496ED" },
    { name: "Vercel", level: 80, icon: "SiVercel", color: "#000000" }
  ]
};

export const achievements = [
  {
    id: 1,
    title: "Competitive Programming",
    description: "Active participant in competitive programming contests",
    details: [
      "Solved 500+ problems across various platforms",
      "Regular participant in CodeChef and Codeforces contests",
      "Achieved 3-star rating on CodeChef",
      "Mentored students in competitive programming"
    ],
    icon: "FaTrophy",
    color: "#FFD700",
    date: "2022 - Present",
    links: [
      { name: "CodeChef Profile", url: "https://codechef.com/users/prince_9470" },
      { name: "Codeforces Profile", url: "https://codeforces.com/profile/prins_kraj" },
      { name: "LeetCode Profile", url: "https://leetcode.com/u/prins_kraj/" }
    ]
  },
  {
    id: 2,
    title: "Teaching Excellence",
    description: "Successfully mentored 400+ students in Data Structures and Algorithms",
    details: [
      "Achieved 95% student satisfaction rate",
      "Conducted 50+ live doubt-resolution sessions",
      "Developed comprehensive learning materials",
      "Helped students improve problem-solving skills"
    ],
    icon: "FaGraduationCap",
    color: "#4CAF50",
    date: "March 2023 - July 2023",
    links: []
  },
  {
    id: 3,
    title: "Full Stack Development",
    description: "Built multiple production-ready web applications",
    details: [
      "Developed HRMS portal serving 500+ users",
      "Created social media platform with real-time features",
      "Built news aggregation app with modern UI/UX",
      "Implemented secure authentication systems"
    ],
    icon: "FaCode",
    color: "#2196F3",
    date: "2023 - Present",
    links: [
      { name: "GitHub Portfolio", url: "https://github.com/prins-kraj" }
    ]
  },
  {
    id: 4,
    title: "Microsoft Collaboration",
    description: "Collaborated with Microsoft on app modernization project",
    details: [
      "Modernized presentation platform using React.js",
      "Integrated Redux for state management",
      "Implemented media controllers",
      "Enhanced user experience and performance"
    ],
    icon: "FaMicrosoft",
    color: "#00BCF2",
    date: "2024",
    links: []
  }
];

export const certifications = [
  {
    id: 1,
    name: "Full Stack Web Development",
    issuer: "Coding Ninjas",
    date: "2023",
    credentialId: "CN-FSWD-2023",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js"]
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    issuer: "Coding Ninjas",
    date: "2023",
    credentialId: "CN-DSA-2023",
    skills: ["C++", "Problem Solving", "Algorithms"]
  }
];

export const skillStats = {
  totalSkills: Object.values(skills).flat().length,
  averageLevel: Math.round(
    Object.values(skills).flat().reduce((sum, skill) => sum + skill.level, 0) / 
    Object.values(skills).flat().length
  ),
  topSkills: Object.values(skills).flat()
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map(skill => skill.name)
};