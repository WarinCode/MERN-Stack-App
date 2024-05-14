import { useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Searchbar from "../components/Searchbar";
import GridContainer from "../components/GridContainer";
import InputField from "../components/InputField";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import WaitingToSearch from "../components/WaitingToSearch";
import { inputList } from "../data/data";
import { search, update } from "../utils/API";
import { MdModeEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { notificationSettings } from "../data/data";
import { RiFileEditFill } from "react-icons/ri";

const EditProductPage = () => {
  const [book, setBook] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(false);
  const ISBNRef = useRef(null);
  const inputRef = {
    productName: useRef(null),
    productPrice: useRef(null),
    ISBN: useRef(null),
    remain: useRef(null),
    author: useRef(null),
    img: useRef(null),
  };
  const { VITE_API_URL } = import.meta.env;

  const handleSubmit = useCallback(async (e) => {
    const ISBNNumber = ISBNRef.current.value;
    e.preventDefault();
    setLoading(true);
    setText("กำลังค้นหา ...");
    const bookData = await search(
      VITE_API_URL,
      `/search?ISBN=${ISBNNumber}`
    );
    if (bookData === null) {
      setSearchSuccessful(false);
      setTimeout(
        () =>
          toast.warn(
            `ไม่มีสินค้าที่มีเลขรหัส ${ISBNNumber} นี้อยู่ในฐานข้อมูล!`,
            notificationSettings
          ),
        1500
      );
    } else {
      setBook(bookData);
      setSearchSuccessful(true);
    }
    setTimeout(() => setLoading(false), 1300);
  }, []);

  const handleUpdate = useCallback(async (e, product) => {
    e.preventDefault();
    setLoading(true);
    setText("กำลังแก้ไข ...");
    const updateBook = {
      _id: product._id,
      productName: inputRef.productName.current.value,
      productPrice: parseInt(inputRef.productPrice.current.value),
      ISBN: parseInt(inputRef.ISBN.current.value),
      remain: parseInt(inputRef.remain.current.value),
      author: inputRef.author.current.value,
      img: inputRef.img.current.value,
    };
    const modifiedCount = await update(
      VITE_API_URL,
      "/update",
      updateBook
    );
    setTimeout(() => {
      if (modifiedCount === 1) {
        setSearchSuccessful(false);
        toast.success("แก้ไขสินค้าสำเร็จ", notificationSettings);
      } else {
        setSearchSuccessful(true);
        toast.error("แก้ไขสินค้าไม่สำเร็จ", notificationSettings);
      }
      setLoading(false);
    }, 1300);
  }, []);

  return (
    <Container>
      <Sidebar />
      <ToastContainer />
      <Content id={"delete"}>
        {loading ? (
          <Loading text={text} />
        ) : (
          <>
            <Header
              title={"แก้ไขรายการสินค้า"}
              icon={<RiFileEditFill className="icon" />}
            />
            {searchSuccessful ? (
              <>
                <form onSubmit={(e) => handleUpdate(e, book)}>
                  <GridContainer>
                    {inputList.map((item) => (
                      <InputField
                        key={item.id}
                        className={"grid-item"}
                        {...item}
                        inputRef={inputRef[item.id]}
                        setIsValid={setIsValid}
                        inputOptions={{
                          defaultValue: book[item.id],
                          name: item.id,
                        }}
                      />
                    ))}
                  </GridContainer>
                  <div className="parent-of-button">
                    <Button
                      buttonType={"submit"}
                      className={"btn-edit"}
                      text={"แก้ไขสินค้า"}
                      icon={<MdModeEdit className="icon" />}
                      isValid={isValid}
                    />
                  </div>
                </form>
                <footer>
                  <BackButton handleClick={() => setSearchSuccessful(false)} />
                </footer>
              </>
            ) : (
              <>
                <Searchbar
                  isValid={isValid}
                  setIsValid={setIsValid}
                  inputRef={ISBNRef}
                  handleSubmit={handleSubmit}
                />
                <WaitingToSearch
                  text={"ค้นหาสินค้าที่คุณต้องการจะแก้ไข"}
                  path={"svgs/undraw_file_searching_re_3evy.svg"}
                />
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default EditProductPage;
