import { Routes, Route, Navigate } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />}>
        <Route path="*" element={<Navigate to="/products" />} />
      </Route>
    </Routes>
  );
};
