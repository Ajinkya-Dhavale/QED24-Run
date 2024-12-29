import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = ({ products, search, setSearch, category, setCategory, sort, setSort, addToCart }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category
      ? product.category.name?.toLowerCase() === category.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  if (sort === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "ratingHighLow") {
    filteredProducts.sort((a, b) => b.rating - a.rating); // Assuming products have a rating property
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingHighLow">Rating: High to Low</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card manage_img h-100">
                <img
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Category: {product.category.name}</p>
                  <div className="button-container">
                    <Link to={`/product/${product.id}`} className="btn btn-primary mb-2 btn-text">
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-outline-success btn-text"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
