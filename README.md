# ⚡ Dhruv Vawhle — Software Engineer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dhruvvawhle.vercel.app)

**A high-performance, editorial software engineering portfolio showcasing production full-stack systems, applied AI architectures, and verified deployments.**

[🚀 Live Preview](https://dhruvvawhle.vercel.app) · [📄 View Resume](https://dhruvvawhle.vercel.app/documents/Dhruv_Resume_Updated_07-08-2026_.pdf) · [📬 Connect](https://linkedin.com/in/dhruvvawhle)

</div>

---

## 🌟 Key Features

- **🎨 Architectural Editorial Design**: Apple Spatial and Cuberto-inspired typography, custom dark-mode aesthetics, glassmorphic HUD overlays, and micro-animations.
- **⚡ Hardware-Accelerated 120 FPS Spotlight**: Frame-throttled (`requestAnimationFrame`) dynamic spotlight glow cards with full touch support (`touchAction: 'pan-y'`) for stutter-free mobile momentum scrolling.
- **🪐 Dynamic Skill Ecosystem**: Interactive 3D orbiting skill rings and mapped relational node networks visualizing full-stack proficiency.
- **🔍 Deep-Dive Technical Case Studies**: Interactive modals detailing architecture diagrams, technical trade-offs, bundle optimizations, and real metrics for flagship projects.
- **🏆 Verified Proof & Credentials**: High-resolution certificate previews with interactive lightbox modal for internship completion and national hackathons.
- **📱 Responsive & Accessible**: 100% responsive across mobile, tablet, and ultra-wide displays with `prefers-reduced-motion` compliance.
- **📋 One-Click Contact Dock**: Instant email copying with custom clipboard toast feedback, social links, and direct resume downloads.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router with React Server Components) |
| **UI Library** | React 19 + TypeScript (Strict Type Safety) |
| **Styling** | Tailwind CSS + CSS Custom Properties Design Tokens |
| **Animations** | Motion (`motion/react`) + Custom Canvas & SVG Graphics |
| **Data Layer** | Centralized, decoupled JSON stores (`/src/data/`) |
| **Deployment** | Vercel Edge Network CI/CD |

---

## 📁 Repository Structure

```tree
portfolio-site/
├── public/
│   ├── documents/         # Synced resume PDFs
│   └── images/            # Optimized project thumbnails & certificates
├── src/
│   ├── app/               # Next.js App Router (layout, page, metadata)
│   ├── components/
│   │   ├── effects/       # AnimatedBackground, ScrollReveal, TiltCard
│   │   ├── layout/        # Navbar, Footer, Floating Dock
│   │   ├── sections/      # Hero, About, Projects, Experience, Skills, Hackathons, Contact
│   │   └── ui/            # GlowCard, Button, Badge, LightboxModal, CaseStudyModal
│   ├── data/              # Centralized JSON data records
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── skills.json
│   │   ├── achievements.json
│   │   ├── certificates.json
│   │   └── socials.json
│   └── lib/               # TypeScript interfaces & data routers
└── tailwind.config.ts     # Design tokens & color system
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed:

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

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

### Deploying to Vercel

The easiest way to deploy is through the [Vercel Platform](https://vercel.com/):

```bash
npx vercel --prod
```

Or connect the GitHub repository directly to Vercel for automatic CI/CD on every push to the `main` branch.

---

## 👨‍💻 Author

**Dhruv Vawhle**
- **Website**: [dhruvvawhle.vercel.app](https://dhruvvawhle.vercel.app)
- **LinkedIn**: [linkedin.com/in/dhruvvawhle](https://linkedin.com/in/dhruvvawhle)
- **GitHub**: [@DhruvVawhle](https://github.com/DhruvVawhle)
- **Email**: [dhruvawhle@gmail.com](mailto:dhruvawhle@gmail.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
