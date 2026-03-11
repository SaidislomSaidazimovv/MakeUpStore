import React, { useState } from "react";
import { useGetProductsQuery } from "../../services/makeupApi";
import ProductCard from "./ProductCard";
import ImageCarousel from "../carousel/Carousel";
import CategoryCarousel from "./category/CategoryProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList: React.FC = () => {
  const [category] = useState<string | null>(null);
  const { data: products, isLoading, error } = useGetProductsQuery();

  const filteredProducts = category
    ? products?.filter((product) => product.product_type === category)
    : products;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
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
          <p>Error occurred while fetching products.</p>
        </div>
      )}

      <div>
        <h2 className="flex items-center justify-center font-semibold text-3xl mt-10 mb-16">
          Предложения брендов
        </h2>
      </div>

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
              Помада супер , у меня почти все цвета, пользуюсь много лет,после
              нее не могу пользоваться другими,реально зе бест)Супер
              стойкая,супер насыщенная и не сушит губы как некоторые аналоги....
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/mainImg2.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Помада супер , у меня почти все цвета, пользуюсь много лет,после
              нее не могу пользоваться другими,реально зе бест)Супер
              стойкая,супер насыщенная и не сушит губы как некоторые аналоги....
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center justify-center font-semibold text-3xl mb-16 mt-10">
          Парфюмерия
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[120px]" src="/images/mainimg3.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              мои любимые духи, сначала очень странные но потом классно
              раскрываются, прикольные)) многие говорят, что похоже на мыло, я
              люблю такие запахи...
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[80px]" src="/images/mainimg4.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              мои любимые духи, сначала очень странные но потом классно
              раскрываются, прикольные)) многие говорят, что похоже на мыло, я
              люблю такие запахи...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
          Макияж
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[70px]" src="/images/mainimg-9.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Тушь замечательная. Наносить такой кисточкой легко и приятно)
              Держится на ресницах тушь уверенно, смывается мицеллярной водой
              легко 😊...
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[45px]" src="/images/mainimg-10.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Тушь замечательная. Наносить такой кисточкой легко и приятно)
              Держится на ресницах тушь уверенно, смывается мицеллярной водой
              легко 😊...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
          Волосы
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[185px]" src="/images/mainimg7.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Шампунь гарний. Задоволена. Беру вже не перший раз.
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[105px]" src="/images/mainimg8.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Я покупала не здесь, но хотела бы поделиться отзывом. Очень
              понравился шампунь и бальзам из серии. У меня густые, длинные,
              окрашенные волосы. Подошёл идеально и запах очень приятный и
              свежий. Расход в...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
          Лицо
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/mainimg11.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[175px]" src="/images/mainimg12.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center mt-10 justify-center font-semibold text-3xl mb-10">
          Тело и ванна
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[90px]" src="/images/seperateimg1.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[175px]" src="/images/seperateimg2.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center mt-10 justify-center font-semibold text-3xl mb-16">
          Мужчинам
        </h2>
      </div>

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

      <div className="flex justify-center gap-10 mt-24 mx-5">
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
      </div>

      <div className="flex justify-between mt-16 rounded-lg mx-5 bg-gray-100 py-10 px-10">
        <div className="flex items-center">
          <img className="mr-20 w-[125px]" src="/images/seperateimg3.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Анна</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-20 w-[140px]" src="/images/seperateimg4.jpg" alt="mainImg" />
          <div>
            <p className="text-xl font-semibold w-80">
              Крем приятный по структуре,запах неплохой,пока результата не
              увидела,,,,работа по доставке отличная,спасибо за скорость, всё
              прибыло супербыстро!...
            </p>
            <p className="mt-4">Милена</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
