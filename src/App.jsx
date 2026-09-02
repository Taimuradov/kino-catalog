import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import MoviePage from "./pages/MoviePage"

function App() {
  const [favorites, setFavorites] = useState([])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f1115] text-white">
        <header className="border-b border-gray-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link
              to="/"
              className="text-2xl font-bold"
            >
              КиноКаталог
            </Link>

            <div className="flex flex-1 items-center justify-end gap-6">
              <input
                type="text"
                placeholder="Название, режиссёр, актёр"
                className="w-full max-w-md rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
              />

              <nav className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-gray-300 transition hover:text-white"
                >
                  Фильмы
                </Link>

                <Link
                  to="/favorites"
                  className="text-gray-300 transition hover:text-white"
                >
                  Избранное
                </Link>
              </nav>
            </div>
          </div>
        </header>

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
            element={<MoviePage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App