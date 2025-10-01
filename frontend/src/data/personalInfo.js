export const personalInfo = {
  name: "Prince Kumar",
  title: "Associate Software Developer",
  email: "princesansaraj@gmail.com",
  phone: "(+91) 9953666881",
  location: "India",
  linkedin: "-princekumar",
  github: "prins-kraj",
  summary: "Passionate Associate Software Developer with expertise in full-stack development using modern technologies like React.js, Node.js, and MongoDB. Experienced in building scalable web applications, HRMS portals, and project management systems. Strong background in mentoring and teaching data structures and algorithms.",
  resumeUrl: "/resume/Prince_Kumar_Resume.pdf"
};

export const socialLinks = [
  {
    name: "LinkedIn",
    url: `https://linkedin.com/in/${personalInfo.linkedin}`,
    icon: "FaLinkedin",
    color: "#0077B5"
  },
  {
    name: "GitHub", 
    url: `https://github.com/${personalInfo.github}`,
    icon: "FaGithub",
    color: "#333"
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: "FaEnvelope",
    color: "#EA4335"
  },
  {
    name: "Phone",
    url: `tel:${personalInfo.phone}`,
    icon: "FaPhone",
    color: "#25D366"
  }
];