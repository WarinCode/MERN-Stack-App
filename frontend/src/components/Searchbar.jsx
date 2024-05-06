import { bool, func, object } from "prop-types";
import InputField from "./InputField";
import Button from "./Button";
import { IoSearchOutline } from "react-icons/io5";

const Searchbar = ({ isValid, setIsValid, inputRef, handleSubmit }) => {
  return (
    <form action="#" onSubmit={handleSubmit}>
      <InputField
        id={"ISBN"}
        inputType={"number"}
        inputRef={inputRef}
        labelname={"ค้นหาสินค้าด้วยหมายเลข ISBN"}
        placeholder={"ป้อนหมายเลข ISBN"}
        setIsValid={setIsValid}
        inputOptions={{
          name: "ISBN",
          required: true,
        }}
      />
      <Button
        className={"btn-submit"}
        buttonType={"submit"}
        isValid={isValid}
        text={"ค้นหา"}
        icon={<IoSearchOutline className="icon" />}
      />
    </form>
  );
};

Searchbar.propTyps = {
  isValid: bool,
  setIsValid: func,
  inputRef: object,
  handleSubmit: func,
};

export default Searchbar;
