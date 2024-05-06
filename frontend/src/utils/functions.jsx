export const isEmptyString = (input) => input.length === 0;
export const isBlank = (input) => input.charAt(0) === " ";
export const isSpecialSymbol = (input) =>
  [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "'",
    "-",
    "_",
    "]",
    "[",
    "|",
    "\\",
    "/",
  ].includes(input.charAt(0));
export const handleError = (imgRef) => {
  imgRef.current.src = "imgs/thumbs-noimage.webp";
  imgRef.current.className += " no-img";
  imgRef.current.title = "ไม่มีรูปภาพหนังสือให้แสดง";
};
