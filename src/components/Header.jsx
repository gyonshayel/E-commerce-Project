import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

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
      <header
        className="bg-[rgb(19,25,33)] text-white px-[15px]
         flex items-center justify-between
         fixed top-0 left-0 right-0 h-[60px]"
      >
        <div className="left-section">
          <Link
            to="/"
            className="inline-block p-1.5 rounded-xs cursor-pointer no-underline border border-transparent hover:border-white"
          >
            <img
              className="w-[100px] mt-[5px] max-[575px]:hidden"
              src="../public/images/logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="hidden max-[575px]:block h-[35px] mt-[5px]"
              src="../public/images/mobile-logo-white.png"
              alt="Amazon Logo"
            />
          </Link>
        </div>

        <form className="middle-section">
          <input
            id="search-bar"
            className="flex-1 w-0 text-[16px] h-[38px] pl-[15px] border-none
             rounded-l-sm"
            type="text"
            placeholder="Search for products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            className="bg-[rgb(254,189,105)] border-none w-[45px] h-10
             rounded-r-sm shrink-0"
            onClick={handleSearch}
          >
            <img
              className="h-[22px] ml-0.5 mt-[3px]"
              src="../public/images/icons/search-icon.png"
            />
          </button>
        </form>

        <div className="w-[180px] shrink-0 flex justify-end">
          <Link
            className="text-white no-underline text-center mr-4"
            to="/orders"
          >
            <span className="block text-[13px]">Returns</span>
            <span className="block text-[15px] font-bold">& Orders</span>
          </Link>

          <Link
            className="text-white flex items-center relative"
            to="/checkout"
          >
            <img
              className="w-[50px]"
              src="../public/images/icons/cart-icon.png"
              alt="cart"
            />
            <div
              className="text-[rgb(240,136,4)] text-[16px] font-bold
               absolute top-1 left-[22px] w-[26px] text-center"
            >
              {" "}
              {totalQuantity}
            </div>
            <div className="mt-3 text-[15px] font-bold">Cart</div>
          </Link>
        </div>
      </header>
    </>
  );
}
