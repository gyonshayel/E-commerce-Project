import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import "./header.css";

export function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="../public/images/logo-white.png" />
            <img
              className="mobile-logo"
              src="../public/images/mobile-logo-white.png"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input
            id="search-bar"
            className="search-bar"
            type="text"
            placeholder="Search for products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="search-button" onClick={handleSearch}>
            <img
              className="search-icon"
              src="../public/images/icons/search-icon.png"
            />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img
              className="cart-icon"
              src="../public/images/icons/cart-icon.png"
            />
            <div className="cart-quantity"> {totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
