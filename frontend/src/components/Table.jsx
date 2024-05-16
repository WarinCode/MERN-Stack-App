import { useState, useEffect, useMemo, useCallback } from "react";
import Loading from "./Loading";
import ConnectionFailedPage from "../pages/ConnectionFailedPage";
import Row from "./Row";
import HeaderCells from "./HeaderCells";
import BookItem from "./BookItem";
import NextButton from "./NextButton";
import BackButton from "./BackButton";
import CenterButton from "./CenterButton";
import Outstock from "./Outstock";
import { fetchBook } from "../utils/API";
import { notificationSettings, headerCells } from "../data/data";
import { ToastContainer, toast } from "react-toastify";
import uuid from "react-uuid";

const Table = () => {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);
  const { VITE_API_URL } = import.meta.env;
  const MAX_BOOK = 4;

  const formatArray = useCallback((array) => {
    const resultArray = {
      books: [],
      numbers: [],
      books2D: [],
      numbers2D: [],
    };
    for (let i = 0; i < array.length; i++) {
      resultArray.books.push(array[i]);
      resultArray.numbers.push(i + 1);
      if (resultArray.books.length === MAX_BOOK) {
        resultArray.books2D.push(resultArray.books);
        resultArray.numbers2D.push(resultArray.numbers);
        resultArray.books = [];
        resultArray.numbers = [];
      }
    }
    if (resultArray.books.length !== 0) {
      resultArray.books2D.push(resultArray.books);
      resultArray.numbers2D.push(resultArray.numbers);
    }
    return Object.values(resultArray).slice(2, 4);
  }, []);

  const firstRenderComponent = useCallback(async () => {
    setLoading(true);
    const data = await fetchBook(VITE_API_URL, "/data");
    if (data === null) {
      setIsConnectionFailed(true);
    } else {
      const [firstArray, secondArray] = formatArray(data);
      setBooks(firstArray);
      setNumbers(secondArray);
      setIsReady(true);
      setIsConnectionFailed(false);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    firstRenderComponent();
    return () => {
      setBooks([]);
      setNumbers([]);
      setLoading(false);
      setIsReady(false);
      setIsConnectionFailed(false);
    };
  }, []);

  useEffect(() => {
    if (isConnectionFailed) {
      toast.error("ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้!", notificationSettings);
    } else {
      setIsConnectionFailed(false);
    }
  }, [isConnectionFailed]);

  const handlePreviousPage = useCallback(() => {
    setIndex((prevIndex) => prevIndex - 1);
    // scroll(0, 0);
  }, []);

  const handleNextPage = useCallback(() => {
    setIndex((prevIndex) => prevIndex + 1);
    // scroll(0, 0);
  }, []);

  const handleFirstPage = useCallback(() => {
    setIndex(0);
    // scroll(0, 0);
  }, []);

  const handleLastPage = useCallback(() => {
    setBooks((array) => {
      let lastIndexOfArray = array.length - 1;
      setIndex(lastIndexOfArray);
      return array;
    });
    // scroll(0, 0);
  }, []);

  const allRemainingBooks = useMemo(() => {
    return [...books.flat().map((book) => book.remain)].reduce(
      (prev, current) => prev + current,
      0
    );
  }, [books]);

  const allBooks = useMemo(() => {
    return [...books.flat().map((book) => book)].length;
  }, [books]);

  if (loading) {
    return <Loading text={"กำลังโหลดข้อมูล ..."} />;
  } else if (isConnectionFailed) {
    return <ConnectionFailedPage />;
  } else if (books.length === 0 && !isConnectionFailed) {
    return <Outstock />;
  } else {
    return (
      <>
        <table>
          <ToastContainer />
          <caption>ตารางข้อมูลสินค้า</caption>
          <thead>
            <Row>
              <HeaderCells getArray={headerCells} />
            </Row>
          </thead>
          <tbody>
            {isReady &&
              books[index].map((item, idx) => (
                <Row key={uuid()} className="rows">
                  <BookItem {...item} number={numbers[index][idx]} />
                </Row>
              ))}
          </tbody>
          <tfoot>
            <Row>
              <td colSpan={3}>หนังสือ {allBooks} เล่ม</td>
              <td colSpan={3}>หนังสือเหลืออยู่ {allRemainingBooks} เล่ม</td>
            </Row>
          </tfoot>
        </table>
        <footer>
          {index !== 0 ? (
            <BackButton text={"ย้อนกลับ"} handleClick={handlePreviousPage} />
          ) : (
            <div className="btn btn-empty"></div>
          )}
          <CenterButton
            handleClick1={handleFirstPage}
            handleClick2={handleLastPage}
          /> 
          {index !== books.length - 1 ? (
            <NextButton text={"ถัดไป"} handleClick={handleNextPage} />
          ) : (
            <div className="btn btn-empty"></div>
          )}
        </footer>
      </>
    );
  }
};

export default Table;
