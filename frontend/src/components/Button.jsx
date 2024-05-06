import { string, element, bool, func } from "prop-types";

const Button = ({
  className,
  text,
  icon,
  buttonType,
  isValid,
  handleClick,
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={buttonType}
      onClick={handleClick}
      disabled={!isValid}
    >
      <span className="parent-of-icon">{icon}</span>
      <span className="text">{text}</span>
    </button>
  );
};

Button.propTypes = {
  className: string.isRequired,
  text: string.isRequired,
  icon: element.isRequired,
  buttonType: string,
  isValid: bool,
  handleClick: func,
};

Button.defaultProps = {
  isValid: undefined,
  handleClick: undefined,
  buttonType: "button",
};

export default Button;
