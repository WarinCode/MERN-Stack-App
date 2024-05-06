import { string, func } from "prop-types";
import { MdKeyboardArrowRight } from "react-icons/md";

const NextButton = ({ text, handleClick }) => {
  return (
    <button className="btn btn-next" type="button" onClick={handleClick}>
      <span className="text">{text}</span>
      <span className="parent-of-icon">
        <MdKeyboardArrowRight className="icon" />
      </span>
    </button>
  );
};

NextButton.propTypes = {
  text: string,
  handleClick: func.isRequired,
};

NextButton.defaultProps = {
  text: "ถัดไป",
};

export default NextButton;
