import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import {
  FaCog,
  FaHistory,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserFriends,
  FaUserMd,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export function SideBar() {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useContext(AuthContext);

  return (
    <Sidebar id="sidebar-home">
      <div style={{ margin: 30, height: "60px" }}>
        <span
          style={{
            fontFamily: "Abril Fatface",
            fontSize: "xx-large",
            verticalAlign: "middle",
            textAnchor: "middle",
          }}
        >
          Money Tracker
        </span>
      </div>

      <Menu>
        <MenuItem icon={<FaHome />} onClick={() => navigate("/")}>
          Home
        </MenuItem>
        <MenuItem
          icon={<FaHistory />}
          onClick={() => navigate("/transactions")}
        >
          Transactions
        </MenuItem>
        <SubMenu label={"Users"} icon={<FaUser />}>
          <MenuItem
            icon={<FaUserFriends />}
            onClick={() => navigate("/friends")}
          >
            Friends
          </MenuItem>
          <MenuItem
            icon={<FaUserMd />}
            onClick={() => navigate("/transaction-users")}
          >
            Transaction Users
          </MenuItem>
        </SubMenu>
        <SubMenu
          label={
            <div>
              <div style={{ fontWeight: 500 }}>{currentUser?.username}</div>
            </div>
          }
          icon={
            <div style={{ padding: 4 }}>
              <FaCog />
            </div>
          }
        >
          <MenuItem icon={<FaSignOutAlt />} onClick={logoutUser}>
            Logout
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
