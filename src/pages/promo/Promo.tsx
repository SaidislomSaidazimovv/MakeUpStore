import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SideBar from "./sidebar/SideBar";

const Promo = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const brands = [
    { name: "OLAPLEX", description: t("promo.olaplex"), image: "/images/slide1.jpg" },
    { name: "MAREVE", description: t("promo.mareve"), image: "/images/slide2.jpg" },
    { name: "NaturalME", description: t("promo.naturalme"), image: "/images/slide3.jpg" },
    { name: "Paloma", description: t("promo.paloma"), image: "/images/slide4.jpg" },
    { name: "tanita", description: t("promo.tanita"), image: "/images/slide5.jpg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
      setIsLoading(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + brands.length) % brands.length
      );
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="max-w mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">{t("promo.title")}</h2>
      <div className="flex gap-5">
        <SideBar />
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div
            className={`transition-opacity duration-300 ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            <img
              src={brands[currentIndex].image}
              alt={brands[currentIndex].name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="flex justify-center ml-60 mt-4 mb-10">
        {brands.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
              index === currentIndex
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="mr-60"></div>
        <div className="grid grid-cols-2 gap-5">
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/bannerimg1.jpg"
            alt="promoImg"
          />
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/bannerimg2.jpg"
            alt="promoImg"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="mr-60"></div>
        <div className="grid grid-cols-2 gap-5">
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/bannerimg3.jpg"
            alt="promoImg"
          />
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/bannerimg4.jpg"
            alt="promoImg"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="mr-60"></div>
        <div className="grid grid-cols-2 gap-5">
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg1.jpg"
            alt="promoImg"
          />
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg2.jpg"
            alt="promoImg"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="mr-60"></div>
        <div className="grid grid-cols-2 gap-5">
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg3.jpg"
            alt="promoImg"
          />
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg4.jpg"
            alt="promoImg"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="mr-60"></div>
        <div className="grid grid-cols-2 gap-5">
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg5.jpg"
            alt="promoImg"
          />
          <img
            className="rounded-lg transform duration-300 hover:scale-105"
            src="/images/heroimg6.jpg"
            alt="promoImg"
          />
        </div>
      </div>
    </div>
  );
};

export default Promo;
