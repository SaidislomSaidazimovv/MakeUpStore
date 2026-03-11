import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../app/index";
import { formatPrice } from "../../utils/formatPrice";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

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

const POPULAR_TAGS = ["Lipstick", "Foundation", "Mascara", "Blush", "Eyeshadow"];

const FALLBACK_CATEGORIES = ["blush", "bronzer", "eyeshadow", "foundation", "lipstick", "mascara"];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("lipstick");
  const [productTag, setProductTag] = useState("all");
  const [allResults, setAllResults] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
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
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const fetchByProductType = useCallback(async (type: string) => {
    setLoading(true);
    setError("");
    try {
      const url = `${import.meta.env.VITE_BASE_URL}products.json?product_type=${type}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API error");
      const data: Product[] = await response.json();
      setAllResults(data);
      setResults(data.slice(0, 20));
    } catch {
      setError("error");
      setAllResults([]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback((
    all: Product[],
    term: string,
    tag: string
  ) => {
    let filtered = [...all];

    if (term.trim()) {
      const lower = term.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(lower) ||
        p.brand?.toLowerCase().includes(lower)
      );
    }

    if (tag && tag !== "all") {
      filtered = filtered.filter(p =>
        p.tag_list?.some((t: string) => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    setResults(filtered.slice(0, 20));
  }, []);

  // Fetch when modal opens or product_type changes
  useEffect(() => {
    if (isOpen) {
      fetchByProductType(productType);
    }
  }, [isOpen, productType, fetchByProductType]);

  // Filter client-side when searchTerm or productTag changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(allResults, searchTerm, productTag);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, productTag, allResults, applyFilters]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setProductTag("all");
      setAllResults([]);
      setResults([]);
      setError("");
    }
  }, [isOpen]);

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
    setProductType(tag.toLowerCase());
    setSearchTerm("");
  };

  if (!isOpen) return null;

  const showResults = !loading && !error && (results.length > 0 || searchTerm.trim() || productTag !== "all");

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
              placeholder={t("search.placeholder")}
              className="flex-grow bg-transparent outline-none text-lg border-b-2 border-rose-300 focus:border-rose-500 py-2 placeholder:text-rose-300 text-gray-800 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="border border-rose-200 rounded-full bg-rose-50 text-rose-700 text-sm font-medium px-4 py-2 outline-none focus:border-rose-400 hover:bg-rose-100 transition cursor-pointer"
            >
              <option value="lipstick">Lipstick</option>
              <option value="foundation">Foundation</option>
              <option value="eyeliner">Eyeliner</option>
              <option value="eyeshadow">Eyeshadow</option>
              <option value="blush">Blush</option>
              <option value="bronzer">Bronzer</option>
              <option value="mascara">Mascara</option>
              <option value="nail_polish">Nail Polish</option>
              <option value="lip_liner">Lip Liner</option>
            </select>
            <select
              value={productTag}
              onChange={(e) => setProductTag(e.target.value)}
              className="border border-rose-200 rounded-full bg-rose-50 text-rose-700 text-sm font-medium px-4 py-2 outline-none focus:border-rose-400 hover:bg-rose-100 transition cursor-pointer"
            >
              <option value="all">{t("search.allTags")}</option>
              <option value="organic">Organic</option>
              <option value="vegan">Vegan</option>
              <option value="natural">Natural</option>
              <option value="gluten free">Gluten Free</option>
              <option value="canadian">Canadian</option>
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

          {!searchTerm.trim() && !loading && allResults.length === 0 && !error && (
            <div className="flex items-center mt-4 pt-3 border-t border-rose-100">
              <span className="text-rose-400 text-xs mr-2">{t("search.popular")}</span>
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

          {(loading || error || showResults) && (
            <div className="border-t border-rose-100 mt-3 pt-3">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-rose-100 rounded-lg h-12"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-6">
                  <p className="text-rose-400 text-sm">{t("search.unavailable")}</p>
                  <p className="text-gray-400 text-xs mt-1">{t("search.tryCategory")}</p>
                  <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    {FALLBACK_CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat}`}
                        onClick={onClose}
                        className="bg-rose-50 text-rose-500 text-xs px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <>
                  <p className="text-xs text-rose-400 px-3 mb-2">
                    {results.length} {t("search.productsFound")}
                    {searchTerm && ` ${t("search.for")} "${searchTerm}"`}
                    {` ${t("search.in")} ${productType}`}
                  </p>
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
                          {formatPrice(product.price, currency, t("product.noPrice"), t("product.currency"))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-rose-400 text-sm">{t("search.noResults")} &quot;{searchTerm}&quot;</p>
                  <p className="text-gray-400 text-xs mt-1">{t("search.noResultsHint")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
