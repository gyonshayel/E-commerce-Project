import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export function OrderSummary({ deliveryOptions }) {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <p>Your Cart is empty.</p>
        <Link to="/">
          <button className="py-2 px-2 rounded-lg mt-[11px] mb-[15px] bg-[#ffd814] border border-[#fcd200] shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7ca00] active:shadow-none active:bg-[#ffd814] button-primary">
            View Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <ul className="max-[1000px]:max-w-[500px]">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => (
          <li key={cartItem.id}>
            <CartItem cartItem={cartItem} deliveryOptions={deliveryOptions} />
          </li>
        ))}
    </ul>
  );
}
