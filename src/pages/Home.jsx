import Features from "../components/Features/Features";
import Hero from "../components/Hero/Hero";

function Home() {
  // Scrolling
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero onClick={scrollToFeatures} />
      <Features />
    </>
  );
}

export default Home;
