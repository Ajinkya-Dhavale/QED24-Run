import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './index.css'; // Custom CSS file

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch products using Axios
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data); // Set the response data to products
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (category ? product.category === category : true)
  );

  return (
    <div className="container mt-4">
      <header>
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card custom-card">
                <img src={product.image} className="card-img-top custom-img" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
