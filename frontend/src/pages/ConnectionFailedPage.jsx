import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConnectionFailedPage = () => {
  return (
    <div id="connection-failed">
      <ToastContainer />
      <img
        src="svgs/undraw_server_down_s-4-lk.svg"
        alt="connection-failed-img"
      />
      <h3>การเชื่อมต่อกับฐานข้อมูลล้มเหลว!</h3>
    </div>
  );
};

export default ConnectionFailedPage;
