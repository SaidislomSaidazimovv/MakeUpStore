import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/index";
import { removeFromLikes } from "../../features/likeSlice";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import PageTransition from "../PageTransition";

const Like: React.FC = () => {
  const { t } = useTranslation();
  const likes = useSelector((state: RootState) => state.likes.items);
  const currency = useSelector((state: RootState) => state.currency.selected);
  const dispatch = useDispatch();

  const handleRemoveFromLikes = (productId: number) => {
    dispatch(removeFromLikes(productId));
    toast.success(t("favorites.removed"));
  };

  if (likes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Heart size={64} className="text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">{t("favorites.empty")}</p>
      </div>
    );
  }

  return (
    <PageTransition>
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-center text-3xl font-semibold mb-8">
          {t("favorites.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likes.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image_link}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg line-clamp-1 font-bold">
                  {product.name}
                </h3>
                <p className="text-gray-500">{product.brand}</p>
                <p className="text-gray-800 font-semibold mt-2">
                  {formatPrice(product.price, currency, t("product.noPrice"), t("product.currency"))}
                </p>
                <button
                  onClick={() => handleRemoveFromLikes(product.id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300"
                >
                  {t("favorites.remove")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    </PageTransition>
  );
};

export default Like;
