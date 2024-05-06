import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import Menubar from "./Menubar";
import MenuItem from "./MenuItem";
import Dropdown from "./Dropdown";
import SidebarFooter from "./SidebarFooter";
import { menuItemList } from "../data/data";
import uuid from "react-uuid";

const Sidebar = () => {
  const [isDropdown, setIsDropdown] = useState(true);

  return (
    <aside className="sidebar">
      <SidebarHeader />
      <Menubar>
        {menuItemList.map((item) => (
          <MenuItem key={uuid()} {...item} />
        ))}
        <li className="menu-item">
          <Dropdown isDropdown={isDropdown} setIsDropdown={setIsDropdown} />
        </li>
      </Menubar>
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
