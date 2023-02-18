import React, { useState, useEffect } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row } from "reactstrap";

import "../styles/shop.css";
import axios from "axios";

import ProductList from "../components/UI/ProductsList";

import { useSelector } from "react-redux";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const searchItem = useSelector((state) => state.cart.searchToken);
  useEffect(() => {
    axios.get("https://localhost:7282/api/GetProducts").then(function (item) {
      const productsData = item.data;
      setProducts(productsData);
      setSearchedProducts(productsData)
    });
  },[]);

  //For Searching Products
  
  useEffect(() => {
    const searchProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setSearchedProducts(searchProducts);
  }, [searchItem]);

  //products filter by category
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filteredProducts = products.filter(
        (item) => item.category === "sofa"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "mobile") {
      const filteredProducts = products.filter(
        (item) => item.category === "mobile"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "chair") {
      const filteredProducts = products.filter(
        (item) => item.category === "chair"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "watch") {
      const filteredProducts = products.filter(
        (item) => item.category === "watch"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "wireless") {
      const filteredProducts = products.filter(
        (item) => item.category === "wireless"
      );

      setProducts(filteredProducts);
    }
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products"></CommonSection>

      {/*filter by category*/}
      <section>
        <Container>
          <Row>
            <div className="filter_widget-wrapper">
              <div className="filter_widget filter_category">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
              <div className="filter_widget filter-sort">
                <select>
                  <option>Sort By </option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
          </Row>
        </Container>
      </section>

      {/* Searching nonexistent Products */}
      <section className="pt-0">
        <Container>
          <Row>
            {products.length === 0 ? (
              <h1 className="text-center fs-4">No products are found</h1>
            ) : (
              <ProductList data={searchedProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section></section>
    </Helmet>
  );
};

export default Shop;
