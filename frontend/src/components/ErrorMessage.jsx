import PropTypes from "prop-types";

const ErrorMessage = ({ isError, message }) => {
  return (
    <input
      className="error-msg"
      type={"text"}
      placeholder={isError && message}
      disabled
      readOnly
    />
  );
};

ErrorMessage.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
