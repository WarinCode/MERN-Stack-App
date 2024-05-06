import { useState, useRef } from "react";
import Container from "../components/Container";
import GridContainer from "../components/GridContainer";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { insertProduct } from "../utils/API";
import { FaBook } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import { inputList, notificationSettings } from "../data/data";
import { ToastContainer, toast } from "react-toastify";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = {
    productName: useRef(null),
    productPrice: useRef(null),
    ISBN: useRef(null),
    remain: useRef(null),
    author: useRef(null),
    img: useRef(null),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      productName: inputRef.productName.current.value,
      img: inputRef.img.current.value || "",
      author: inputRef.author.current.value || "",
      ISBN: parseInt(inputRef.ISBN.current.value),
      productPrice: parseInt(inputRef.productPrice.current.value),
      remain: parseInt(inputRef.remain.current.value),
    };
    setLoading(true);
    const acknowledged = await insertProduct(
      import.meta.env.VITE_API_URL,
      "/insert",
      newBook
    );
    setTimeout(() => {
      setLoading(false);
      if (acknowledged) {
        toast.success("เพิ่มหนังสือใหม่สำเร็จ", notificationSettings);
      }
    }, 1600);
  };

  return (
    <Container>
      <Sidebar />
      <ToastContainer />
      <Content id={"add"}>
        {loading ? (
          <Loading text={"กำลังเพิ่มข้อมูล ..."} />
        ) : (
          <form onSubmit={handleSubmit}>
            <Header
              title={"เพิ่มรายการสินค้า"}
              icon={<FaBook className="icon" />}
            />
            <GridContainer>
              {inputList.map((obj) => (
                <InputField
                  key={obj.id}
                  className={"grid-item"}
                  {...obj}
                  inputRef={inputRef[obj.id]}
                  setIsValid={setIsValid}
                />
              ))}
            </GridContainer>
            <footer>
              <Button
                className={"btn-submit"}
                text={"เพิ่มหนังสือใหม่"}
                icon={<MdOutlineAdd className="icon" />}
                buttonType={"submit"}
                isValid={isValid}
              />
            </footer>
          </form>
        )}
      </Content>
    </Container>
  );
};

export default AddProductPage;
