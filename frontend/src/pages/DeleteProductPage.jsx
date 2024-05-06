import { useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Searchbar from "../components/Searchbar";
import Book from "../components/Book";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import WaitingToSearch from "../components/WaitingToSearch";
import { searchProduct, deleteProduct } from "../utils/API";
import { ToastContainer, toast } from "react-toastify";
import { notificationSettings } from "../data/data";
import { MdFolderDelete } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DeleteProductPage = () => {
  const [product, setProduct] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(false);
  const ISBNRef = useRef(null);

  const { VITE_API_URL } = import.meta.env;

  const handleSubmit = useCallback(async (e) => {
    const ISBNNumber = ISBNRef.current.value;
    e.preventDefault();
    setLoading(true);
    setText("กำลังค้นหา ...");
    const productData = await searchProduct(
      VITE_API_URL,
      `/search?ISBN=${ISBNNumber}`
    );
    if (productData === null) {
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
      setProduct(productData);
      setSearchSuccessful(true);
    }
    setTimeout(() => setLoading(false), 1300);
  }, []);

  const handleDelete = useCallback(async (product) => {
    setLoading(true);
    setText("กำลังลบสินค้า ...");
    const path = `/delete-product/name=${product.productName}&ISBN=${product.ISBN}&id=${product._id}`;
    const deletedCount = await deleteProduct(VITE_API_URL, path);
    setTimeout(() => {
      if (deletedCount === 1) {
        setSearchSuccessful(false);
        toast.success("ลบสินค้าสำเร็จ", notificationSettings);
      } else {
        setSearchSuccessful(true);
        toast.error("ลบสินค้าไม่สำเร็จ", notificationSettings);
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
              title={"ลบรายการสินค้า"}
              icon={<MdFolderDelete className="icon" />}
            />
            {searchSuccessful ? (
              <>
                <Book {...product} />
                <Button
                  className={"btn-delete"}
                  text={"ลบสินค้า"}
                  icon={<RiDeleteBin5Fill className="icon" />}
                  isValid={isValid}
                  handleClick={() => handleDelete(product)}
                />
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
                <WaitingToSearch text={"ค้นหาสินค้าที่คุณต้องการจะลบ"} />
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default DeleteProductPage;
