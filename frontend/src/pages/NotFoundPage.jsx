import Container from "../components/Container";
import Content from "../components/Content";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container>
      <Content id={"not-fount"}>
        <img src="svgs/undraw_back_home_nl-5-c.svg" alt="dfesd" />
        <h2>ไม่พบหน้าเพจที่คุณเรียกหา</h2>
        <Link className="link" to={"/"}>กลับหน้าหลัก</Link>
      </Content>
    </Container>
  );
};

export default NotFoundPage;
