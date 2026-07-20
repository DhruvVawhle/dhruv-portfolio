/* ─── Portfolio Data ─── */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  problem: string;
  approach: string;
  architecture: string;
  outcomes: string[];
  metrics: { label: string; value: string; suffix?: string }[];
  techStack: string[];
  links: { label: string; url: string; icon: "github" | "external" | "doc" }[];
  copyrightFiled?: {
    diaryNumber: string;
    status: string;
  };
  image?: string;
  images?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  certificate?: {
    title: string;
    image: string;
    verifiedId?: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  image?: string;
  credentialId?: string;
  verifyUrl?: string;
}

export interface Hackathon {
  id: string;
  name: string;
  badge?: string;
  organizer: string;
  date: string;
  roleTeam: string;
  description: string;
  challenge?: string;
  role?: string;
  timeConstraint?: string;
  outcome?: string;
  techStack: string[];
  image?: string;
}

export interface TrustSignal {
  icon: string;
  label: string;
}

// ─── Hero ───

export const hero = {
  name: "Dhruv Vawhle",
  role: "Full-Stack Developer & AI/ML Engineer",
  tagline:
    "I build production software with real data, real users, and real legal ownership — not just tutorials.",
  trustSignals: [
    { icon: "shield", label: "Copyright-Filed Software" },
    { icon: "database", label: "Full-Stack & Applied AI Systems" },
    { icon: "rocket", label: "2 Production Deployments" },
  ] as TrustSignal[],
};

// ─── About ───

export const about = {
  narrative: [
    "My engineering journey began with a curiosity for systems architecture—transforming complex algorithms into intuitive applications that solve real-world problems.",
    "I believe student engineering shouldn't mean toy apps. I build production-grade architectures with hybrid databases, low-latency AI pipelines, and formal legal ownership.",
    "Whether optimizing frontend performance or architecting voice-enabled healthcare systems, my motivation is simple: deliver calm, reliable software with measurable impact.",
  ],
  milestones: [
    { year: "2023", label: "Started B.Tech in Information Technology" },
    { year: "2025", label: "SDE (Web) Intern at Compozent" },
    { year: "2025", label: "Built MedTalk — AI Healthcare Chatbot" },
    { year: "2025", label: "Started KrishiSaathi Development" },
    { year: "2026", label: "Web Development Intern at CodSoft" },
    { year: "2026", label: "Filed Copyright for KrishiSaathi" },
    { year: "2027", label: "Expected Graduation" },
  ],
};

// ─── Projects ───

