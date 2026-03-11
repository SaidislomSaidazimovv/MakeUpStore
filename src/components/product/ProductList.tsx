import React, { useState } from "react";
import { useGetProductsQuery } from "../../services/makeupApi";
import ProductCard from "./ProductCard";
import ImageCarousel from "../carousel/Carousel";
import CategoryCarousel from "./category/CategoryProductList";
import PageTransition from "../PageTransition";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const [category] = useState<string | null>(null);
  const { data: products, isLoading, error } = useGetProductsQuery();

  const filteredProducts = category
    ? products?.filter((product) => product.product_type === category)
    : products;

  return (
    <PageTransition>
    <div className="container mx-auto p-4">
      <ImageCarousel />

      <CategoryCarousel />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-300 rounded-md"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          <p>{t("home.errorFetch")}</p>
        </div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center font-semibold text-3xl mt-10 mb-16">
        {t("home.brandOffers")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(50, 55).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[130px]" src="/images/mainImg1.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewLipstick")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/mainImg2.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewLipstick")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center font-semibold text-3xl mb-16 mt-10">
        {t("home.perfumery")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(80, 85).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/mainimg5.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/mainimg6.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[120px]" src="/images/mainimg3.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewPerfume")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[80px]" src="/images/mainimg4.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewPerfume")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
        {t("home.makeup")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(140, 145).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg5.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg6.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[70px]" src="/images/mainimg-9.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewMascara")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[45px]" src="/images/mainimg-10.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewMascara")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
        {t("home.hair")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(235, 240).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg3.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg4.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[185px]" src="/images/mainimg7.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewShampoo1")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[105px]" src="/images/mainimg8.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewShampoo2")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
        {t("home.face")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(270, 275).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg2.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/heroimg1.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/mainimg11.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[175px]" src="/images/mainimg12.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center mt-10 justify-center font-semibold text-3xl mb-10">
        {t("home.bodyBath")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(490, 495).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/bannerimg4.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/bannerimg2.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/seperateimg1.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[175px]" src="/images/seperateimg2.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
        {t("home.forMen")}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts?.slice(760, 765).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-10 mt-24 mx-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <img
            className="w-[100%] transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/bannerimg3.jpg"
            alt="mainImg"
          />
        </div>
        <div className="relative group">
          <img
            className="w-[100%] =mr-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            src="/images/bannerimg1.jpg"
            alt="mainImg"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[125px]" src="/images/seperateimg3.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerAnna")}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[140px]" src="/images/seperateimg4.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              {t("home.reviewCream")}
            </p>
            <p className="mt-4">{t("home.reviewerMilena")}</p>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default ProductList;
