import PropTypes, { element } from "prop-types";

const GridContainer = ({ children }) => {
  return (
    <section className="grid-container">{children}</section>
  )
}

GridContainer.propTypes = {
  children: PropTypes.arrayOf(element).isRequired
}

export default GridContainer;
