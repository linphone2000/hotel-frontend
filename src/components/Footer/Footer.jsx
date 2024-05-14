import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="text-white" id="footer-section">
      <div className="container mx-auto px-4 py-8 flex flex-wrap md:justify-between justify-center">
        <div className="footer-left">
          <h1 className="text-xl font-bold">Scape Booking</h1>
          <p className="text-base mt-2">
            A brief description of scape or what we do.
          </p>
          <div className="social-media mt-4">
            <a href="#" className="hover:text-white mr-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white mr-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-right flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <ul className="text-base list-none">
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/about")}>About Us</a>
            </li>
            <li>
              <a onClick={() => navigate("/hotels")}>Services</a>
            </li>
            <li>
              <a onClick={() => navigate("/about")}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright text-center py-4">
        &copy; 2024 Scape Booking. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
