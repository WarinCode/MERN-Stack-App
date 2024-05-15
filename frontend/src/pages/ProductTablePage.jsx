import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Table from "../components/Table";

const ProductTablePage = () => {
  return (
    <Container>
      <Sidebar />
      <Content id={"table"}>
        <Table />
      </Content>
    </Container>
  );
};

export default ProductTablePage;
