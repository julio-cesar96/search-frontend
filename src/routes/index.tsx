import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductListPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        {/* <Route path="/products/:id" element={<ProductDetailPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
