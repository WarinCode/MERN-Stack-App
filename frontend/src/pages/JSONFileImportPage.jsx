import Container from "../components/Container";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

const JSONFileImportPage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <div>หน้านำเข้าไฟล์ฐานข้อมูล</div>
      </Content>
    </Container>
  );
};

export default JSONFileImportPage;
