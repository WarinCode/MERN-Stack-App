import { array } from "prop-types";
import uuid from "react-uuid";

const HeaderCells = ({ getArray }) => {
  return getArray.map((text) => <th key={uuid()}>{text}</th>);
};

HeaderCells.propTypes = {
  getArray: array.isRequired,
};

export default HeaderCells;
