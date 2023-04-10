// import React from "react";
// import NewEmployee from './pages/NewEmployee';
// import { BrowserRouter,Routes, Route} from "react-router-dom";
// import ListEmployees from './pages/ListEmployees';
// import Home from "./pages/Home";

// export default function App() {
// document.title = 'HRnet';

// return(
//     <BrowserRouter>
//         <Routes>
//           <Route index path="/" element={<Home />} />
//           <Route path="/newemployee" element={<NewEmployee />} />
//           <Route path="/listemployees" element={<ListEmployees />} />
//         </Routes>
//     </BrowserRouter>
//   )
// }

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const NewEmployee = lazy(() => import('./pages/NewEmployee'));
const ListEmployees = lazy(() => import('./pages/ListEmployees'));

export default function App() {
  document.title = 'HRnet';

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/newemployee" element={<NewEmployee />} />
          <Route path="/listemployees" element={<ListEmployees />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}