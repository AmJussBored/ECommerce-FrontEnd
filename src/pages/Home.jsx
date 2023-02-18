import React from "react";

import { motion } from "framer-motion";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img2.png";
import { Link } from "react-router-dom";
import ProductsList from "../components/UI/ProductsList";
import Services from "../services/Services";
import { useEffect, useState } from "react";

import counterImg from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";

import axios from "axios";

/*for tab title*/
const Home = () => {
  //for filtering (Category)
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    axios.get("https://localhost:7282/api/GetProducts").then(function (item) {
      const products = item.data;

      const filteredTrendingProducts = products.filter(
        (item) => item.category === "chair"
      );

      const filteredBestSalesProducts = products.filter(
        (item) => item.category === "sofa"
      );

      const filteredMobileProducts = products.filter(
        (item) => item.category === "mobile"
      );

      const filteredWirelessProducts = products.filter(
        (item) => item.category === "wireless"
      );

      const filteredPopularProducts = products.filter(
        (item) => item.category === "watch"
      );

      setTrendingProducts(filteredTrendingProducts);
      setBestSalesProducts(filteredBestSalesProducts);
      setMobileProducts(filteredMobileProducts);
      setWirelessProducts(filteredWirelessProducts);
      setPopularProducts(filteredPopularProducts);
    });
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <p className="hero_subtitle">
                  Trending Gaming Headphones in {year}
                </p>
                <h2>
                  Experience the game like never before with our immersive
                  headset.
                </h2>
                <p>
                  Designed with and for pros. Next-gen 7.1 surround sound and
                  PRO-G 50 mm drivers ensure premium gaming audio. Mic sounds
                  amazing with external USB sound card featuring Blue VO!CE
                  broadcast filters.
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*free shippings */}
      <Services />

      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Trending Products</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Best Sales</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer_count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count_down-col">
              <div className="clock_top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy_btn store_btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter_img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new_arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">New Arrivals</h2>
            </Col>

            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular_category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Popular Products</h2>
            </Col>

            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
