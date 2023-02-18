import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/productDashboard.css";
import PopUpAddProduct from "../components/UI/PopUpAddProduct";
import PopUpEditProduct from "../components/UI/PopUpEditProduct";
import { toast } from "react-toastify";

const ProductDashboard = () => {
  const url = "https://localhost:7282/api/GetProducts";
  const [products, setProducts] = useState([]);
  const [addPopup, setAddPopup] = useState(false);

  useEffect(() => {
    axios.get(url).then(function (item) {
      const getProducts = item.data;
      setProducts(getProducts);
    });
  }, [products]);

  return (
    <Helmet title="User list">
      <section>
        <Container>
          <Row>
            <Col>
              <table className="table bordered">
                <thead>
                  <th>Image</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <Tr item={item} />
                  ))}
                  <tr>
                    <i
                      class="ri-add-circle-line"
                      onClick={() => setAddPopup(true)}
                    ></i>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
        <PopUpAddProduct trigger={addPopup} setTrigger={setAddPopup} />
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const deleteProduct = () => {
    const DeleteUrl =
      "https://localhost:7282/api/DeleteProduct/" + item.productID;
    axios.delete(DeleteUrl);
    toast.success("Product deleted successfully!");
  };

  const [editPopup, setEditPopup] = useState(false);

  return (
    <tr>
      <td>
        <img src={item.imgURL} alt="" />
      </td>
      <td>{item.productID}</td>
      <td>{item.productName}</td>
      <td>{item.stock}</td>
      <td>{item.price}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={() => setEditPopup(true)}
          class="ri-edit-line"
        ></motion.i>
        <PopUpEditProduct
          data={item}
          trigger={editPopup}
          setTrigger={setEditPopup}
        />
        
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default ProductDashboard;
