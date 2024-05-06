import { element, string } from "prop-types";

const Header = ({ title, icon }) => {
  return (
    <header className="header">
      <span className="parent-of-icon">{icon}</span>
      <h1 className="title">{title}</h1>
      <div className="bottom-line"></div>
    </header>
  );
};

Header.propTypes = {
  title: string.isRequired,
  icon: element.isRequired,
};

export default Header;
