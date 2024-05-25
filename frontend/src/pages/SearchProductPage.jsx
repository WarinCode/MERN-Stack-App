import { useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Header from "../components/Header";
import Loading from "../components/Loading";
import BookDetail from "../components/BookDetail";
import WaitingToSearch from "../components/WaitingToSearch";
import BackButton from "../components/BackButton";
import { search } from "../utils/API";
import { MdSearch } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { notificationSettings } from "../data/data";

const SearchProductPage = () => {
  const [book, setBook] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(false);
  const ISBNRef = useRef(null);
  const { VITE_API_URL } = import.meta.env;

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const path = `/search?ISBN=${ISBNRef.current.value}`;
    const data = await search(VITE_API_URL, path);
    setTimeout(() => {
      if (data === null) {
        setSearchSuccessful(false);
        toast.error("ไม่พบสินค้าชิ้นนี้ในฐานข้อมูล!", notificationSettings);
      } else {
        setSearchSuccessful(true);
        toast.info("มีสินค้าชิ้นนี้อยู่ในฐานข้อมูล", notificationSettings);
        setBook(data);
      }
      setLoading(false);
    }, 1300);
  }, []);

  return (
    <Container>
      <Sidebar />
      <ToastContainer />
      <Content id={"search"}>
        {loading ? (
          <Loading text={"กำลังค้นหา ..."} />
        ) : (
          <>
            <Header
              title={"ค้นหาสินค้า"}
              icon={<MdSearch className="icon" />}
            />
            {searchSuccessful ? (
              <>
                <BookDetail {...book} />
                <footer>
                  <BackButton
                    text={"กลับไปค้นหา"}
                    handleClick={() => setSearchSuccessful(false)}
                  />
                </footer>
              </>
            ) : (
              <>
                <Searchbar
                  isValid={isValid}
                  setIsValid={setIsValid}
                  inputRef={ISBNRef}
                  handleSubmit={handleSubmit}
                  dataListId={"ISBNList"}
                />
                <WaitingToSearch
                  text={
                    "ค้นหาสินค้าเพื่อดูรายละเอียดสินค้าหรือตรวจเช็คว่ามีสินค้าชิ้นนั้นอยู่ในฐานข้อมูล"
                  }
                  path={"svgs/undraw_location_search_re_ttoj.svg"}
                />
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default SearchProductPage;
