import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white"
      id="footer-section"
    >
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between md:items-center justify-center">
        <div className="footer-left">
          <h1 className="text-xl font-bold">Scape Booking</h1>
          <p className="text-base mt-2">
            Welcome to Scape, your go-to platform for booking the perfect hotel
            stay with detailed insights and genuine booking function.
          </p>
          <div className="social-media mt-4">
            <a href="#" className="hover:text-gray-500 mr-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-500 mr-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-right gap-4 md:gap-0 items-center md:items-start flex flex-row md:flex-col space-y-4">
          <h3 className="text-lg font-bold">Navigation</h3>
          <ul className="!mt-0 md:!mt-2 text-base gap-2 flex md:flex-col list-none">
            <li>
              <a className="font-extralight" onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a className="font-extralight" onClick={() => navigate("/about")}>About Us</a>
            </li>
            <li>
              <a className="font-extralight" onClick={() => navigate("/hotels")}>Services</a>
            </li>
            <li>
              <a className="font-extralight" onClick={() => navigate("/contact")}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright text-center py-4">
        &copy; 2024 Scape Booking. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
