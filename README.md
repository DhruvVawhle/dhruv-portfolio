# ⚡ Dhruv Vawhle — Software Engineer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dhruvvawhle.vercel.app)

**A high-performance, editorial software engineering portfolio showcasing production full-stack systems, applied AI security architectures, n8n automations, and verified engineering credentials.**

[🚀 Live Preview](https://dhruvvawhle.vercel.app) · [📄 View Resume](https://dhruvvawhle.vercel.app/resume.pdf) · [📬 LinkedIn](https://www.linkedin.com/in/dhruv-vawhle-277b2b2b8) · [💻 GitHub](https://github.com/DhruvVawhle)

</div>

---

## 🌟 Key Features

- **🎨 Editorial Engineering Design**: Spatial typography (Plus Jakarta Sans, Space Grotesk, JetBrains Mono), custom dark-mode token palette, and glassmorphic HUD overlays.
- **⚡ High-Performance Core Web Vitals**:
  - Tree-shaken Three.js node network and particle fields with `IntersectionObserver` pause mechanisms.
  - Zero-runtime inline SVG icon system eliminating heavy icon package parsing overhead.
  - Native lazy loading (`loading="lazy"`, `decoding="async"`) across all below-the-fold media.
  - Unblocked First Contentful Paint (FCP) with streaming server-rendered HTML.
- **🤖 Applied AI & Architecture Showcases**:
  - **PromptShield**: High-throughput LLM gateway detecting adversarial prompt injections, jailbreaks, and sensitive data leakage.
  - **MediMitra**: Multilingual AI healthcare triage assistant powered by n8n workflows and Google Gemini APIs.
  - **KrishiSaathi**: Agri-tech crop disease classification, pest diagnostic engine, and fair marketplace.
  - **CampusAI**: Full-stack campus assistant platform with verified academic and student workflows.
- **📜 Minimalist Document & Credential Previews**: Single-click modal preview for verified internship certificates and hackathon credentials with optional direct PDF download.
- **🌊 Fluid Desktop Smooth Scroll & Microphysics**: Desktop Lenis smooth scrolling with auto-fallback to native momentum touch scroll on mobile screens (<768px).
- **♿ Accessibility & Reduced Motion**: Full compliance with `prefers-reduced-motion`, semantic heading hierarchy, ARIA labels, and skip-to-content navigation.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components) |
| **UI Library** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Custom Properties Design Tokens |
| **Animations** | [Motion](https://motion.dev/) (`motion/react`) |
| **3D & Canvas** | [Three.js](https://threejs.org/) (WebGL Node Graph & Drifting Particles) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) (Dynamic Desktop-Only Hydration) |
| **Icons** | Curated SVG Vector Components + Lucide React |
| **Deployment** | [Vercel](https://vercel.com/) Edge Network CI/CD |

---

## 📁 Repository Structure

```tree
portfolio-site/
├── public/
│   ├── documents/             # Official case studies & presentations
│   ├── images/
│   │   ├── profile/           # Optimized profile portraits
│   │   ├── projects/          # High-resolution application screenshots
│   │   ├── hackathons/        # Case study & competition visuals
│   │   └── certificates/      # Verified internship & course credentials
│   └── resume.pdf             # Curated technical resume
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind v4 theme tokens & typography
│   │   ├── layout.tsx         # Root layout with SEO JSON-LD structured data
│   │   ├── page.tsx           # Assembled portfolio sections with dynamic splits
│   │   ├── template.tsx       # Unblocked SSR page wrapper
│   │   ├── robots.ts          # Search engine crawler directives
│   │   └── sitemap.ts         # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── effects/           # HeroNodeNetwork, DriftingParticleField, ClientEffects
│   │   ├── layout/            # Navbar, Footer, ScrollProgress
│   │   ├── sections/          # Hero, About, Projects, Experience, Hackathons, Skills, Certifications, Contact
│   │   └── ui/                # SpotlightCard, PreviewDialog, TechIcon, InteractiveHoverButton
│   ├── data/                  # Decoupled TypeScript & JSON data models
│   │   ├── showcaseProjects.ts
│   │   ├── experienceAndCompetitions.ts
│   │   ├── credentialsAndConnect.ts
│   │   ├── engineeringWorkflow.ts
│   │   └── skills.json
│   └── lib/                   # Utility helpers (cn, formatters)
├── next.config.ts             # Image optimization & package bundling rules
├── package.json               # Dependencies & build scripts
└── tsconfig.json              # Strict TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.18+** (or **Node.js 20+** recommended) and npm installed:

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DhruvVawhle/dhruv-portfolio.git
   cd dhruv-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server with Turbopack:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Testing

To generate an optimized production bundle:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

To run the linter:

```bash
npm run lint
```

---

## 👨‍💻 Author

**Dhruv Vawhle**
- **Website**: [dhruvvawhle.vercel.app](https://dhruvvawhle.vercel.app)
- **LinkedIn**: [linkedin.com/in/dhruv-vawhle-277b2b2b8](https://www.linkedin.com/in/dhruv-vawhle-277b2b2b8)
- **GitHub**: [@DhruvVawhle](https://github.com/DhruvVawhle)
- **Email**: [dhruvawhle@gmail.com](mailto:dhruvawhle@gmail.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
