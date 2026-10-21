export interface CredentialItem {
  id: string;
  issuer: string;
  issuerIcon: "cisco" | "nxtwave" | "googlecloud" | "edunet";
  title: string;
  categories: ("Cloud" | "Data Science" | "AI & ML")[];
  credentialId?: string;
  image?: string;
  hasImage: boolean;
}

export const CREDENTIALS_DATA: CredentialItem[] = [
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
    image: "/images/certifications/google-cloud-generative-ai.png",
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
    id: "google-cloud-ai-security",
    issuer: "Google Cloud",
    issuerIcon: "googlecloud",
    title: "Google Cloud - Introduction to Security in the World of AI",
    categories: ["Cloud", "AI & ML"],
    image: "/images/certifications/google-cloud-ai-security.png",
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

