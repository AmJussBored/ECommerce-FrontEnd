import React from "react";
import { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import "../../styles/popupAddproduct.css";
import axios from "axios";
import { toast } from "react-toastify";

function PopUpEditProduct(props) {
  const url = "https://localhost:7282/api/UpdateProducts/"+props.data.productID
  const [productName, setProductName] = useState(props.data.productName);
  const [price, setPrice] = useState(props.data.price);
  const [stock, setStock] = useState(props.data.stock);
  const [category, setCategory] = useState(props.data.category);
  const [shortDesc, setShortDesc] = useState(props.data.shorDesc);
  const [longDesc, setLongDesc] = useState(props.data.longDesc);
  const [imgURL, setImgURL] = useState(props.data.imgURL);

  const closePopup = () => {
    props.setTrigger(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url, {
        productName: productName,
        price: price,
        stock: stock,
        category: category,
        shorDesc: shortDesc,
        longDesc: longDesc,
        imgURL: imgURL,
      });
      closePopup();
      toast.success("Product Edited successfully!");
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
  ): "";
}

export default PopUpEditProduct;
