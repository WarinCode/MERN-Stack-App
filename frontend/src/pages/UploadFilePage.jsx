import { useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { BsFiletypeJson } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";

const UploadFilePage = () => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const fileRef = useRef(null);
  const { VITE_API_URL } = import.meta.env;

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
              <Link to={"/download"} className="link">
                ดาวโหลด์ไฟล์ฐานข้อมูล
              </Link>
              แล้วนำไฟล์นั้นอัปโหลดเข้าสู่ฐานข้อมูล
              <span style={{ color: "red", marginLeft: "3px" }}>
                (ถ้าไม่สามารถอัปโหลดไฟล์ๆได้ให้เปลี่ยนไปใช้โปรแกรม MongoDBCompass แทน
                แล้วอัปโหลดไฟล์ข้อมูลเข้าไป)
              </span>
            </p>
            <form
              method="POST"
              action={VITE_API_URL + "/upload"}
              enctype="multipart/form-data"
            >
              <InputField
                inputType={"file"}
                id={"dbfile"}
                placeholder={"อัปโหลดไฟล์"}
                inputRef={fileRef}
                setIsValid={setIsValid}
                inputOptions={{
                  required: true,
                  name: "dbfile",
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

export default UploadFilePage;
