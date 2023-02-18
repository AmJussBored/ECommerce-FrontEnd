import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Userlist from "../pages/Userlist";
import ProductDashboard from "../pages/ProductDashboard";
import Orderlist from "../pages/Orderlist";

const routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:productID" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/orderlist" element={<Orderlist />} />
      <Route path="/productdashboard" element={<ProductDashboard />} />
      <Route path="/userlist" element={<Userlist />} />
    </Routes>
  );
};

export default routers;
