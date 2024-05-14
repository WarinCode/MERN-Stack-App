import { useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { uploadFile } from "../utils/API";
import { BsFiletypeJson } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";

const JSONFileImportPage = () => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const fileRef = useRef(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    // setLoading(true);
    const jsonFile = fileRef.current.value;
    // await uploadFile(
    //   import.meta.env.VITE_API_URL,
    //   "/upload",
    //   { file: new URL(jsonFile) }
    // );
    // setTimeout(() => {
    //   if (acknowledged) {
    //   } else {
    //   }
    //   setLoading(false);
    // }, 1300);
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content id="upload">
        {loading ? (
          <Loading text={"กำลังอัปโหลดไฟล์ ..."} />
        ) : (
          <>
            <Header
              title={"นำเข้าไฟล์ข้อมูล JSON"}
              icon={<BsFiletypeJson className="icon" />}
            />
            <p>
              ให้อัปโหลดไฟล์ที่ดาวน์โหลดจากหน้า{" "}
              <Link to={"/download"} className="link">ดาวโหลด์ไฟล์ฐานข้อมูล</Link>
              แล้วนำไฟล์นั้นอัปโหลดเข้าสู่ฐานข้อมูล
            </p>
            <form onSubmit={handleSubmit}>
              <InputField
                inputType={"file"}
                id={"jsonFile"}
                placeholder={"อัปโหลดไฟล์"}
                inputRef={fileRef}
                setIsValid={setIsValid}
                inputOptions={{
                  required: true,
                  name: "jsonFile",
                  accept: ".json",
                }}
              />
              <Button
                className={"btn-submit"}
                buttonType={"submit"}
                text={"อัปโหลดไฟล์"}
                icon={<FaUpload className="icon" />}
                isValid={isValid}
              />
            </form>
          </>
        )}
      </Content>
    </Container>
  );
};

export default JSONFileImportPage;
