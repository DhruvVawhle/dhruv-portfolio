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
  imageAlt?: string;
  githubUrl: string;
  liveUrl?: string;
  extraLinks?: ExtraLink[];
  isGitHubCard?: boolean;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "promptshield",
    title: "PromptShield",
    tag: "Enterprise AI Security Gateway",
    status: "Live",
    categories: ["AI", "Web", "Cloud"],
    subtitle: "Deterministic LLM security gateway, OWASP Top 10 threat intelligence, and zero-leakage prompt auditing.",
    longDescription:
      "Enterprise-grade AI security gateway built on Next.js 16. Every inbound prompt is normalized, analyzed for adversarial threats via zero-dependency morphological root stemming, evaluated against deterministic custom policies, scored for risk (0–100), and enforced (ALLOW, WARN, SANITIZE, or BLOCK) in under 15ms before reaching LLMs. Features Firebase Admin token verification, cryptographic HMAC audit logging, incident triage workflows, transparent 2-line OpenAI SDK replacement, and direct Groq LPU inference.",
    metrics: [
      { label: "Pipeline Latency", value: "<15", suffix: "ms Execution" },
      { label: "Threat Coverage", value: "OWASP", suffix: " LLM Top 10" },
      { label: "Threat Risk Scoring", value: "0–100", suffix: " Scale" },
      { label: "Enforcement Actions", value: "4", suffix: " Actions (Allow/Warn/Sanitize/Block)" },
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Groq LPU",
      "Firebase Admin SDK",
      "Cloud Firestore",
      "Upstash Redis",
      "Lenis & GSAP",
    ],
    image: "/images/projects/promptshield.png",
    imageAlt: "PromptShield enterprise AI prompt injection detection and prevention gateway security interface preview",
    githubUrl: "https://github.com/DhruvVawhle/PromptShield",
    liveUrl: "https://dhruvvawhle.vercel.app",
  },
  {
    id: "campusai",
    title: "CampusAI",
    tag: "Institutional AI Kiosk & Robotics Terminal",
    status: "Live",
    categories: ["AI", "NLP", "Web"],
    subtitle: "Autonomous multilingual AI reception robot and interactive kiosk for Shree L. R. Tiwari College of Engineering (SLRTCE).",
    longDescription:
      "Autonomous multilingual AI campus terminal built for Shree L. R. Tiwari College of Engineering (SLRTCE), Mumbai. Listens in English, Hindi, Marathi, and Hinglish via Groq Whisper, synthesizes natural neural Indian accent speech via Edge-TTS, and retrieves ground-truth academic data via confidence-gated FAISS vector RAG and SQLite. Features a reactive 3D robot avatar, interactive SVG indoor floor wayfinding with mobile QR handoffs, 45s inactivity auto-reset, and hardware diagnostics.",
    metrics: [
      { label: "Multilingual Voice Loop", value: "4", suffix: " Dialects (EN, HI, MR, Hinglish)" },
      { label: "LLM Reasoning", value: "70B", suffix: " Llama 3.3 on Groq" },
      { label: "RAG Architecture", value: "FAISS", suffix: " + Relational SQLite" },
      { label: "Wayfinding & Handoff", value: "SVG", suffix: " Floor Maps + Mobile QR" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "FastAPI",
      "Python 3.11",
      "Groq Cloud (Llama 3.3 70B)",
      "Groq Whisper",
      "Edge-TTS",
      "FAISS Vector RAG",
      "SQLite3",
      "Web Audio API",
    ],
    image: "/images/projects/campusai.png",
    imageAlt: "CampusAI multilingual voice-enabled 3D college reception kiosk touchscreen interface for SLRTCE",
    githubUrl: "https://github.com/DhruvVawhle/CampusAI",
    extraLinks: [
      {
        label: "Upstream Repo (Jayesh Tiwari)",
        url: "https://github.com/jayeshtiwari-ai/CampusAI",
      },
    ],
  },
  {
    id: "krishisaathi",
    title: "KrishiSaathi",
    tag: "Copyright-Registered System",
    status: "Live",
    categories: ["Web", "Machine Learning", "Cloud"],
    subtitle: "Farm-to-market marketplace eliminating agricultural middlemen.",
    longDescription:
      "Full-stack marketplace connecting farmers directly with buyers with an ARIMA model trained on AGMARKNET mandi price data (18,300+ records) to forecast commodity prices. Features hybrid Firestore and MongoDB architecture with real-time cart sync, role-based dashboards, OAuth, Razorpay payments, and 8-language commodity search. Copyright registered with the Copyright Office, Government of India (Certificate No. SW-2026024057; issued 29 Oct 2026).",
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
    imageAlt: "KrishiSaathi farm-to-market agricultural marketplace and ARIMA commodity price forecasting dashboard",
    githubUrl: "https://github.com/DhruvVawhle/KrishiSaathi",
    liveUrl: "https://krishisaathi-web.vercel.app/",
  },
  {
    id: "imdb-sentiment",
    title: "CineSense",
    tag: "Production NLP Architecture",
    status: "Live",
    categories: ["Machine Learning", "NLP", "AI", "Web"],
    subtitle: "Multi-model movie review intelligence with real-time LIME explainability.",
    longDescription:
      "Interactive cinema intelligence dashboard and sentiment classification workbench benchmarked on 50,000 IMDB reviews (10,000 held-out stratified test set). Features real-time inference across Logistic Regression (89.78% accuracy, 0.9634 ROC-AUC), Multinomial Naive Bayes (86.90%), and PyTorch Bidirectional LSTM (83.30%), paired with explainable AI (LIME token-level attribution), Letterboxd-style community reviews, personal watched diary, and TMDB theatrical discovery.",
    metrics: [
      { label: "Top Accuracy", value: "89.78%", suffix: " (Logistic Reg)" },
      { label: "ROC-AUC Score", value: "0.9634", suffix: " Held-Out Split" },
      { label: "Test Set Size", value: "10,000", suffix: " Stratified" },
      { label: "Automated Tests", value: "49", suffix: " Passing Pytests" },
    ],
    stack: [
      "Python",
      "Streamlit",
      "PyTorch",
      "Scikit-learn",
      "LIME",
      "TF-IDF",
      "Bidirectional LSTM",
      "NLTK",
      "TMDB API",
      "Pandas",
    ],
    image: "/images/projects/cinesense-preview.png",
    imageAlt: "CineSense real-time multi-model movie review sentiment analysis and cinema intelligence dashboard preview",
    githubUrl: "https://github.com/DhruvVawhle/IMDB-Movie-Review-Sentiment-Analysis",
    liveUrl: "https://cinesense-review.streamlit.app/",
    extraLinks: [
      {
        label: "Streamlit App",
        url: "https://cinesense-review.streamlit.app/",
      },
      {
        label: "Kaggle Dataset",
        url: "https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews",
      },
    ],
  },
  {
    id: "brain-tumor-detection",
    title: "Brain Tumor Detection (XAI)",
    tag: "Medical Deep Learning & Vision",
    status: "Live",
    categories: ["AI", "Machine Learning", "Cloud"],
    subtitle: "MRI brain tumor classification with Grad-CAM explainability heatmaps.",
    longDescription:
      "End-to-end deep learning and Explainable AI (XAI) clinical vision system detecting and classifying axial brain MRI scans across 4 diagnostic classes (Glioma, Meningioma, Pituitary, No Tumor). Benchmarks Custom CNN, MobileNetV3 (93.94%), and ResNet18 (94.75% accuracy, 0.9462 macro F1) across 1,600 held-out test scans, with PyTorch forward/backward hook Grad-CAM saliency heatmaps for radiologist interpretability.",
    metrics: [
      { label: "Top Accuracy", value: "94.75%", suffix: " (ResNet18)" },
      { label: "Macro F1-Score", value: "0.9462", suffix: " Balanced Test Set" },
      { label: "Test MRI Scans", value: "1,600", suffix: " (400 / Class)" },
      { label: "Best Val Acc", value: "98.93%", suffix: " (Epoch 8)" },
    ],
    stack: [
      "PyTorch",
      "Torchvision",
      "ResNet18",
      "MobileNetV3",
      "Custom CNN",
      "Grad-CAM",
      "Streamlit",
      "Scikit-learn",
      "NumPy",
    ],
    image: "/images/projects/brain-tumor-detection.png",
    imageAlt: "Brain Tumor Detection MRI scans with Grad-CAM saliency heatmaps and model benchmark analytics",
    githubUrl: "https://github.com/DhruvVawhle/brain-tumor-detection",
    liveUrl: "https://brain-tumor-detection-xai.streamlit.app",
    extraLinks: [
      {
        label: "Streamlit App",
        url: "https://brain-tumor-detection-xai.streamlit.app",
      },
      {
        label: "Kaggle Dataset",
        url: "https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset",
      },
    ],
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
