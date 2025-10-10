export const projects = [
  {
    id: 1,
    name: "CloudNote",
    description: "A comprehensive web application with user authentication (login and signup) that provides users the ability to upload, access, edit, and delete their notes securely in the cloud.",
    longDescription: "CloudNote is a full-stack note-taking application built with the MERN stack. It features secure user authentication, CRUD operations for notes, and a responsive design. The application uses JWT for authentication and bcrypt for password hashing, ensuring user data security.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "JWT", "Bcrypt"],
    githubUrl: "https://github.com/prins-kraj/cloudnote",
    liveUrl: null,
    image: "/images/projects/cloudnote.jpg",
    features: [
      "User Authentication with JWT",
      "CRUD Operations for Notes",
      "Password Hashing with Bcrypt",
      "Responsive Design",
      "Alert Messages and Notifications",
      "Secure API Endpoints"
    ],
    category: "Full Stack",
    status: "Completed",
    startDate: "2023-08",
    endDate: "2023-10"
  },
  {
    id: 2,
    name: "Codial",
    description: "A robust social media web application with comprehensive user authentication, post management, comments, likes, deletions, messaging, and friend interaction features.",
    longDescription: "Codial is a feature-rich social media platform that allows users to connect, share posts, interact through comments and likes, and communicate via real-time messaging. Built with Node.js and EJS templating, it includes Google OAuth integration and WebSocket-based chat functionality.",
    technologies: ["Node.js", "Express.js", "JavaScript", "EJS", "HTML", "MongoDB", "Socket.io", "Passport.js"],
    githubUrl: "https://github.com/prins-kraj/codial",
    liveUrl: null,
    image: "/images/projects/codial.jpg",
    features: [
      "Google OAuth Authentication",
      "Real-time Chat with WebSockets",
      "Post Management System",
      "Comments and Likes",
      "Friend Requests and Connections",
      "Push Notifications",
      "File Upload for Posts",
      "Email Notifications"
    ],
    category: "Full Stack",
    status: "Completed",
    startDate: "2023-05",
    endDate: "2023-07"
  },
  {
    id: 3,
    name: "NewsNexus",
    description: "A dynamic news aggregation web application that fetches and displays the latest news updates from News API, categorized into general, technology, sports, business, health, entertainment, and science.",
    longDescription: "NewsNexus is a React-based news application that provides users with up-to-date news from various categories. It features infinite scrolling, category filtering, and a responsive design optimized for all devices. The app uses the News API to fetch real-time news data.",
    technologies: ["React.js", "Bootstrap", "News API", "React Router", "Axios"],
    githubUrl: "https://github.com/prins-kraj/newsnexus",
    liveUrl: null,
    image: "/images/projects/newsnexus.jpg",
    features: [
      "Infinite Scrolling for News Feed",
      "Top Loading Bar for Better UX",
      "Category-based News Filtering",
      "Responsive Design",
      "Real-time News Updates",
      "Search Functionality",
      "News Source Attribution",
      "Mobile-Optimized Interface"
    ],
    category: "Frontend",
    status: "Completed",
    startDate: "2023-03",
    endDate: "2023-04"
  }
];

export const projectCategories = [
  { name: "All", value: "all" },
  { name: "Full Stack", value: "Full Stack" },
  { name: "Frontend", value: "Frontend" },
  { name: "Backend", value: "Backend" },
  { name: "Mobile", value: "Mobile" }
];

export const projectStats = {
  totalProjects: projects.length,
  completedProjects: projects.filter(p => p.status === "Completed").length,
  technologiesUsed: [...new Set(projects.flatMap(p => p.technologies))].length,
  githubStars: 45 // This would typically be fetched from GitHub API
};