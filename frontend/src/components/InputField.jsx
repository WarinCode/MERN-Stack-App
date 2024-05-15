import { useReducer, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { string, func, object } from "prop-types";
import { isEmptyString, isSpecialSymbol, isBlank } from "../utils/functions";

const initialState = { message: "", isError: false };

const InputField = ({
  className,
  labelname,
  id,
  inputType,
  placeholder,
  inputOptions,
  inputRef,
  setIsValid,
}) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "check-productName":
        if (inputRef.current.value.length < 3) {
          state = {
            message: "ชื่อหนังสือต้องมีความยาวอย่างน้อย 3 ตัวอักษร!",
            isError: true,
          };
          return state;
        } else if (isSpecialSymbol(inputRef.current.value)) {
          state = {
            message:
              "ห้ามใช้ตัวเลขหรือตัวอักษรพิเศษตั้งนำหน้าชื่อหนังสือเป็นตัวแรก!",
            isError: true,
          };
          return state;
        } else if (isBlank(inputRef.current.value)) {
          state = {
            message: "คำแรกห้ามใส่เว้นว่าง!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-productPrice":
        if (parseInt(inputRef.current.value) <= 0) {
          state = {
            message: "ราคาหนังสือต้องเป็นเลขจำนวนเต็มบวก!",
            isError: true,
          };
          return state;
        } else if (
          parseInt(inputRef.current.value) < 100 ||
          parseInt(inputRef.current.value) > 10000
        ) {
          state = {
            message:
              "ราคาหนังสือต้องตั้งราคาอยู่ในช่วงระหว่าง 100 - 10,000 บาทเท่านั้น!",
            isError: true,
          };
          return state;
        } else if (isEmptyString(inputRef.current.value)) {
          state = {
            message: "ต้องตั้งราคาหนังสือ!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-ISBN":
        if (isEmptyString(inputRef.current.value)) {
          state = {
            message: "ต้องใส่หมายเลข ISBN!",
            isError: true,
          };
          return state;
        } else if (inputRef.current.value.length !== 13) {
          state = {
            message: "หมายเลข ISBN ต้องมีจำนวนตัวเลขทั้งหมด 13 หลักเท่านั้น!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-remain":
        if (parseInt(inputRef.current.value) <= 0) {
          state = {
            message: "จำนวนหนังสือที่ขายต้องเป็นเลขจำนวนเต็มบวก!",
            isError: true,
          };
          return state;
        } else if (parseInt(inputRef.current.value) > 500) {
          state = {
            message: "จำนวนหนังสือที่ขายสามารถมีได้ไม่เกิน 500 เล่มเท่านั้น!",
            isError: true,
          };
          return state;
        } else if (isEmptyString(inputRef.current.value)) {
          state = {
            message: "ต้องกำหนดจำนวนสินค้า!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-author":
        if (isEmptyString(inputRef.current.value)) {
          state = {
            message: "ต้องใส่ชื่อผู้เขียน!",
            isError: true,
          };
          return state;
        } else if (isSpecialSymbol(inputRef.current.value)) {
          state = {
            message:
              "ห้ามใช้ตัวเลขหรือตัวอักษรพิเศษตั้งนำหน้าชื่อผู้เขียนหนังสือเป็นตัวแรก!",
            isError: true,
          };
          return state;
        } else if (isBlank(inputRef.current.value)) {
          state = {
            message: "คำแรกห้ามใส่เว้นว่าง!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-img":
        if (isEmptyString(inputRef.current.value)) {
          state = {
            message: "ต้องใส่ลิ้งค์รูปภาพหนังสือ!",
            isError: true,
          };
          return state;
        } else if (isBlank(inputRef.current.value)) {
          state = {
            message: "คำแรกห้ามใส่เว้นว่าง!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      case "check-dbfile":
        if (!String(inputRef.current.value).includes(".json")) {
          state = {
            message: "ต้องอัปโหลดไฟล์ที่เป็น .json เท่านั้น!",
            isError: true,
          };
          return state;
        } else {
          return initialState;
        }
      default:
        return initialState;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setIsValid(state.isError ? false : true);
  }, [state]);

  return (
    <div className={`input-field ${className}`}>
      <label htmlFor={id}>{labelname}</label>
      <input
        className={state.isError ? "input-error" : ""}
        type={inputType}
        id={id}
        placeholder={placeholder}
        ref={inputRef}
        error={initialState.isError ? "true" : "false"}
        // onClick={() => {
        //   if(inputRef.current.id === "dbfile"){
        //     dispatch({ type: "" })
        //   }
        // }}
        onFocus={() => dispatch({ type: `check-${id}` })}
        onChange={() => dispatch({ type: `check-${id}` })}
        onBlur={() => {
          if (
            isEmptyString(inputRef.current.value) &&
            (id === "author" || id === "img")
          ) {
            dispatch({ type: "" });
          }
        }}
        autoComplete="off"
        autoSave="false"
        aria-autocomplete="none"
        {...inputOptions}
      />
      <ErrorMessage {...state} />
    </div>
  );
};

InputField.propTypes = {
  className: string,
  labelname: string,
  id: string,
  inputType: string.isRequired,
  placeholder: string.isRequired,
  inputOptions: object,
  inputRef: object,
  setIsValid: func,
};
export default InputField;
