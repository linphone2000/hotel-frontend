import "./Footer.css";

const Footer = () => {
  return (
    <footer className="" id="footer-section">
      <hr className="bg-slate-300 m-10"></hr>
      <div className="container mx-auto px-4 py-8 flex flex-wrap md:justify-between justify-center">
        <div className="footer-left">
          <h1 className="text-xl font-bold text-gray-500">Scape Booking</h1>
          <p className="text-gray-400 text-base mt-2">
            A brief description of scape or what we do.
          </p>
          <div className="social-media mt-4">
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-right flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-gray-500">Navigation</h3>
          <ul className="text-gray-400 text-base list-none">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright text-center text-gray-400 py-4">
        &copy; 2024 Scape Booking. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
