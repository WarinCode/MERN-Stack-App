import { string, object } from "prop-types";
import ReactLoading from "react-loading";

const Loading = ({ text, otherProps }) => {
  return (
    <div className="parent-loading">
      <ReactLoading
        className="loading"
        type={"bars"}
        color={"#1b7dff"}
        width={"350px"}
        height={"350px"}
        {...otherProps}
      />
      <h1>{text}</h1>
    </div>
  );
};

Loading.propTypes = {
  text: string.isRequired,
  otherProps: object,
};

export default Loading;
