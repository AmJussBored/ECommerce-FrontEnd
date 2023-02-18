import React from "react";
import { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import "../../styles/popupAddproduct.css";
import axios from "axios";
import { toast } from "react-toastify";

const PopUpAddProduct = (props) => {
  const url = "https://localhost:7282/api/AddProduct";
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [imgURL, setImgURL] = useState("");

  const closePopup = () => {
    props.setTrigger(false);
    setProductName("")
    setPrice("")
    setStock("")
    setCategory("")
    setShortDesc("")
    setLongDesc("")
    setImgURL("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, {
        productName: productName,
        price: price,
        stock: stock,
        category: category,
        shorDesc: shortDesc,
        longDesc: longDesc,
        imgURL: imgURL,
      });
      closePopup();
      toast.success("Product added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return props.trigger ? (
    <div className="AddProduct-main">
      <div className="AddProduct-inner">
        <i class="ri-close-circle-line" onClick={closePopup}></i>
        <Form className="prod_form">
          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="Stock No."
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="Short Description"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="Long Description"
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="Image URL"
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
            />
          </FormGroup>

          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUpAddProduct;
