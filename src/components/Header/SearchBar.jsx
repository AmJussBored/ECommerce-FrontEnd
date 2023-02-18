import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./searchbar.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const SearchBar = () => {
  const [products, setProducts] = useState();
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://localhost:7282/api/GetProducts").then(function (item) {
      const productsData = item.data;
      setProducts(productsData);
    });
  }, []);

  const handleSearch = (e) => {
    //Sets the searchTerm
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    //Updating the searchTerm for shop page
    dispatch(
      cartActions.searchingProduct({
        searchToken: searchTerm,
      })
    );
  };

  const onSearch = () => {
    setSearchItem("");
  };

  const navigate = useNavigate();

  return (
    <div className="search_container">
      <div className="search_box">
        <div className="inputAndResult">
          <input
            id="searchbar"
            type="text"
            placeholder="Search Products..."
            value={searchItem}
            onChange={handleSearch}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (searchItem !== "") {
                  navigate("/shop");

                  onSearch();
                } else {
                  dispatch(
                    cartActions.addItem({
                      searchToken: "",
                    })
                  );
                  setSearchItem("");
                }
              }
            }}
          />
          <div className="search_dropdown">
            {searchItem !== ""
              ? products
                  .filter((item) =>
                    item.productName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item) => (
                    <li
                      onClick={() => onSearch()}
                      className="dropdown-searchlist"
                      key={item.productID}
                    >
                      <Link to={`/shop/${item.productID}`}>
                        {item.productName}
                      </Link>
                    </li>
                  ))
              : ""}
          </div>
        </div>
        <span>
          <i onClick={() => onSearch(searchItem)} class="ri-search-line"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
