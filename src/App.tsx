import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";

const ProductList = lazy(() => import("./components/product/ProductList"));
const SingleProduct = lazy(() => import("./components/product/SingleProduct"));
const Like = lazy(() => import("./components/like/Like"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Promo = lazy(() => import("./pages/promo/Promo"));
const Shipping = lazy(() => import("./pages/shipping/Shipping"));
const About = lazy(() => import("./pages/about/About"));
const BeautyClub = lazy(() => import("./pages/beauty-club/BeautyClub"));
const CategoryPage = lazy(() => import("./pages/category/Category"));
const Profile = lazy(() => import("./components/profile/Profile"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

const App: React.FC = () => {
  return (
    <div className="startCs flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/like" element={<Like />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
            <Route path="/beauty-club" element={<BeautyClub />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
