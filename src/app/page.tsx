import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Hackathons from "@/components/sections/Hackathons";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

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
