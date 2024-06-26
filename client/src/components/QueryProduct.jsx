import React from "react";
import "../assets/css/queryProduct.css";

import { useGlobalContext } from "../utils/context";

import { useParams,Link } from "react-router-dom";


const QueryProduct = () => {
  

  const { selectedCategory } = useParams();

  return (
    <div className="query-top">
      <div className="left-query">
        <p className="heading-link">
          <Link to="/">Home </Link> <span>/</span>
          {selectedCategory}
        </p>
        <h2 className="product-heading">{selectedCategory}</h2>
      </div>

      <div className="right-query">
        <p className="per-page">
          1 <span>out</span>45
        </p>
        <div className="sort-div">
          Sort By:
          <p className="sort-1">Price -High To Low</p>
          <p className="sort-2">Price -Low To High</p>
        </div>
      </div>
    </div>
  );
};

export default QueryProduct;
