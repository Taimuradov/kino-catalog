import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useRating } from "../context/RatingContext"

function MovieCard({
  movie,
  favorites = [],
  setFavorites = () => {},
}) {
  const [hoveredRating, setHoveredRating] = useState(0)

  const {
    getMovieRating,
    setMovieRating,
  } = useRating()

  const userRating = getMovieRating(movie.id)

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  )

  const toggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (isFavorite) {
      setFavorites(
        favorites.filter(
          (item) => item.id !== movie.id
        )
      )
    } else {
      setFavorites([
        ...favorites,
        movie,
      ])
    }
  }

  const handleRating = (
    rating,
    event
  ) => {
    event.preventDefault()
    event.stopPropagation()

    setMovieRating(
      movie.id,
      rating
    )
  }

  const displayedRating =
    hoveredRating || userRating

  const votes =
    userRating > 0 ? 1 : 0

  return (
    <article className="group h-[290px] w-full overflow-hidden rounded-xl border border-gray-800 bg-[#181b21] transition duration-300 hover:-translate-y-1 hover:border-gray-700">

      <div className="flex h-full">

        {/* Постер */}
        <Link
          to={`/movie/${movie.id}`}
          className="h-full w-[145px] shrink-0 sm:w-[180px] lg:w-[200px]"
        >
          <div className="h-full w-full overflow-hidden bg-black">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Правая часть */}
        <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 lg:px-6">

          {/* Название + рейтинг */}
          <div className="flex items-start justify-between gap-4">

            <Link
              to={`/movie/${movie.id}`}
              className="min-w-0 flex-1"
            >
              <h3 className="line-clamp-2 text-xl font-bold leading-6 text-white transition hover:text-gray-300 sm:text-2xl sm:leading-7">
                {movie.title}
              </h3>
            </Link>

            {/* Рейтинг */}
            <div
              className="flex shrink-0 flex-col items-end"
              onMouseLeave={() =>
                setHoveredRating(0)
              }
            >
              <div className="flex items-center gap-2">

                {/* 5 звёзд */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(
                    (star) => {

                      const isActive =
                        star <= displayedRating

                      const isHovered =
                        star === hoveredRating

                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() =>
                            setHoveredRating(star)
                          }
                          onClick={(event) =>
                            handleRating(
                              star,
                              event
                            )
                          }
                          className={`flex h-7 w-7 items-center justify-center text-xl leading-none transition-all duration-150 ${
                            isHovered
                              ? "scale-125"
                              : "scale-100"
                          }`}
                          aria-label={`Оценить на ${star} из 5`}
                        >
                          <span
                            className={
                              isActive
                                ? "text-yellow-400"
                                : "text-gray-700"
                            }
                          >
                            ★
                          </span>
                        </button>
                      )
                    }
                  )}
                </div>

                {/* Оценка */}
                <span className="min-w-[20px] text-right text-sm font-semibold text-yellow-400">
                  {displayedRating}
                </span>

              </div>

              {/* Голоса */}
              <span className="mt-1 text-[11px] text-gray-500">
                ({votes} гол.)
              </span>
            </div>
          </div>

          {/* Информация */}
          <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-1 text-sm leading-5 text-gray-400 sm:grid-cols-2">

            <p className="truncate">
              <span className="text-gray-500">
                Год выпуска:
              </span>{" "}
              {movie.year}
            </p>

            <p className="truncate">
              <span className="text-gray-500">
                Страна:
              </span>{" "}
              {movie.country}
            </p>

            <p className="truncate">
              <span className="text-gray-500">
                Жанр:
              </span>{" "}
              {movie.genre}
            </p>

            <p className="truncate">
              <span className="text-gray-500">
                Продолжительность:
              </span>{" "}
              {movie.duration}
            </p>

            <p className="truncate">
              <span className="text-gray-500">
                Премьера:
              </span>{" "}
              {movie.premiere}
            </p>

            <p className="truncate">
              <span className="text-gray-500">
                Качество:
              </span>{" "}
              {movie.quality}
            </p>

          </div>

          {/* Описание */}
          <Link
            to={`/movie/${movie.id}`}
            className="mt-3 block"
          >
            <p className="line-clamp-2 max-w-4xl text-sm leading-5 text-gray-400 transition hover:text-gray-300">
              {movie.description}
            </p>
          </Link>

          {/* Нижние кнопки */}
          <div className="mt-auto flex items-center gap-3 pt-3">

            <button
              type="button"
              onClick={toggleFavorite}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-[#242831] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-600 hover:bg-[#2d323c] hover:text-white"
            >
              <Heart
                size={16}
                fill={
                  isFavorite
                    ? "currentColor"
                    : "none"
                }
              />

              {isFavorite
                ? "В избранном"
                : "В избранное"}
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition hover:bg-[#242831] hover:text-white"
            >
              Подробнее
            </Link>

          </div>
        </div>
      </div>
    </article>
  )
}

export default MovieCard