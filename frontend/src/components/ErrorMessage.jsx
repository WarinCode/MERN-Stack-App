import PropTypes from "prop-types";

const ErrorMessage = ({ isError, message }) => {
  return (
    <input
      className="error-msg"
      type={isError ? "text" : "hidden"}
      disabled
      placeholder={message}
    />
  );
};

ErrorMessage.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
