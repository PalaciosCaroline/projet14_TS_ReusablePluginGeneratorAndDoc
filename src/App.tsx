import React from "react";
import NewEmployee from './pages/NewEmployee';
import { BrowserRouter,Routes, Route} from "react-router-dom";
import ListEmployees from './pages/ListEmployees';
import Home from "./pages/Home";

export default function App() {
document.title = 'HRnet';

return(
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/newemployee" element={<NewEmployee />} />
          <Route path="/listemployees" element={<ListEmployees />} />
        </Routes>
    </BrowserRouter>
  )
}

