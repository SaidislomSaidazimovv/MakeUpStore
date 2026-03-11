import React, { useState, useRef } from "react";
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
    <div className="relative mb-8">
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

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            style={{ position: "fixed" }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-4 relative mx-4"
              style={{ width: "100%", maxWidth: "480px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-3 bg-red-600 text-white rounded-full px-2 transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <span className="font-bold text-lg">X</span>
              </button>

              <h2 className="text-2xl font-bold mb-4 -mt-3">
                {selectedCategory}
              </h2>
              {(() => {
                const selected = categories.find((c) => c.name === selectedCategory);
                return (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    controls
                    onEnded={handleClose}
                    style={{ width: "100%", maxHeight: "320px", borderRadius: "8px" }}
                  >
                    <source src={selected?.video} type={selected?.type} />
                    Your browser does not support the video tag.
                  </video>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryProductList;
