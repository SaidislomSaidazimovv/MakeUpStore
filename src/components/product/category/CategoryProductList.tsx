import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Rexaline", image: "/images/categoryimglist4.jpg", video: "/video/carouselvideo1.mp4", type: "video/mp4" },
  { name: "Lalique", image: "/images/categoryimglist5.jpg", video: "/video/carouselvideo2.mp4", type: "video/mp4" },
  { name: "Filorga", image: "/images/categoryimglist6.jpg", video: "/video/carouselvideo3.mp4", type: "video/mp4" },
  { name: "Lovely", image: "/images/categoryimglist2.jpg", video: "/video/carouselvideo4.webm", type: "video/webm" },
  { name: "ARI ANWA Skin", image: "/images/categoryimglist3.jpg", video: "/video/carouselvideo6.mp4", type: "video/mp4" },
  { name: "Vipera", image: "/images/categoryimglist7.jpg", video: "/video/carouselvideo5.webm", type: "video/webm" },
  { name: "Bentley", image: "/images/categoryimglist1.jpg", video: "/video/carouselvideo7.mp4", type: "video/mp4" },
  { name: "Faconnable", image: "/images/categoryimglist8.jpg", video: "/video/carouselvideo8.mp4", type: "video/mp4" },
];

const CategoryProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex overflow-x-auto space-x-4 py-4 px-4 scrollbar-hide gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm mt-2">{category.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl relative overflow-hidden"
                style={{ width: "90%", maxWidth: "520px" }}
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold tracking-wide text-gray-900">
                    {selectedCategory}
                  </h2>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition"
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="p-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    controls
                    onEnded={handleClose}
                    className="w-full rounded-xl"
                    style={{ maxHeight: "320px", objectFit: "cover" }}
                  >
                    <source
                      src={categories.find(c => c.name === selectedCategory)?.video}
                      type={categories.find(c => c.name === selectedCategory)?.type}
                    />
                  </video>
                </div>

                <div className="px-5 pb-4 flex items-center justify-between">
                  <p className="text-xs text-gray-400 tracking-widest uppercase">
                    Brand Video
                  </p>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ x: 3 }}
                    className="text-xs text-rose-400 hover:text-rose-600 transition flex items-center gap-1"
                  >
                    Close ›
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CategoryProductList;
