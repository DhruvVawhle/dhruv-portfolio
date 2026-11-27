import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BelowFoldSections from "@/components/sections/BelowFoldSections";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <BelowFoldSections />
      </main>

      <Footer />
    </>
  );
}
