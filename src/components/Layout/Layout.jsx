import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import AdminHeader from "../Header/AdminHeader";

const Layout = () => {
  return (
    <>
      {/*Dapat mamimili ng header pag nag login its either 
  admin header pag admin nag login and normal na Header pag customer
  ang nag login 
  
  Palitan mo nalang yung header pag gusto mo makita yung admin header
  
  */}
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
