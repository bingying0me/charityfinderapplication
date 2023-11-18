import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import SearchResult from "./pages/searchresult.tsx";
import CharityDetail from "./pages/charitydetail.tsx";
import Favorites from "./pages/favorites.tsx";
import NotFound from "./pages/notfound.tsx";
import Navigation from "./components/navbar.tsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="searchresult" element={<SearchResult />} />
          <Route path="charitydetail" element={<CharityDetail />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
