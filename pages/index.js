import { useState } from "react";
import Layout, {
  HERO_DESCRIPTION,
  OG_IMAGE,
  SITE_URL,
} from "../components/Layout";
import TopBar from "../components/terminal/TopBar";
import HeroSection from "../components/terminal/HeroSection";
import VenturesIndex from "../components/terminal/VenturesIndex";
// import Chronology from "../components/terminal/Chronology";
import BriefingForm from "../components/terminal/BriefingForm";
import TerminalFooter from "../components/terminal/TerminalFooter";

const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Terpmetrix",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-circle.png`,
      },
      image: OG_IMAGE,
      description: HERO_DESCRIPTION,
      foundingDate: "2023",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Boulder",
        addressRegion: "CO",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "inbox@terpmetrix.com",
        telephone: "+1-301-525-4028",
        contactType: "customer service",
      },
      sameAs: [
        "https://twitter.com/terpmetrix",
        "https://instagram.com/terpmetrix",
        "https://linkedin.com/company/terpmetrix",
      ],
      owns: [
        { "@type": "Brand", name: "TerpScoops", url: "https://terpscoops.com" },
        { "@type": "Brand", name: "TerpTier", url: "https://terptier.com" },
        { "@type": "Brand", name: "TerpFocus", url: "https://terpfocus.com" },
        {
          "@type": "Brand",
          name: "Puffsn0w",
          url: "https://puffsn0w.terpscoops.com",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Terpmetrix",
      description: HERO_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Precision Cannabis Technology & Hardware | Terpmetrix",
      description: HERO_DESCRIPTION,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    },
  ],
};

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
      description={HERO_DESCRIPTION}
      canonicalPath="/"
      structuredData={HOME_STRUCTURED_DATA}
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
