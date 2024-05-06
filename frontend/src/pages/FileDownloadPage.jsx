import { useCallback } from "react";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Header from "../components/Header";
import Button from "../components/Button";
import { FaDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { notificationSettings } from "../data/data";
import { IoMdDownload } from "react-icons/io";

const FileDownloadPage = () => {
  const handleClick = useCallback(() => {
    setTimeout(() => {
      toast.success("ดาวโหลด์ไฟล์ฐานข้อมูลสำเร็จ!", notificationSettings);
    }, 2300);
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Sidebar />
      <Content id={"download"}>
        <Header
          title={"ดาวโหลด์ไฟล์ฐานข้อมูล"}
          icon={<FaDownload className="icon" />}
        />
        <p>
          เมื่อดาวโหลด์ไฟล์เสร็จให้เอาไฟล์ข้อมูลนั้น import เข้าไปในฐานข้อมูล
          MongoDB จะได้ข้อมูลสินค้าจริงๆอยู่ในเว็บไซต์
        </p>
        <img src="svgs/undraw_cloud_files_wmo8.svg" alt="download-img" />
        <a
          onClick={handleClick}
          href="db/data.json"
          target="_blank"
          download={"dbfile.json"}
        >
          <Button
            className={"btn-primary"}
            text={"คลิกเพื่อดาวโหลด์"}
            icon={<IoMdDownload className="icon" />}
          />
        </a>
      </Content>
    </Container>
  );
};

export default FileDownloadPage;
