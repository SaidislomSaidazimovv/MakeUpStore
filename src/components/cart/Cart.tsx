import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/index";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../features/cartSlice";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { formatPrice } from "../../utils/formatPrice";
import PageTransition from "../PageTransition";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const currency = useSelector((state: RootState) => state.currency.selected);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">{t("cart.empty")}</p>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("cart.title")}</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-4 gap-3"
        >
          <div className="flex items-center">
            <img
              src={item.image_link}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold truncate">{item.name}</h3>
              <p className="text-gray-600">{item.brand}</p>
              <p className="text-sm text-blue-600">{item.selectedOption}</p>
            </div>
          </div>
          <div className="flex items-center self-end sm:self-auto">
            <div className="flex items-center border rounded-md mr-4">
              <button
                onClick={() =>
                  handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className="p-2 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-lg font-bold mr-4">
              {formatPrice(parseFloat(item.price) * item.quantity, currency, t("product.noPrice"), t("product.currency"))}
            </p>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          {t("cart.clear")}
        </button>
        <div className="text-2xl font-bold">
          {t("cart.total")} {formatPrice(totalPrice, currency, t("product.noPrice"), t("product.currency"))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Cart;