export const projects: Project[] = [
  {
    id: "krishisaathi",
    title: "KrishiSaathi",
    subtitle: "Farm-to-Market Marketplace Eliminating Agricultural Middlemen",
    period: "Jul 2025 – May 2026",
    problem:
      "Indian farmers lose 25–40% of revenue to middlemen in traditional mandi (market) systems. No direct-to-buyer digital platform existed that combined real-time market price intelligence with a streamlined e-commerce flow for agricultural commodities.",
    approach:
      "Built a full-stack marketplace with a price-prediction engine trained on government data. Designed a hybrid database architecture combining Firestore's real-time sync with MongoDB's flexibility for complex commodity queries. Implemented role-based dashboards for farmers and buyers with multi-language search support.",
    architecture:
      "Hybrid Firestore + MongoDB architecture — Firestore handles real-time cart sync and user sessions, while MongoDB manages the commodity catalog and price history. ARIMA-based price prediction model trained on 18,300+ rows of AGMARKNET government mandi data. React frontend with code-split routes, Node.js/Express API layer, Razorpay payment integration, and OAuth via Google/Facebook/Apple.",
    outcomes: [
      "Trained ARIMA price-prediction model on 18,300+ rows of AGMARKNET government mandi data",
      "Reduced production bundle size ~69% (2.9 MB → 900 KB) via code splitting and lazy loading",
      "Built 8-language commodity search with real-time Firestore sync",
      "Implemented OAuth (Google/Facebook/Apple) + Razorpay payments",
      "Filed for copyright registration with the Indian Copyright Office (Diary No. SW-21662/2026-CO)",
    ],
    metrics: [
      { label: "Data Rows Processed", value: "18300", suffix: "+" },
      { label: "Bundle Size Reduction", value: "69", suffix: "%" },
      { label: "Languages Supported", value: "8", suffix: "" },
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "Firebase",
      "MongoDB",
      "Python",
      "ARIMA",
      "Razorpay",
      "OAuth",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/DhruvVawhle/KrishiSaathi",
        icon: "github",
      },
      { label: "Live Demo", url: "https://krishisaathi-web.vercel.app/", icon: "external" },
    ],
    copyrightFiled: {
      diaryNumber: "SW-21662/2026-CO",
      status: "Filed with Indian Copyright Office",
    },
    image: "/images/projects/krishisaathi-homepage.png",
    images: [
      "/images/projects/krishisaathi-homepage.png",
      "/images/projects/krishisaathi-login.png",
      "/images/projects/krishisaathi-marketplace.png",
      "/images/projects/krishisaathi-buyer-dashboard.png",
      "/images/projects/krishisaathi-farmer-dashboard.png",
      "/images/projects/krishisaathi-order-details.png",
      "/images/projects/krishisaathi-payment-gateway.png",
      "/images/projects/krishisaathi-purchase-details.png",
      "/images/projects/krishisaathi-mlforecast.png",
    ],
  },
  {
    id: "medtalk",
    title: "MedTalk",
    subtitle: "24/7 Multilingual AI Healthcare Chatbot",
    period: "Jan 2025 – May 2025",
    problem:
      "Healthcare access in multilingual regions is limited by language barriers and the unavailability of medical professionals around the clock. Patients need reliable, accessible preliminary health guidance at any hour.",
    approach:
      "Built a voice-enabled AI chatbot powered by Google's Gemini API for medical query understanding, with Google Cloud Speech-to-Text and Text-to-Speech for multilingual voice interactions. Designed a secure RESTful backend with Flask, focusing on response accuracy and patient data privacy.",
    architecture:
      "Python/Flask backend serving a RESTful API. Google Gemini API handles natural language understanding and medical response generation. Google Cloud STT/TTS enables voice input and audio output in multiple languages. Secure session management and input sanitization throughout.",
    outcomes: [
      "Deployed 24/7 AI-powered healthcare chatbot with voice interaction",
      "Integrated Google Gemini API for accurate medical query understanding",
      "Built multilingual voice support via Google Cloud STT/TTS",
      "Implemented secure RESTful backend with Flask",
    ],
    metrics: [
      { label: "Availability", value: "24", suffix: "/7" },
    ],
    techStack: [
      "Python",
      "Flask",
      "Google Gemini API",
      "Google Cloud STT",
      "Google Cloud TTS",
      "REST APIs",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/DhruvVawhle/MedTalk-AI-Chatbot",
        icon: "github",
      },
    ],
    image: "/images/projects/medtalk-aichatbot.png",
    images: ["/images/projects/medtalk-aichatbot.png"],
  },
];

// ─── Experience ───

export const experiences: Experience[] = [
  {
    id: "codsoft",
    company: "CodSoft",
    role: "Web Development Intern",
    period: "2026",
    bullets: [
      "Developed responsive, cross-browser-compatible web interfaces using HTML, CSS, and JavaScript",
      "Implemented pixel-perfect designs from Figma mockups with attention to responsive breakpoints",
      "Improved page load performance through image optimization and CSS refactoring",
    ],
    certificate: {
      title: "CodSoft Web Development Internship Certificate",
      image: "/images/certifications/codsoft-internship.png",
      verifiedId: "Verified CodSoft Internship Completion",
    },
  },
  {
    id: "compozent",
    company: "Compozent",
    role: "SDE (Web) Intern",
    period: "2025",
    bullets: [
      "Built and maintained React-based web applications within an Agile development team",
      "Developed RESTful API endpoints with Node.js/Express, integrating with existing microservices",
      "Participated in sprint planning, code reviews, and retrospectives as part of Agile workflow",
    ],
    certificate: {
      title: "Compozent SDE Web Development Internship Completion Certificate",
      image: "/images/certifications/compozent-internship.jpg",
      verifiedId: "Verified Compozent Internship Completion",
    },
  },
];

// ─── Skills ───

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Node.js", "Express", "Flask", "Framer Motion"],
  },
  {
    title: "Databases & Cloud",
    skills: ["MongoDB", "Firebase", "AWS", "GCP", "Vercel", "Docker"],
  },
  {
    title: "Tools & Concepts",
    skills: [
      "Git",
      "REST APIs",
      "Machine Learning",
      "Data Visualization",
      "Agile/Scrum",
      "CI/CD",
    ],
  },
];

