import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import MoviePage from "./pages/MoviePage"

import Header from "./components/Header"

import { RatingProvider } from "./context/RatingContext"

function App() {
  const [favorites, setFavorites] = useState([])

  return (
    <BrowserRouter>
      <RatingProvider>
        <div className="min-h-screen bg-[#0f1115] text-white">

          <Header />

          <Routes>

            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />

            <Route
              path="/movie/:id"
              element={
                <MoviePage
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />

          </Routes>


        </div>
      </RatingProvider>
    </BrowserRouter>
  )
}

export default App
