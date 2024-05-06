import DropdownItem from "./DropdownItem";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { dropdownList } from "../data/data";

const Dropdown = ({ isDropdown, setIsDropdown }) => {
  return (
    <div className="dropdown">
      <h3
        className="dropdown-heading"
        onClick={() => setIsDropdown(!isDropdown)}
      >
        ดำเนินการ{" "}
        <span>
          {isDropdown ? (
            <MdKeyboardArrowDown className="arrow-down" />
          ) : (
            <MdKeyboardArrowUp className="arrow-up" />
          )}
        </span>
      </h3>
      {isDropdown && (
        <ul className="dropdown-list">
          {dropdownList.map((item) => (
            <DropdownItem key={uuid()} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  isDropdown: PropTypes.bool.isRequired,
  setIsDropdown: PropTypes.func.isRequired,
};

export default Dropdown;