// ─── Hackathons ───

export const hackathons: Hackathon[] = [
  {
    id: "medimitra",
    name: "MediMitra",
    badge: "National-Level · SIH 2025",
    organizer: "Smart India Hackathon 2025",
    date: "2025",
    roleTeam: "Team Lead · Team MediMitra (6 members)",
    description:
      "Public health chatbot delivering disease awareness and outbreak alerts via low-bandwidth WhatsApp & SMS using an n8n RAG pipeline.",
    challenge:
      "Public health awareness in rural communities limited by low internet bandwidth and lack of medical app adoption.",
    role: "Team Lead & AI Architect — designed the n8n RAG workflow and multilingual Gemini NLU pipeline.",
    timeConstraint: "SIH National Software Sprint",
    outcome:
      "Selected among Top 30 college finalists for Smart India Hackathon software-track submission.",
    techStack: [
      "n8n",
      "Gemini API",
      "WhatsApp API",
      "MongoDB",
      "RAG",
      "Vector DB",
    ],
    image: "/images/hackathons/medimitra-chatbot.png",
  },
  {
    id: "analytrix",
    name: "Analytrix '26 Datathon",
    organizer: "TCET",
    date: "Feb 2026",
    roleTeam: "Team: C72",
    description:
      "End-to-end data cleaning, validation pipeline, and executive dashboarding for noisy real-world datasets.",
    challenge:
      "Filtering raw unstructured data for accuracy under strict time and validation constraints.",
    role: "Data Pipeline & Visualization Lead — performed Python/Pandas cleaning and Power BI modeling.",
    timeConstraint: "Competitive Datathon Sprint",
    outcome:
      "High-signal Power BI & Python dashboards surfacing reliable operational insights.",
    techStack: [
      "Python",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Power BI",
      "Excel",
    ],
    image: "/images/hackathons/analytrix-datathon-certificate.jpg",
  },
  {
    id: "edith",
    name: "Edith – AI Agent Buildathon",
    organizer: "Technium, SLRTCE",
    date: "Mar 2025",
    roleTeam: "Team: Fantastic Four",
    description:
      "Telegram-integrated AI agent enabling local kirana convenience stores to manage inventory and supplier orders through conversational chat.",
    challenge:
      "Kirana store owners struggle with complex inventory dashboards and manual order tracking.",
    role: "Full-Stack AI Engineer — integrated Telegram Bot API with n8n workflow automation.",
    timeConstraint: "24-Hour Intensive Buildathon",
    outcome:
      "Fully functioning Telegram bot processing real-time stock queries and automating supplier reorders.",
    techStack: ["n8n", "Gemini API", "Telegram Bot API"],
    image: "/images/hackathons/edith-hackathon-participation.jpg",
  },
];

// ─── Certifications ───

export const certifications: Certification[] = [
  {
    title: "Google Cloud – Introduction to Security in the World of AI",
    issuer: "Google Cloud",
    image: "/images/certifications/google-cloud-ai-security.png",
  },
  {
    title: "Google Cloud – Exploring Data Transformation with Google Cloud",
    issuer: "Google Cloud",
    image: "/images/certifications/google-cloud-data-transformation.png",
  },
  {
    title: "Cisco Networking Academy – Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    image: "/images/certifications/cisco-data-science.jpg",
  },
  {
    title: "NxtWave – AI for Students: Build Your Own Generative AI Model",
    issuer: "NxtWave",
    image: "/images/certifications/nxtwave-generative-ai.jpg",
  },
  {
    title: "Infosys Springboard – Basics of Python",
    issuer: "Infosys Springboard",
    image: "/images/certifications/infosys-springboard-python.png",
  },
  {
    title: "Edunet – Foundation Course on Green Skills & Artificial Intelligence",
    issuer: "Edunet Foundation",
    image: "/images/certifications/edunet-aiml.jpg",
  },
];

// ─── Navigation ───

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ───

export const socialLinks = [
  {
    label: "Email",
    url: "mailto:dhruvawhle@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    url: "https://github.com/DhruvVawhle",
    icon: "github",
  },
  {
    label: "Resume",
    url: "/documents/Dhruv_Vawhle_Resume.pdf",
    icon: "resume",
  },
];
