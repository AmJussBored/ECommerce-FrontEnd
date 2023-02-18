import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";

import ProductList from "../components/UI/ProductsList";

import { toast } from "react-toastify";

import axios from "axios";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const { productID } = useParams();
  const url = "https://localhost:7282/api/GetProduct/" + productID;
  const allProductsURL = "https://localhost:7282/api/GetProducts";
  const [item, setItem] = useState([]);
  const [rating, setRating] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(url).then(function (item) {
      const getProduct = item.data;
      setItem(getProduct);
    });
  }, [url]);

  useEffect(() => {
    axios.get(allProductsURL).then(function (item) {
      const getProduct = item.data;
      setProducts(getProduct);
    });
  }, []);

  const relatedProducts = products.filter(
    (data) => data.category === item.category
  );

  const submitHandler = (e) => {};

  const addToCart = () => {};

  return (
    <Helmet title={item.productName}>
      <CommonSection title={item.productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={item.imgURL} alt="" />
            </Col>

            <Col lg="6">
              <div className="product_details">
                <h2>{item.productName}</h2>
                <div className="product_rating d-flex align-items-center gap-5 mb-3">
                  <div className="product_rating">
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-line"></i>
                    </span>
                  </div>

                  <p>
                    (<span>{item.avgRating}</span> ratings)
                  </p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product_price">${item.price}</span>
                  <span>Category: {item.category}</span>
                </div>

                <p className="mt-3">{item.shorDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn"
                  onClick={addToCart}
                >
                  Add To Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>

        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab_wrapper d-flex align-items-center gap-5">
                  <h6
                    className={`${tab === "desc" ? "active_tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${tab === "rev" ? "active_tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Reviews (0{/*Number of Reviews */})
                  </h6>
                </div>

                {tab === "desc" ? (
                  <div className="tab_content mt-5">
                    <p>{item.longDesc}</p>
                  </div>
                ) : (
                  <div className="product_review mt-5">
                    <div className="review_wrapper">
                      <ul>
                        {/*Iteration for all Reviews dapat, kaso wala pa*/}
                      </ul>

                      <div className="review_form">
                        <form action="" onSubmit={submitHandler}>
                          <h4>Leave your experience</h4>
                          <div className="form_group d-flex align-items-center gap-3 rating_group">
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(1)}
                            >
                              1<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(2)}
                            >
                              2<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(3)}
                            >
                              3<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(4)}
                            >
                              4<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(5)}
                            >
                              5<i class="ri-star-s-fill"></i>
                            </motion.span>
                          </div>

                          <div className="form_group">
                            <textarea
                              row={4}
                              type="text"
                              placeholder="Write a review Message..."
                              required
                            />
                          </div>

                          <div>
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              type="submit"
                              className="buy_btn"
                            >
                              Submit
                            </motion.button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Col>

              <Col lg="12" className="mt-5">
                <h2 className="related_title">You might also like</h2>
              </Col>

              <ProductList data={relatedProducts} />
            </Row>
          </Container>
        </section>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
