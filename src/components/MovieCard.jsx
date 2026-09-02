import { Heart } from "lucide-react"

function MovieCard({ movie }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-800 bg-[#181b21] transition hover:-translate-y-1 hover:border-gray-700">
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

          <button className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white">
            <Heart size={17} />
            В избранное
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard