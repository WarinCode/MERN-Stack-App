import { bool, func, object, string } from "prop-types";
import InputField from "./InputField";
import Button from "./Button";
import { IoSearchOutline } from "react-icons/io5";
import DataList from "./DataList";

const Searchbar = ({ isValid, setIsValid, inputRef, handleSubmit, dataListId }) => {
  return (
    <form action="#" onSubmit={handleSubmit}>
      <InputField
        id={"ISBN"}
        list={dataListId}
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
      <DataList id={dataListId}/>
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
  dataListId: string
};

export default Searchbar;
