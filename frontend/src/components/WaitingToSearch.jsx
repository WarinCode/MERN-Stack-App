import { string } from "prop-types";

const WaitingToSearch = ({ text, path }) => {
  return (
    <div className="waiting-to-search">
      <img src={path} alt="search-img" loading="lazy" />
      <h2>{text}</h2>
    </div>
  );
};

WaitingToSearch.propTypes = {
  text: string.isRequired,
  path: string,
};

WaitingToSearch.defaultProps = {
  path: "svgs/undraw_web_search_re_efla.svg",
};

export default WaitingToSearch;
