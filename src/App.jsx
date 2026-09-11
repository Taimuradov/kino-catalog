import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import NewMovies from "./pages/NewMovies";
import Movies from "./pages/Movies";
import Cartoons from "./pages/Cartoons";
import Series from "./pages/Series";
import Favorites from "./pages/Favorites";
import MoviePage from "./pages/MoviePage";

import Header from "./components/Header";

import { RatingProvider } from "./context/RatingContext";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [homeResetKey, setHomeResetKey] = useState(0);

  const handleHomeReset = () => {
    setHomeResetKey((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <RatingProvider>
        <div className="min-h-screen bg-[#0f1115] text-white">
          <Header onHomeClick={handleHomeReset} />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  setFavorites={setFavorites}
                  homeResetKey={homeResetKey}
                />
              }
            />

            <Route
              path="/new"
              element={
                <NewMovies favorites={favorites} setFavorites={setFavorites} />
              }
            />

            <Route
              path="/movies"
              element={
                <Movies favorites={favorites} setFavorites={setFavorites} />
              }
            />

            <Route
              path="/series"
              element={
                <Series favorites={favorites} setFavorites={setFavorites} />
              }
            />

            <Route
              path="/cartoons"
              element={
                <Cartoons favorites={favorites} setFavorites={setFavorites} />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites favorites={favorites} setFavorites={setFavorites} />
              }
            />

            <Route
              path="/movie/:id"
              element={
                <MoviePage favorites={favorites} setFavorites={setFavorites} />
              }
            />
          </Routes>
        </div>
      </RatingProvider>
    </BrowserRouter>
  );
}

export default App;
