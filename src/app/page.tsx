import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Hackathons = dynamic(() => import("@/components/sections/Hackathons"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Hackathons />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
