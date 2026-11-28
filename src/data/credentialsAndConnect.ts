export interface CredentialItem {
  id: string;
  issuer: string;
  issuerIcon: "cisco" | "nxtwave" | "googlecloud" | "edunet" | "anthropic" | "ibm" | "govindia" | "infosys";
  title: string;
  categories: ("Cloud" | "Data Science" | "AI & ML")[];
  issuedDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: string;
  images?: string[];
  pdf?: string;
  hasImage: boolean;
}

export const CREDENTIALS_DATA: CredentialItem[] = [
  {
    id: "anthropic-claude-code-in-action",
    issuer: "Anthropic",
    issuerIcon: "anthropic",
    title: "Claude Academy: Claude Code in action",
    categories: ["AI & ML"],
    issuedDate: "Nov 2026",
    credentialId: "3a65b7934e8d1c6314ee0e439738fdb2",
    verifyUrl: "https://academy.claude.com/verify/3a65b7934e8d1c6314ee0e439738fdb2",
    image: "/images/certifications/claude-code-in-action.png",
    pdf: "/images/certifications/claude-code-in-action.pdf",
    hasImage: true,
  },
  {
    id: "ibm-granite-summarizing-data",
    issuer: "IBM",
    issuerIcon: "ibm",
    title: "Summarizing Data Using IBM Granite",
    categories: ["AI & ML", "Data Science"],
    issuedDate: "Nov 2026",
    image: "/images/certifications/ibm-granite-summarizing-data.png",
    hasImage: true,
  },
  {
    id: "govindia-krishisaathi-copyright",
    issuer: "Government of India",
    issuerIcon: "govindia",
    title: "KrishiSaathi – The Farmer's Guide (Copyright Registration)",
    categories: ["AI & ML", "Cloud"],
    issuedDate: "Oct 2026",
    credentialId: "SW-2026024057",
    verifyUrl:
      "https://www.copyright.gov.in/CopyrightROC_Details.aspx?Diary_No=297co06zxeS95LxF0B6+7Q%3d%3d&Roc_No=3Y7Lsh3p&Id=LQw9gNfDp3hsL7Y3",
    image: "/images/certifications/krishisaathi-copyright-p1.jpg",
    images: [
      "/images/certifications/krishisaathi-copyright-p1.jpg",
      "/images/certifications/krishisaathi-copyright-p2.jpg",
    ],
    pdf: "/images/certifications/krishisaathi-copyright.pdf",
    hasImage: true,
  },
  {
    id: "google-cloud-ai-security",
    issuer: "Google Cloud",
    issuerIcon: "googlecloud",
    title: "Google Cloud - Introduction to Security in the World of AI",
    categories: ["Cloud", "AI & ML"],
    issuedDate: "Jan 2026",
    verifyUrl:
      "https://www.skills.google/public_profiles/f2ebe9f4-180d-4465-83f9-221e26fc3fff/badges/21534379?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    image: "/images/certifications/google-cloud-ai-security.png",
    hasImage: true,
  },
  {
    id: "cisco-data-science",
    issuer: "Cisco Networking Academy",
    issuerIcon: "cisco",
    title: "Cisco Networking Academy - Introduction to Data Science",
    categories: ["Data Science"],
    credentialId: "CISCO-DS-4592",
    image: "/images/certifications/cisco-data-science.jpg",
    hasImage: true,
  },
  {
    id: "nxtwave-ai-students",
    issuer: "NxtWave",
    issuerIcon: "nxtwave",
    title: "NxtWave - AI for Students: Build Your Own Generative AI Model",
    categories: ["AI & ML"],
    credentialId: "NXT-GEN-AI-1582",
    image: "/images/certifications/nxtwave-generative-ai.jpg",
    hasImage: true,
  },
  {
    id: "google-cloud-generative-ai",
    issuer: "Google Cloud",
    issuerIcon: "googlecloud",
    title: "Google Cloud - Introduction to Generative AI",
    categories: ["Cloud", "AI & ML"],
    issuedDate: "Jan 2025",
    verifyUrl:
      "https://www.skills.google/public_profiles/f2ebe9f4-180d-4465-83f9-221e26fc3fff/badges/13721020?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    image: "/images/certifications/google-cloud-generative-ai.png",
    hasImage: true,
  },
  {
    id: "google-cloud-data-transformation",
    issuer: "Google Cloud",
    issuerIcon: "googlecloud",
    title: "Google Cloud - Exploring Data Transformation with Google Cloud",
    categories: ["Cloud", "Data Science"],
    issuedDate: "Aug 2025",
    verifyUrl:
      "https://www.skills.google/public_profiles/f2ebe9f4-180d-4465-83f9-221e26fc3fff/badges/17319358?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    image: "/images/certifications/google-cloud-data-transformation.png",
    hasImage: true,
  },
  {
    id: "edunet-green-skills",
    issuer: "Edunet Foundation",
    issuerIcon: "edunet",
    title: "Edunet - Foundation Course on Green Skills & Artificial Intelligence",
    categories: ["AI & ML"],
    credentialId: "EDUNET-GREEN-AI-7731",
    image: "/images/certifications/edunet-aiml.jpg",
    hasImage: true,
  },
  {
    id: "infosys-basics-of-python",
    issuer: "Infosys Springboard",
    issuerIcon: "infosys",
    title: "Infosys Springboard - Basics of Python",
    categories: ["Data Science"],
    verifyUrl: "https://verify.onwingspan.com/",
    image: "/images/certifications/Infosys Basic of Python.png",
    hasImage: true,
  },
];

export interface VerifiedProfile {
  label: string;
  url: string;
}

export const CONNECT_PROFILES: VerifiedProfile[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
  },
  {
    label: "GitHub",
    url: "https://github.com/DhruvVawhle",
  },
];

export const EMAIL_ADDRESS: string = "dhruvvawhle@gmail.com";

export interface NavLink {
  label: string;
  href: string;
}

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export interface FooterSocialLink {
  label: string;
  url: string;
}

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com/in/dhruv-vawhle-277b2b2b8" },
  { label: "GitHub", url: "https://github.com/DhruvVawhle" },
  { label: "Resume", url: "/resume.pdf" },
  ...(EMAIL_ADDRESS ? [{ label: "Email", url: `mailto:${EMAIL_ADDRESS}` }] : []),
];

