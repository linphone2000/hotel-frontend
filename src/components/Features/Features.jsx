import FeatureCard from "./FeatureCard/FeatureCard";
import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: "fa-solid fa-map-location-dot",
      title: "Explore Top Destinations",
      image: "assets/destinations.jpeg",
      description:
        "Discover breathtaking locations and hidden gems around the world.",
    },
    {
      icon: "fas fa-bed",
      title: "Find the Perfect Room",
      image: "assets/hotel-room.png",
      description:
        "Filter by amenities, price, view, and more to find your ideal stay.",
    },
    {
      icon: "fas fa-calendar-check",
      title: "Flexible Booking Options",
      image: "assets/hotel-booking.jpeg",
      description:
        "Choose from flexible cancellation policies and special offers for your travel needs.",
    },
    {
      icon: "fas fa-credit-card",
      title: "Secure Payment System",
      image: "assets/hotel-payment.jpeg",
      description:
        "Book with confidence using our secure and trusted payment gateway.",
    },
  ];

  return (
    <section id="features-section" className="px-4 py-8">
      <h2 className="text-3xl font-light text-center mb-8">
        Explore Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 px-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            image={feature.image}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
