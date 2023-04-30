import Home from "./pages/home/Home";
import Spinner from "./pages/Spinner";
import React, { lazy, Suspense } from 'react';
import {Routes, Route } from 'react-router-dom';

const NewEmployee = lazy(() => import('./pages/newEmployee/NewEmployee'));
const ListEmployees = lazy(() => import('./pages/listEmployees/ListEmployees'));

export default function App() {
  document.title = 'HRnet';

  return (
    <Suspense fallback={<Spinner></Spinner>}>
      {/* <BrowserRouter> */}
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/newemployee" element={<NewEmployee />} />
            <Route path="/listemployees" element={<ListEmployees />} />
          </Routes>
      {/* </BrowserRouter> */}
    </Suspense>
  );
}