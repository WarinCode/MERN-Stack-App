import Container from "../components/Container";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

const EmptyPage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>ไม่มีสินค้าอยู่</Content>
    </Container>
  );
};

export default EmptyPage;
