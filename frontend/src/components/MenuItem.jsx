import { Link } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { string } from "prop-types";

const MenuItem = ({ path, text }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="menu-item"
      onMouseMove={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Link to={path} className="inside-link-item">
        {text}{" "}
        <span>{isHover && <MdKeyboardArrowRight className="icon" />}</span>
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  path: string,
  text: string,
};

export default MenuItem;
