export interface ProjectMetric {
  label: string;
  value: string;
  suffix?: string;
}

export interface ExtraLink {
  label: string;
  url: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  tag: string;
  status: "Live" | "Local Dev";
  categories: ("Web" | "AI" | "Machine Learning" | "NLP" | "Cloud")[];
  subtitle: string;
  longDescription: string;
  metrics: ProjectMetric[];
  stack: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  extraLinks?: ExtraLink[];
  isGitHubCard?: boolean;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "promptshield",
    title: "PromptShield",
    tag: "Featured engineering system",
    status: "Live",
    categories: ["AI", "Web", "Cloud"],
    subtitle: "LLM prompt injection detection and prevention gateway.",
    longDescription:
      "Full-stack Next.js 16 / TypeScript security gateway that analyzes each prompt, assigns a 0–100 risk score, and allows, warns, sanitizes, or blocks it before it reaches the LLM. Detects prompt injection, jailbreaks, system-prompt leaks, role override, credential probing, and tool abuse using a two-layer defense (client-side pattern guard plus server-side proxy through OpenAI-compatible OmniRoute gateway) with Firebase Admin token verification and audit logging.",
    metrics: [
      { label: "Threat Risk Scoring", value: "0–100", suffix: " Scale (Primary)" },
      { label: "Defense Architecture", value: "2", suffix: " Layers" },
      { label: "Enforcement Actions", value: "4", suffix: " Actions" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Firebase Admin SDK",
      "OmniRoute",
    ],
    image: "/images/projects/promptshield.png",
    // TODO: Update PromptShield GitHub repository URL if distinct from profile
    githubUrl: "https://github.com/DhruvVawhle/PromptShield",
    liveUrl: "https://dhruvvawhle.vercel.app",
  },
  {
    id: "campusai",
    title: "CampusAI",
    tag: "Featured system",
    status: "Local Dev",
    categories: ["AI", "NLP", "Web"],
    subtitle: "Voice-enabled college reception node.",
    longDescription:
      "Next.js, TypeScript, Tailwind, Framer Motion and React Three Fiber touchscreen kiosk interface with a 3D robot and idle/listening/thinking/speaking states for a multilingual voice assistant. Integrates audio visualizer, QR route display, and Web Audio/WebSocket/REST clients with FastAPI backend.",
    metrics: [
      { label: "Supported Languages", value: "4", suffix: " (EN, HI, MR, Hinglish)" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Three Fiber",
      "Web Audio API",
      "WebSocket",
      "REST APIs",
    ],
    image: "/images/projects/campusai.png",
    // TODO: Update CampusAI GitHub repository URL if distinct from profile
    githubUrl: "https://github.com/DhruvVawhle/CampusAI",
    extraLinks: [
      {
        label: "Upstream Repo",
        // TODO: Upstream repo URL (Jayesh Tiwari / CampusAI)
        url: "https://github.com/jayeshtiwari-ai/CampusAI",
      },
    ],
  },
  {
    id: "krishisaathi",
    title: "KrishiSaathi",
    tag: "Featured engineering system",
    status: "Live",
    categories: ["Web", "Machine Learning", "Cloud"],
    subtitle: "Farm-to-market marketplace eliminating agricultural middlemen.",
    longDescription:
      "Full-stack marketplace connecting farmers directly with buyers with an ARIMA model trained on AGMARKNET mandi price data (18,300+ records) to forecast commodity prices. Features hybrid Firestore and MongoDB architecture with real-time cart sync, role-based dashboards, OAuth, Razorpay payments, and 8-language commodity search.",
    metrics: [
      { label: "Data Rows Processed", value: "18,300+", suffix: " Mandi Records" },
      { label: "Bundle Size Cut", value: "69%", suffix: " (2.9MB to 900KB)" },
      { label: "Languages Supported", value: "8", suffix: " Indic Dialects" },
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "Firebase Firestore",
      "MongoDB",
      "Python",
      "ARIMA",
      "Razorpay",
      "OAuth",
    ],
    image: "/images/projects/krishisaathi-marketplace.png",
    // TODO: Update KrishiSaathi GitHub repository URL if distinct from profile
    githubUrl: "https://github.com/DhruvVawhle/KrishiSaathi",
    liveUrl: "https://krishisaathi-web.vercel.app/",
  },
  {
    id: "imdb-sentiment",
    title: "IMDB Movie Review Sentiment",
    tag: "Machine learning showcase",
    status: "Local Dev",
    categories: ["Machine Learning", "NLP"],
    subtitle: "NLP sentiment classification for 50,000 IMDB reviews.",
    longDescription:
      "NLP sentiment classification pipeline benchmarking traditional machine learning models (TF-IDF with Logistic Regression and Naive Bayes) against deep learning architectures (Bidirectional LSTM) on 50,000 IMDB movie reviews.",
    metrics: [
      { label: "Reviews Analyzed", value: "50,000+", suffix: " Labeled Reviews" },
    ],
    stack: [
      "Python",
      "TF-IDF",
      "Logistic Regression",
      "Naive Bayes",
      "Bidirectional LSTM",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "NLTK",
      "Pandas",
      "NumPy",
    ],
    image: "/images/projects/imdb-sentiment-analysis.png",
    // TODO: Update IMDB Sentiment GitHub repository URL if distinct from profile
    githubUrl: "https://github.com/DhruvVawhle/IMDB-Movie-Review-Sentiment-Analysis",
  },
  {
    id: "see-more-github",
    title: "See more projects",
    tag: "GitHub Archive",
    status: "Live",
    categories: [],
    subtitle: "The rest of my work lives on my GitHub profile.",
    longDescription:
      "Explore additional open-source repositories, experiments, full-stack microservices, hackathon submissions, and research prototypes on GitHub.",
    metrics: [],
    stack: ["Git", "GitHub", "Open Source", "CI/CD"],
    image: "",
    githubUrl: "https://github.com/DhruvVawhle",
    isGitHubCard: true,
  },
];
