export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  status: "Completed" | "Certificate pending";
  bullets: string[];
  tags: string[];
  credential?: {
    badge: string;
    issuerNote: string;
    title: string;
    buttonText: string;
    image: string;
  };
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "pram-educate",
    role: "Software Quality Testing Assurance Intern",
    company: "PRAM Educate IT Software LLP",
    period: "Aug 2026 - Oct 2026",
    status: "Completed",
    bullets: [
      "Completed 150+ hours of on-the-job training in technical and functional testing.",
      "Executed QA procedures and test cases for the PRAM Edumobile app to verify functionality and report defects."
    ],
    tags: ["Functional testing", "Technical testing", "QA test cases", "Defect reporting"],
    credential: {
      badge: "Completed internship / Verified",
      issuerNote: "PRAM Educate official credentials · ST29068",
      title: "PRAM Educate Software Quality Assurance Internship Certificate",
      buttonText: "View internship certificate",
      image: "/images/certifications/pramedu-internship.jpg"
    }
  },
  {
    id: "codsoft",
    role: "Web Development Intern",
    company: "CodSoft",
    period: "Dec 2025 - Jan 2026",
    status: "Completed",
    bullets: [
      "Built and deployed responsive web apps and UI components (calculator, landing pages) using HTML, CSS, JavaScript, Git, and GitHub Pages."
    ],
    tags: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
    credential: {
      badge: "Completed internship / Verified",
      issuerNote: "CodSoft official credentials",
      title: "CodSoft Web Development Internship Certificate",
      buttonText: "View internship certificate",
      image: "/images/certifications/codsoft-internship.png"
    }
  },
  {
    id: "compozent",
    role: "Software Development Engineer (Web) Intern",
    company: "Compozent",
    period: "Dec 2024 - Jan 2025",
    status: "Completed",
    bullets: [
      "Developed and enhanced production-level features using React and Node.js within an Agile environment.",
      "Debugged, refactored, and optimized code; collaborated via Git, sprint planning, and code reviews.",
      "Recognized by the HR team for initiative, dedication, and eagerness to learn."
    ],
    tags: ["React", "Node.js", "Agile", "Git", "Sprint planning", "Code reviews"],
    credential: {
      badge: "Completed internship / Verified",
      issuerNote: "Compozent official credentials",
      title: "Compozent SDE Web Development Internship Completion Certificate",
      buttonText: "View internship certificate",
      image: "/images/certifications/compozent-internship.jpg"
    }
  }
];

export interface HackathonCard {
  id: string;
  title: string;
  period: string;
  team: string;
  quote: string;
  outcome: string;
  certificateImage?: string;
}

export const OTHER_COMPETITIONS: HackathonCard[] = [
  {
    id: "analytix-2026",
    title: "Analytix 2026 Datathon",
    period: "Feb 2026",
    team: "Team Edith",
    quote: "Analytix 2026 Datathon (24-hr, Thakur College), team Edith, AI agent.",
    outcome: "High-signal analytical dashboards surfacing reliable operational insights.",
    certificateImage: "/images/hackathons/analytrix-datathon-certificate.jpg"
  },
  {
    id: "buildathon-12hr",
    title: "Buildathon (12-hr)",
    period: "2025",
    team: "Team Edith",
    quote: "Buildathon (12-hr), AI agent solution.",
    outcome: "Fully functioning AI agent solution processing real-time conversational workflows.",
    certificateImage: "/images/hackathons/edith-hackathon-participation.jpg"
  }
];
