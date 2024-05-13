import Features from "../components/Features/Features";
import Hero from "../components/Hero/Hero";
import "./Home.css";

function Home() {
  // Scrolling
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">
      <Hero onClick={scrollToFeatures} />
      <Features />
    </div>
  );
}

export default Home;
