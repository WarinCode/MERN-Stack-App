import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { string, element } from "prop-types";

const DropdownItem = ({ title, icon, path }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="dropdown-item"
      onMouseMove={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Link to={path} className="inside-link-item">
        <span className="dropdown-item1">
          <span>{icon}</span>
          <p>{title}</p>
        </span>
        <span className="dropdown-item2">
          {isHover && <MdKeyboardArrowRight className="icon" />}
        </span>
      </Link>
    </li>
  );
};

DropdownItem.propTypes = {
  title: string.isRequired,
  icon: element.isRequired,
  path: string.isRequired,
};

export default DropdownItem;
