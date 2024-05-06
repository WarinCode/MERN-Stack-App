import { useRef } from "react";
import { string, number } from "prop-types";
import { handleError } from "../utils/functions";

const Book = ({
  _id,
  productName,
  productPrice,
  ISBN,
  remain,
  author,
  img,
}) => {
  const imgRef = useRef(null);

  return (
    <div className="book-card" id={_id}>
      <div className="parent-of-card-img">
        <img
          className="card-img"
          src={img}
          alt="ไม่มีรูปภาพ"
          loading="lazy"
          ref={imgRef}
          onError={() => handleError(imgRef)}
        />
      </div>
      <div className="line"></div>
      <div className="card-details">
        <h3>
          สินค้า: <span>{productName}</span>
        </h3>
        <h3>
          ราคา: <span>{productPrice}</span>
        </h3>
        <h3>
          ISBN: <span>{ISBN}</span>
        </h3>
        <h3>
          เหลือจำนวน: <span>{remain}</span>
        </h3>
        <h3>
          ชื่อผู้เขียน:{" "}
          <span>{author === "" || author.length === 0 ? "-" : author}</span>
        </h3>
      </div>
    </div>
  );
};

Book.propTypes = {
  _id: string.isRequired,
  productName: string.isRequired,
  productPrice: number.isRequired,
  ISBN: number.isRequired,
  remain: number.isRequired,
  author: string.isRequired,
  img: string.isRequired,
};

export default Book;
