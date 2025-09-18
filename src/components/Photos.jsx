import React from "react";
import useFetch from "../hooks/useFetch";

const Products = () => {
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  if (loading) {
    return <div className="loading-screen">Loading products...</div>;
  }

  if (error) {
    return <div className="error-screen">{error}</div>;
  }

  return (
    <div className="products-container">
      <h1>Product Gallery</h1>
      <div className="products-grid">
        {data &&
          data.slice(0, 20).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0] || "https://via.placeholder.com/150"}
                alt={product.title}
              />
              <p>{product.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
