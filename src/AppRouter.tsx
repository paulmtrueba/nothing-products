import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { ProductContextProvider } from "./components";
import { ProductDetail } from './pages';
export function AppRouter() {
  return <BrowserRouter>
      <ProductContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </ProductContextProvider>
    </BrowserRouter>;
}