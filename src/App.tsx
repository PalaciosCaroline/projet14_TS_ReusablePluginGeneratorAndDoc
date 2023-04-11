import Home from "./pages/Home";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const NewEmployee = lazy(() => import('./pages/NewEmployee'));
const ListEmployees = lazy(() => import('./pages/ListEmployees'));

export default function App() {
  document.title = 'HRnet';

  return (
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
            <Route path="/newemployee" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NewEmployee />
          </Suspense>
        } />
        <Route path="/listemployees" element={
          <Suspense fallback={<div>Loading...</div>}>
            <ListEmployees />
          </Suspense>
        } />
        </Routes>
    </BrowserRouter>
  );
}