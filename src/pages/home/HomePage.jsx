import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok)
          throw new Error("Failed to get Product details from the server");

        const data = await response.json();
        setProducts(data.products);
        console.log("products- ", data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>E-Commerce Store</title>

      <Header />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
