import { Link, useParams } from "react-router-dom"
import movies from "../data/movies"

function MoviePage() {
  const { id } = useParams()

  const movie = movies.find((item) => item.id === Number(id))

  if (!movie) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-4 text-2xl font-bold">
          Фильм не найден
        </h1>

        <Link
          to="/"
          className="text-gray-400 transition hover:text-white"
        >
          ← Вернуться к фильмам
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link
        to="/"
        className="mb-8 inline-block text-gray-400 transition hover:text-white"
      >
        ← Назад к фильмам
      </Link>

      <section className="grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="h-[420px] overflow-hidden rounded-xl bg-black">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-8">
            <h1 className="text-4xl font-bold uppercase">
              {movie.title}
            </h1>

            <div className="shrink-0 text-right">
              <div className="flex gap-1 text-2xl">
                <span className="text-orange-500">★</span>
                <span className="text-orange-500">★</span>
                <span className="text-orange-500">★</span>
                <span className="text-orange-500">★</span>
                <span className="text-gray-600">★</span>
              </div>

              <p className="mt-1 text-sm text-gray-400">
                {movie.rating} / 5
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-gray-300">
            <p>
              <span className="font-medium text-white">Автор:</span>{" "}
              Пока неизвестно
            </p>

            <p>
              <span className="font-medium text-white">Жанр:</span>{" "}
              {movie.genre}
            </p>

            <p>
              <span className="font-medium text-white">Вышел в:</span>{" "}
              {movie.year}
            </p>

            <p>
              <span className="font-medium text-white">Страна:</span>{" "}
              Пока неизвестно
            </p>

            <p>
              <span className="font-medium text-white">
                Длительность:
              </span>{" "}
              Пока неизвестно
            </p>

            <p>
              <span className="font-medium text-white">В ролях:</span>{" "}
              Пока неизвестно
            </p>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">
              Описание
            </h2>

            <p className="max-w-3xl leading-7 text-gray-400">
              Здесь будет подробное и интересное описание фильма
              без спойлеров. Сейчас данные временные, а после
              подключения API мы будем получать настоящее описание
              фильма автоматически.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="aspect-video overflow-hidden rounded-xl border border-gray-800 bg-black">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-3 text-5xl text-gray-600">
                ▶
              </div>

              <p className="text-gray-500">
                Здесь будет видеоплеер
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold">
          Рекомендации
        </h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {movies
            .filter((item) => item.id !== movie.id)
            .slice(0, 6)
            .map((item) => (
              <Link
                key={item.id}
                to={`/movie/${item.id}`}
                className="group"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-black">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="h-full w-full object-contain transition group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-3 truncate text-sm font-medium">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {item.year} • ★ {item.rating}
                </p>
              </Link>
            ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold">
          Комментарии
        </h2>

        <div className="rounded-xl border border-gray-800 bg-[#181b21] p-6">
          <p className="text-gray-500">
            Здесь будут комментарии пользователей.
          </p>
        </div>
      </section>
    </main>
  )
}

export default MoviePage