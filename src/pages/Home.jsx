import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import movies from "../data/movies"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"

function Home({ favorites, setFavorites }) {
  const visibleMovies = 6
  const gap = 12

  const viewportRef = useRef(null)

  const [currentSlide, setCurrentSlide] = useState(visibleMovies)
  const [cardWidth, setCardWidth] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const sliderMovies = [
    ...movies.slice(-visibleMovies),
    ...movies,
    ...movies.slice(0, visibleMovies),
  ]

  useEffect(() => {
    const updateSize = () => {
      if (!viewportRef.current) return

      const width = viewportRef.current.clientWidth

      const calculatedCardWidth =
        (width - gap * (visibleMovies - 1)) / visibleMovies

      setCardWidth(calculatedCardWidth)
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current)
    }

    window.addEventListener("resize", updateSize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isTransitioning) return

    if (currentSlide === movies.length + visibleMovies) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentSlide(visibleMovies)

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
          })
        })
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [currentSlide, isTransitioning])

  const previousSlide = () => {
    if (!isTransitioning) return

    setCurrentSlide((prev) => prev - 1)
  }
  const nextSlide = () => {
    if (!isTransitioning) return

    setCurrentSlide((prev) => prev + 1)
  }

  const slideDistance = cardWidth + gap

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <section className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="mx-auto flex w-[calc(100%-104px)] items-center gap-2">
          <button className="flex-1 rounded-lg bg-[#242831] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d323c]">
            Главная
          </button>

          <button className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Новинки
          </button>

          <button className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Подборки
          </button>

          <button className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Фильмы
          </button>

          <button className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Сериалы
          </button>

          <button className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Мультфильмы
          </button>
        </nav>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-3">
        <div className="flex items-center gap-3">

          <button
            onClick={previousSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white"
            aria-label="Предыдущий баннер"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-800 bg-[#181b21] p-3">
            <div
              ref={viewportRef}
              className="overflow-hidden"
            >
              <div
                className={`flex gap-3 ${
                  isTransitioning
                    ? "transition-transform duration-700 ease-in-out"
                    : ""
                }`}
                style={{
                  transform: `translateX(-${currentSlide * slideDistance}px)`,
                }}
              >
                {sliderMovies.map((movie, index) => (
                  <Link
                    key={`${movie.id}-${index}`}
                    to={`/movie/${movie.id}`}
                    className="group block shrink-0"
                    style={{
                      width: `${cardWidth}px`,
                    }}
                  >
                    <div className="h-64 overflow-hidden rounded-xl bg-[#242831]">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white"
            aria-label="Следующий баннер"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </section>

      <div className="h-16" />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mx-auto min-h-[700px] w-[calc(100%-104px)] rounded-2xl border border-gray-800 bg-[#181b21]">
          <div className="flex">

            <aside className="w-56 shrink-0 border-r border-gray-800 p-6">
              <div className="text-sm text-gray-500">
                Здесь будет внутренняя навигация
              </div>
            </aside>

            <div className="flex-1 p-8">
              <h1 className="mb-6 text-3xl font-bold">
                Фильмы
              </h1>

              <div className="mb-8 rounded-xl border border-gray-800 bg-[#0f1115] p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-gray-300">
                    Сортировка:
                  </span>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white">
                    Новые ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white">
                    Год ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white">
                    Жанр ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white">
                    Страна ▼
                  </button>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        КиноКаталог
      </footer>

    </main>
  )
}

export default Home