import React, { useContext, useEffect, useState } from "react";
import "./css/shopcategory.css";
import { Link } from "react-router-dom";
import { shopContext } from "../Context/ShopContext";

const ShopCategory = (props) => {
  const { all_products, setProducts } = useContext(shopContext);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banners by category
  useEffect(() => {
    fetch(
      `https://customizeproserver-ez6b5n9b.b4a.run/banner?category=${props.category}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, [props.category]);

  useEffect(() => {
    fetch("https://glamgrabbackend-dxah8u9g.b4a.run/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [setProducts]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="Shopcategory">
      {banners.length > 0 && (
        <div className="banner-container">
          {banners.map((banner) => (
            <div key={banner._id} className="banner">
              <div>
                <h2>{banner.heading}</h2>
                <p>{banner.text.join(", ")}</p>
                <button>{banner.buttonLabel}</button>
              </div>
              <div>
                {banner.imageUrl ? (
                  <img
                    src={`https://customizeproserver-ez6b5n9b.b4a.run/${banner.imageUrl.replace(
                      /\\/g,
                      "/"
                    )}`}
                    className="banner-img"
                    alt={banner.heading}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <p>
        <span>Showing 1-12</span> out of products
      </p>

      <div className="shopcategory-products">
        {all_products
          .filter((item) => item.category === props.category)
          .map((item) => {
            // Normalize the image URL for the product
            const normalizedimageUrl = item.imageUrl?.replace(/\\/g, "/") || "";

            return (
              <div key={item._id} className="all_products-item">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${item._id}`}
                >
                  {normalizedimageUrl ? (
                    <img
                      src={normalizedimageUrl}
                      alt={item.name}
                      className="shop-item-img"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div className="all_products-detail">
                    <h2 className="all_products-name">{item.name}</h2>
                    <p className="all_products-price new">
                      price ${item.price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShopCategory;
