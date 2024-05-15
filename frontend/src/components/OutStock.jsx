import WaitingToSearch from "./WaitingToSearch";

const OutStock = () => {
  return (
    <WaitingToSearch
      text={"ไม่มีสินค้าในฐานข้อมูลโปรดเพิ่มข้อมูลสินค้าก่อน"}
      path={"svgs/undraw_empty_re_opql.svg"}
    />
  );
};

export default OutStock;
