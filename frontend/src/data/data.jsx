import ProductTablePage from "../pages/ProductTablePage";
import About from "../pages/About";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import DeleteProductPage from "../pages/DeleteProductPage";
import FileDownloadPage from "../pages/FileDownloadPage";
import ProductSalesPage from "../pages/ProductSalesPage";
import ProductSalesHistoryPage from "../pages/ProductSalesHistoryPage";
import JSONFileImportPage from "../pages/JSONFileImportPage";
import SearchProductPage from "../pages/SearchProductPage";
import NotFoundPage from "../pages/NotFoundPage";

import { ImTable2 } from "react-icons/im";
import { RiPlayListAddFill } from "react-icons/ri";
import {
  MdOutlineEditNote,
  MdOutlineAttachMoney,
  MdManageSearch,
  MdHistory,
} from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { Bounce } from "react-toastify";

export const headerCells = [
  "ลำดับ",
  "ชื่อหนังสือ",
  "รูปภาพ",
  "ISBN",
  "ราคา",
  "จำนวน",
];
export const routes = [
  {
    path: "/",
    element: <About />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/view-table",
    element: <ProductTablePage />,
  },
  {
    path: "/add-product",
    element: <AddProductPage />,
  },
  {
    path: "/edit-product",
    element: <EditProductPage />,
  },
  {
    path: "/delete-product",
    element: <DeleteProductPage />,
  },
  {
    path: "/download",
    element: <FileDownloadPage />,
  },
  {
    path: "/sale",
    element: <ProductSalesPage />,
  },
  {
    path: "/log",
    element: <ProductSalesHistoryPage />,
  },
  {
    path: "/input-json-file",
    element: <JSONFileImportPage />,
  },
  {
    path: "/search",
    element: <SearchProductPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const dropdownList = [
  {
    title: "ค้นหาสินค้า",
    icon: <MdManageSearch className="icon search-icon" />,
    path: "/search",
  },
  {
    title: "ดูตารางสินค้า",
    icon: <ImTable2 className="icon table-icon" />,
    path: "/view-table",
  },
  {
    title: "เพิ่มรายการสินค้า",
    icon: <RiPlayListAddFill className="icon add-icon" />,
    path: "/add-product",
  },
  {
    title: "แก้ไขรายการสินค้า",
    icon: <MdOutlineEditNote className="icon edit-icon" />,
    path: "/edit-product",
  },
  {
    title: "ลบรายการสินค้า",
    icon: <BsFillTrash3Fill className="icon delete-icon" />,
    path: "/delete-product",
  },
  {
    title: "นำเข้าไฟล์ข้อมูล JSON",
    icon: <VscJson className="icon input-icon" />,
    path: "/input-json-file",
  },
];

export const inputList = [
  {
    labelname: "ชื่อหนังสือ:",
    inputType: "text",
    id: "productName",
    placeholder: "ป้อนชื่อหนังสือ",
    inputOptions: {
      minLength: 3,
      maxLength: 100,
      required: true,
      name: "productName",
    },
  },
  {
    labelname: "ราคาหนังสือ:",
    inputType: "number",
    id: "productPrice",
    placeholder: "ป้อนราคาหนังสือ",
    inputOptions: {
      min: 100,
      max: 10000,
      required: true,
      name: "productPrice",
    },
  },
  {
    labelname: "หมายเลข ISBN:",
    inputType: "number",
    id: "ISBN",
    placeholder: "ป้อนหมายเลข ISBN",
    inputOptions: {
      required: true,
      name: "ISBN",
    },
  },
  {
    labelname: "จำนวนหนังสือที่ขาย:",
    inputType: "number",
    id: "remain",
    placeholder: "ป้อนเลขจำนวนเต็มของหนังสือ",
    inputOptions: {
      min: 1,
      max: 500,
      defaultValue: 100,
      required: true,
      name: "remain",
    },
  },
  {
    labelname: "ชื่อผู้เขียน:",
    inputType: "text",
    id: "author",
    placeholder: "ป้อนชื่อผู้เขียน (ถ้าไม่มีให้เว้นว่างไว้)",
    inputOptions: {
      required: false,
      name: "author",
    },
  },
  {
    labelname: "ลิ้งค์รูปภาพหนังสือ:",
    inputType: "url",
    id: "img",
    placeholder: "ป้อนลิ้งรูปภาพหนังสือ (ถ้าไม่มีให้เว้นว่างไว้)",
    inputOptions: {
      required: false,
      name: "img",
    },
  },
];

export const notificationSettings = {
  position: "top-right",
  autoClose: 2700,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const menuItemList = [
  {
    path: "/about",
    text: "รายละเอียดเกี่ยวกับโปรเจค",
  },
  {
    path: "/download",
    text: "ดาวโหลด์ไฟล์ฐานข้อมูล",
  },
];
