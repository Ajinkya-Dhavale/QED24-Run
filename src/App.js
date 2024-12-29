import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <header className="navbar navbar-light bg-light px-4">
        <h1>Product Store</h1>
        <div>
          <Link to="/" className="btn btn-outline-primary mr-4">Home</Link>
          <Link to="/cart" className="btn btn-primary">Cart ({cart.length})</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={
          <ProductList 
            products={products}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            addToCart={addToCart}
          />
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
