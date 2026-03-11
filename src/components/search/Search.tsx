import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/index";
import { formatPrice } from "../../utils/formatPrice";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  image_link: string;
  rating: number | null;
  category: string;
  product_type: string;
  tag_list: string[];
  product_colors: { hex_value: string; colour_name: string }[];
}

const POPULAR_TAGS = ["Lipstick", "Foundation", "Mascara", "Blush", "Eyeliner"];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("lipstick");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const currency = useSelector((state: RootState) => state.currency.selected);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, productType, category]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${BASE_URL}products.json?brand=${encodeURIComponent(
          searchTerm
        )}&product_type=${encodeURIComponent(productType)}${
          category !== "all" ? `&category=${encodeURIComponent(category)}` : ""
        }`
      );
      setResults(response.data);
    } catch {
      setError("An error occurred while searching. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    setProductType(tag.toLowerCase());
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleOutsideClick}
    >
      <motion.div
        ref={modalRef}
        className="bg-[#fdfcfb] w-full shadow-lg border-b border-rose-100"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto px-8 py-5">
          <div className="flex items-center gap-4">
            <SearchIcon className="text-rose-400 shrink-0" size={22} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for lipstick, foundation, mascara..."
              className="flex-grow bg-transparent outline-none text-lg border-b-2 border-rose-300 focus:border-rose-500 py-2 placeholder:text-rose-300 text-gray-800 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="border border-rose-200 rounded-full bg-rose-50 text-rose-700 text-sm font-medium px-4 py-2 outline-none focus:border-rose-400 hover:bg-rose-100 transition cursor-pointer"
            >
              <option value="lipstick">Lipstick</option>
              <option value="foundation">Foundation</option>
              <option value="eyeliner">Eyeliner</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-rose-200 rounded-full bg-rose-50 text-rose-700 text-sm font-medium px-4 py-2 outline-none focus:border-rose-400 hover:bg-rose-100 transition cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="organic">Organic</option>
              <option value="vegan">Vegan</option>
              <option value="natural">Natural</option>
            </select>
            <motion.button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-rose-50 transition text-rose-400 hover:text-rose-600"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={22} />
            </motion.button>
          </div>

          {!searchTerm.trim() && !isLoading && results.length === 0 && (
            <div className="flex items-center mt-4 pt-3 border-t border-rose-100">
              <span className="text-rose-400 text-xs mr-2">Popular:</span>
              <div className="flex gap-2 flex-wrap">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="bg-rose-50 text-rose-500 text-xs px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-100 cursor-pointer transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(isLoading || error || (searchTerm.trim() && (results.length > 0 || !isLoading))) && (
            <div className="border-t border-rose-100 mt-3 pt-3">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-rose-100 rounded-lg h-12"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-rose-500 text-sm py-6">
                  {error}
                </div>
              ) : results.length > 0 ? (
                <ul className="max-h-72 overflow-y-auto">
                  {results.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-3 py-2 px-3 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                      onClick={() => handleResultClick(product)}
                    >
                      <img
                        src={product.image_link}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/placeholder.jpg";
                        }}
                      />
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-rose-400">{product.brand}</p>
                      </div>
                      <span className="text-sm text-rose-600 font-semibold shrink-0">
                        {formatPrice(product.price, currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-rose-400 text-sm py-6 text-center">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
