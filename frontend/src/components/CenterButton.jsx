import { string, func } from "prop-types";

const BackButton = ({ text1, text2, handleClick1, handleClick2 }) => {
  return (
    <div className="btn-group">
      <button className="btn btn-center" type="button" onClick={handleClick1}>
        <span className="text">{text1}</span>
      </button>
      <button className="btn btn-center" type="button" onClick={handleClick2}>
        <span className="text">{text2}</span>
      </button>
    </div>
  );
};

BackButton.propTypes = {
  text1: string,
  text2: string,
  handleClick1: func.isRequired,
  handleClick2: func.isRequired,
};

BackButton.defaultProps = {
  text1: "หน้าแรก",
  text2: "หน้าสุดท้าย",
};

export default BackButton;
