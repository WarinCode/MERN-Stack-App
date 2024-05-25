import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { fetchISBNs } from "../utils/API";
import uuid from "react-uuid";

const DataList = ({ id }) => {
  const [ISBNs, setISBNs] = useState([]);

  useEffect(() => {
    const { VITE_API_URL } = import.meta.env;
    (async () => {
        const ISBNData = await fetchISBNs(VITE_API_URL, "/get-all-isbns");
        setISBNs(ISBNData);
    })();

    return () => {
        setISBNs([]);
    };
  }, []);

  return (
    <datalist id={id}>
      {ISBNs.map((ISBN) => (
        <option key={uuid()} value={ISBN}>
          {ISBN}
        </option>
      ))}
    </datalist>
  );
};

DataList.propTypes = {
  id: propTypes.string.isRequired,
};

export default DataList;
