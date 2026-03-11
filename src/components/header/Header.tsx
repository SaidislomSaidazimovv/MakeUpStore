import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/index";
import { GrFavorite } from "react-icons/gr";
import useCurrency from "../../hooks/useCurrency";
import SearchModal from "../search/Search";
import { setCurrency } from "../../features/currencySlice";
import { TfiSearch } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import headerLogo from "../../assets/headerlogo.svg";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import "./Header.css";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "uz", label: "UZ" },
    { code: "zh", label: "ZH" },
  ];
  const dispatch = useDispatch();
  const { isLoading } = useCurrency();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const likesCount = useSelector(
    (state: RootState) => state.likes.items.length
  );
  const currency = useSelector((state: RootState) => state.currency.selected);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <header className="bg-white top-0 z-50 shadow-sm container mx-auto">
      <div className="bg-gray-100 py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <span className="text-gray-600">{t("nav.freeDelivery")}</span>
          <div className="flex space-x-4 text-gray-600">
            <Link to="/promo" className="text-red-500">
              {t("nav.promotions")}
            </Link>
            <Link to="/shipping" className="hover:text-blue-800">
              {t("nav.deliveryPayment")}
            </Link>
            <Link to="/about" className="hover:text-blue-800">
              {t("nav.aboutStore")}
            </Link>
          </div>
          <Link to="/beauty-club" className="hover:text-blue-800">
            <span className="mr-1">★</span> {t("nav.beautyClub")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <motion.button
          onClick={openSearchModal}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <TfiSearch className="w-6 h-6" />
        </motion.button>

        <Link to="/" className="text-3xl font-bold ml-60 text-black">
          <img className="header_logo" src={headerLogo} alt="headerlogo" />
        </Link>

        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-1 border border-rose-200 rounded-full text-sm text-rose-600 hover:bg-rose-50 transition">
              {languages.find(l => l.code === i18n.language)?.label || "EN"}
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-8 bg-white border border-rose-100 rounded-xl shadow-lg hidden group-hover:flex flex-col z-50 min-w-[80px]">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-rose-50 transition first:rounded-t-xl last:rounded-b-xl ${
                    i18n.language === lang.code ? "text-rose-600 font-semibold" : "text-gray-700"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
              className="bg-gray-100 border border-gray-300 rounded-md py-1 pl-2 pr-8 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="UZS">UZS</option>
            </select>
            {isLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-md">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            <CiUser className="w-8 h-9" />
          </Link>
          <Link
            to="/like"
            className="relative flex items-center text-gray-700 hover:text-red-600 transition-colors duration-300"
          >
            <GrFavorite className="w-7 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {likesCount}
            </span>
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <BsHandbag className="w-7 h-6 mr-2" />
            <span className="absolute -top-2 -right-1 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
              {cartItemsCount}
            </span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isSearchModalOpen && (
          <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
        )}
      </AnimatePresence>

      <nav className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 justify-center px-4 py-2">
        {["Blush", "Bronzer", "Eyeliner", "Eyeshadow", "Foundation", "Lipstick", "Mascara"].map((item) => (
          <NavLink
            key={item}
            to={`/category/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `pb-1 text-lg font-bold transition-all duration-200 border-b-2 ${
                isActive
                  ? "text-rose-600 font-semibold border-rose-600"
                  : "text-gray-800 border-transparent hover:text-rose-500 hover:border-rose-400"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
