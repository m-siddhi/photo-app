import React from "react";
import useFetch from "../hooks/useFetch";

const Photos = () => {
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
          fontSize: "24px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}
    >
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
        Photos
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {data.slice(0, 20).map((item) => (
          <div
            key={item.id}
            style={{
              border: "2px solid white",
              padding: "10px",
              backgroundColor: "black",
              textAlign: "center",
            }}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <p style={{ color: "white", fontSize: "14px" }}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
