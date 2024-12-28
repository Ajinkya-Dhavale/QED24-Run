import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <img src={product.images[0]} alt={product.title} className="img-fluid img_details mb-4" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category.name}</p>
    </div>
  );
};

export default ProductDetail;
