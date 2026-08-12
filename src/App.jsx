import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { initialProducts } from './products';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import AdminPanel from './AdminPanel';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const addProduct = (product) => setProducts((items) => [...items, { ...product, id: Date.now() }]);
  const updateProduct = (updated) => setProducts((items) => items.map((item) => item.id === updated.id ? updated : item));
  const deleteProduct = (id) => setProducts((items) => items.filter((item) => item.id !== id));
  return <BrowserRouter><div className="app"><header><Link className="brand" to="/">MOBILE STORE</Link><nav><Link to="/">HOME</Link><Link to="/admin">ADMIN PANEL</Link></nav></header><Routes>
    <Route path="/" element={<ProductList products={products} />} />
    <Route path="/products/:id" element={<ProductDetails products={products} updateProduct={updateProduct} />} />
    <Route path="/admin" element={<AdminPanel products={products} addProduct={addProduct} deleteProduct={deleteProduct} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></div></BrowserRouter>;
}
