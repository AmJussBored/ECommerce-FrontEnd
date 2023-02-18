import React, { useRef, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import "./adminHeader.css";

import { motion } from "framer-motion";

import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";


const nav_links = [
  {
    display: "User Management",
    path: "/userlist",
  },
  {
    display: "Product Management",
    path: "/productdashboard",
  },
  {
    display: "Order Management",
    path: "/orderlist",
  },
];

const AdminHeader = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });



  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  return (
    <header className="adminheader" ref={headerRef}>
      <Container>
        <Row>
          <div className="upper_part">
            <div className="logo">
              <i class="ri-store-2-line"></i>
              <div>
                <h1>ShopEase</h1>
              </div>
            </div>
            <div className="title">
              <h2>Administrator Dashboard</h2>
            </div>
            {/* Icons from remix icon  https://remixicon.com/ */}
            <div className="nav_icons">
              <span>
                {/*Animation when clicking icon*/}
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
              </span>
              <div className="mobile_menu">
                <motion.span whileTap={{ scale: 1.2 }} onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </motion.span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <div className="lower_part" ref={menuRef} onClick={menuToggle}>
        <ul className="menu">
          {/*iterate nav_links*/}
          {nav_links.map((item, index) => (
            <li className="nav_items" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav_active" : ""
                }
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default AdminHeader;
