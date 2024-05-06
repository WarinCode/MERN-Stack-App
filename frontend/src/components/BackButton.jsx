import { string, func } from "prop-types";
import { MdKeyboardArrowLeft } from "react-icons/md";

const BackButton = ({ text, handleClick }) => {
  return (
    <button className="btn btn-back" type="button" onClick={handleClick}>
      <span className="parent-of-icon">
        <MdKeyboardArrowLeft className="icon" />
      </span>
      <span className="text">{text}</span>
    </button>
  );
};

BackButton.propTypes = {
  text: string,
  handleClick: func.isRequired,
};

BackButton.defaultProps = {
  text: "ถอยกลับ",
};

export default BackButton;
