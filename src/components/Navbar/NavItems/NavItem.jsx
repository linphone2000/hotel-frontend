import { useNavigate } from "react-router-dom";

const NavItem = ({ handleNavigation, route, children, ...props }) => {
  const navigate = useNavigate();
  return (
    <li className="!mr-0">
      <a
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          handleNavigation();
          navigate(route);
        }}
        {...props}
      >
        {children}
      </a>
    </li>
  );
};

export default NavItem;
