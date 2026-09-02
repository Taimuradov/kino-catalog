import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

function MovieCard({ movie, favorites, setFavorites }) {
  const isFavorite = favorites.some((item) => item.id === movie.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(
        favorites.filter((item) => item.id !== movie.id)
      )
    } else {
      setFavorites([...favorites, movie])
    }
  }

  return (
    <article className="overflow-hidden rounded-xl border border-gray-800 bg-[#181b21] transition hover:-translate-y-1 hover:border-gray-700">
      <Link to={`/movie/${movie.id}`}>
        <div className="h-80 w-full bg-black">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">
            {movie.title}
          </h3>

          <p className="mb-3 text-sm text-gray-400">
            {movie.year} • {movie.genre}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-400">
              ★ {movie.rating}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={toggleFavorite}
          className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white"
        >
          <Heart
            size={17}
            fill={isFavorite ? "currentColor" : "none"}
          />

          {isFavorite ? "В избранном" : "В избранное"}
        </button>
      </div>
    </article>
  )
}

export default MovieCard