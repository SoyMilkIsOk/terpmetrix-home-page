import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/terminal/TopBar";
import HeroSection from "../components/terminal/HeroSection";
import VenturesIndex from "../components/terminal/VenturesIndex";
// import Chronology from "../components/terminal/Chronology";
import BriefingForm from "../components/terminal/BriefingForm";
import TerminalFooter from "../components/terminal/TerminalFooter";

const Index = () => {
  const [preselectedSubject, setPreselectedSubject] =
    useState("Investor Briefing");

  const handleRequestBriefing = (subject = "Investor Briefing") => {
    setPreselectedSubject(subject);
    const el = document.getElementById("access");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout
      pageTitle="Precision Cannabis Technology & Hardware | Terpmetrix"
      ogTitle="Terpmetrix — Precision Cannabis Technology & Hardware"
    >
      <TopBar />
      <main>
        <HeroSection onRequestBriefing={handleRequestBriefing} />
        <VenturesIndex onRequestBriefing={handleRequestBriefing} />
        {/* <Chronology /> */}
        <BriefingForm preselectedSubject={preselectedSubject} />
      </main>
      <TerminalFooter />
    </Layout>
  );
};

export default Index;
