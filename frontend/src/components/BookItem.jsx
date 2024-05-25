import { string, number } from "prop-types";
import { useRef } from "react";
import { handleError } from "../utils/functions";
import ViewImage from "./ViewImage";

const BookItem = ({ productName, productPrice, img, ISBN, remain, number }) => {
  const imgRef = useRef(null);

  return (
    <>
      <td className="number">{number}</td>
      <td className="product-name">{productName}</td>
      <td className="parent-of-product-img">
        <ViewImage
          element={
            <img
              src={img}
              className="product-img"
              alt="ไม่มีรูปภาพ"
              loading="lazy"
              ref={imgRef}
              onError={() => handleError(imgRef)}
            />
          }
          src={img}
        />
      </td>
      <td className="ISBN">{ISBN}</td>
      <td className="product-price">{productPrice} บาท</td>
      <td className="product-remain">{remain} เล่ม</td>
    </>
  );
};

BookItem.propTypes = {
  productName: string.isRequired,
  productPrice: number.isRequired,
  img: string.isRequired,
  ISBN: number.isRequired,
  remain: number.isRequired,
  number: number.isRequired,
};

export default BookItem;
