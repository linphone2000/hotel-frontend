import FeatureCard from "./FeatureCard/FeatureCard";
import "./Features.css";

const Features = () => {
  const features = [
    {
      // Font Awesome icon class for displaying an icon
      icon: "fa-solid fa-map-location-dot",
      // Title of the feature
      title: "Explore Top Destinations",
      // Image representing the feature
      image: "assets/destinations.jpeg",
      // Description providing details about the feature
      description:
        "Embark on a journey of discovery as you explore our curated selection of top destinations. From the pristine beaches of Bali to the snow-capped peaks of the Swiss Alps, immerse yourself in a world of wonder and adventure. Uncover hidden gems, iconic landmarks, and cultural treasures as you traverse the globe with ease. Whether you seek relaxation, adventure, or cultural immersion, our platform empowers you to discover the destinations of your dreams.",
    },
    {
      icon: "fas fa-bed",
      title: "Find the Perfect Room",
      image: "assets/hotel-room.png",
      description:
        "Experience unparalleled comfort and convenience as you find the perfect room for your next getaway. With an extensive range of accommodations to choose from, tailored to your preferences and budget, our platform ensures that every aspect of your stay meets your expectations. From luxurious suites with breathtaking views to cozy boutique hotels nestled in charming neighborhoods, our comprehensive search options empower you to find the ideal room for your needs.",
    },
    {
      icon: "fas fa-calendar-check",
      title: "Flexible Booking Options",
      image: "assets/hotel-booking.jpeg",
      description:
        "Enjoy peace of mind and flexibility with our array of booking options designed to accommodate your ever-changing travel plans. Whether you're faced with unexpected changes or simply seeking greater control over your itinerary, our platform offers flexible cancellation policies, last-minute booking options, and exclusive deals to suit your needs. With the freedom to modify or cancel your reservations with ease, you can plan your travels with confidence, knowing that your booking options are tailored to your preferences.",
    },
    {
      icon: "fas fa-credit-card",
      title: "Instant Booking Confirmation",
      image: "assets/booking.avif",
      description:
        "Streamline your travel planning process with instant booking confirmation, ensuring seamless and efficient reservations every time. Say goodbye to uncertainty and waiting periods as our platform provides immediate confirmation for your bookings, eliminating the need for lengthy approval processes or waiting for confirmation emails. With instant peace of mind, you can focus on the excitement of your upcoming adventure, knowing that your accommodations are secured and ready for your arrival.",
    },
  ];

  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-light text-center mb-8">
        Explore Our Features
      </h2>
      <div className="px-4 flex flex-col gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
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
