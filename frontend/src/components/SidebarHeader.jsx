import reactLogo from "../assets/react.svg";

const SidebarHeader = () => {
  return (
    <header className="project-profile">
      <img className="project-logo" src={reactLogo} alt="react-logo" />
      <h1 className="project-name">MERN-Stack-App</h1>
    </header>
  );
};

export default SidebarHeader;
