import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

export function PaymentSummary({ paymentSummary }) {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [orders, setOrders] = useState(() => {
    const arr = localStorage.getItem("orders");
    return arr ? JSON.parse(arr) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = () => {
    const orderId = crypto.randomUUID();
    const date = new Date();
    const totalCostCents = paymentSummary.totalCostCents;
    const newOrder = { orderId, date, totalCostCents, products: cart };
    setOrders((prev) => [...prev, newOrder]);

    clearCart();
    navigate("/orders");
  };

  return (
    <div className="border border-[#DEDEDE] rounded-sm p-[18px] pb-[5px] max-[1000px]:row-start-1 max-[1000px]:mb-3">
      <h2 className="font-bold text-[18px] mb-3">Payment Summary</h2>

      {paymentSummary && (
        <>
          <div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="text-right">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
            <div>Shipping &amp; handling:</div>
            <div className="text-right">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px] border-t border-[#DEDEDE] pt-[9px]">
            <div>Total before tax:</div>
            <div className="text-right">
              {formatMoney(
                paymentSummary.productCostCents +
                  paymentSummary.shippingCostCents
              )}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] text-[15px] mb-[9px]">
            <div>Estimated tax (10%):</div>
            <div className="text-right">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="text-[#b12704] font-bold text-[18px] border-t border-[#DEDEDE] pt-[18px]">
            <div className="grid grid-cols-[1fr_auto]">
              <div>Order total:</div>
              <div className="text-right">
                {formatMoney(paymentSummary.totalCostCents)}
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg mt-[11px] mb-[15px] bg-[#ffd814] border border-[#fcd200] shadow-[0_2px_5px_rgba(213,217,217,0.5)] hover:bg-[#f7ca00] active:shadow-none active:bg-[#ffd814] button-primary"
            onClick={createOrder}
            disabled={cart.length === 0}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
