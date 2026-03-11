import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/makeupApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { addToLikes, removeFromLikes } from "../../features/likeSlice";
import { RootState } from "../../app/index";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/formatPrice";
import PageTransition from "../PageTransition";
import { useTranslation } from "react-i18next";

const SingleProduct: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.likes.items);
  const isLike = product ? likes.some((item) => item.id === product.id) : false;
  const currency = useSelector((state: RootState) => state.currency.selected);
  const [selectedVolume, setSelectedVolume] = useState("100ml");
  const [mainImage, setMainImage] = useState("");

  const handleAddToCart = () => product && dispatch(addToCart(product));

  const handleToggleFavorite = () => {
    if (product) {
      isLike
        ? dispatch(removeFromLikes(product.id))
        : dispatch(addToLikes(product));
    }
  };

  if (isLoading) return <div className="animate-pulse">{t("product.loading")}</div>;
  if (error) return <div>{t("product.error")}</div>;
  if (!product) return <div>{t("product.notFound")}</div>;

  const thumbnails = [
    product.image_link,
    product.image_link,
    product.image_link,
    product.image_link,
  ];

  return (
    <PageTransition>
    <div className="bg-white max-w-7xl mx-auto p-6">
      <nav className="text-sm breadcrumbs mb-4">
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              MAKEUP
            </Link>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <Link to="/perfume" className="text-gray-500 hover:text-gray-700">
              {t("product.perfumery")}
            </Link>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li className="text-gray-700">{product.name}</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <motion.img
            src={mainImage || product.image_link}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
          />
          <div className="flex space-x-2 mt-4">
            {thumbnails.map((thumb, index) => (
              <motion.img
                key={index}
                src={thumb}
                alt={`${product.name} - ${index + 1}`}
                className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                onClick={() => setMainImage(thumb)}
                whileHover={{ scale: 1.05 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className="bg-gray-100 text-xs font-semibold text-gray-700 px-2 py-1 rounded inline-block mb-2">
              {t("product.deal")}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{product.brand}</p>
            {product.rating != null && (
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.round(product.rating!) ? "text-yellow-500" : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            )}

            <p className="text-3xl font-bold text-blue-600 mb-4">
              {formatPrice(product.price, currency, t("product.noPrice"), t("product.currency"))}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("product.volume")}
            </label>
            <div className="flex space-x-2">
              {["50ml", "100ml", "200ml"].map((volume) => (
                <motion.button
                  key={volume}
                  onClick={() => setSelectedVolume(volume)}
                  className={`px-4 py-2 rounded-md ${
                    selectedVolume === volume
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {volume}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="mr-2" size={20} />
              {t("product.buy")}
            </motion.button>
            <motion.button
              onClick={handleToggleFavorite}
              className={`p-3 rounded-lg ${
                isLike ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={isLike ? "fill-current" : ""} size={20} />
            </motion.button>
          </div>

          <div className="flex items-center text-green-600 mb-6">
            <Truck className="mr-2" size={20} />
            <span>{t("product.freeDelivery")}</span>
          </div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default SingleProduct;
