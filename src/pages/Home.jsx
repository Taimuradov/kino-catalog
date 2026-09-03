import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Home({ favorites, setFavorites }) {
  const visibleMovies = 6;
  const gap = 12;
  const moviesPerPage = 10;

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  const filteredMovies = movies.filter((movie) => {
    if (!searchQuery) {
      return true;
    }

    const title = movie.title?.toLowerCase() || "";

    const director = movie.director?.toLowerCase() || "";

    const actors = Array.isArray(movie.actors)
      ? movie.actors.join(" ").toLowerCase()
      : movie.actors?.toLowerCase() || "";

    const genre = movie.genre?.toLowerCase() || "";

    return (
      title.includes(searchQuery) ||
      director.includes(searchQuery) ||
      actors.includes(searchQuery) ||
      genre.includes(searchQuery)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const startIndex = (currentPage - 1) * moviesPerPage;

  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + moviesPerPage,
  );

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const viewportRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(visibleMovies);

  const [cardWidth, setCardWidth] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(true);

  const sliderMovies = [
    ...movies.slice(-visibleMovies),
    ...movies,
    ...movies.slice(0, visibleMovies),
  ];

  useEffect(() => {
    const updateSize = () => {
      if (!viewportRef.current) return;

      const width = viewportRef.current.clientWidth;

      const calculatedCardWidth =
        (width - gap * (visibleMovies - 1)) / visibleMovies;

      setCardWidth(calculatedCardWidth);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 7000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!isTransitioning) return;

    if (currentSlide === movies.length + visibleMovies) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(visibleMovies);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  const previousSlide = () => {
    if (!isTransitioning) return;

    setCurrentSlide((prev) => prev - 1);
  };
  const nextSlide = () => {
    if (!isTransitioning) return;

    setCurrentSlide((prev) => prev + 1);
  };

  const slideDistance = cardWidth + gap;

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <section className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="mx-auto flex w-[calc(100%-104px)] gap-2 overflow-x-auto">
          <button className="min-w-[110px] flex-1 rounded-lg bg-[#242831] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d323c]">
            Главная
          </button>

          <button className="min-w-[110px] flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Новинки
          </button>

          <button className="min-w-[110px] flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Подборки
          </button>

          <button className="min-w-[110px] flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Фильмы
          </button>

          <button className="min-w-[110px] flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Сериалы
          </button>

          <button className="min-w-[130px] flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white">
            Мультфильмы
          </button>

          <Link
            to="/favorites"
            className="flex min-w-[110px] flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-[#242831] hover:text-white"
          >
            Избранное
          </Link>
        </nav>
      </section>
      <section className="mx-auto max-w-7xl px-6 pt-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={previousSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white"
            aria-label="Предыдущий баннер"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-800 bg-[#181b21] p-3">
            <div ref={viewportRef} className="overflow-hidden">
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
            type="button"
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
          <div className="flex min-h-[700px]">
            <aside className="hidden w-56 shrink-0 border-r border-gray-800 p-6 md:block">
              <div className="text-sm text-gray-500">
                Здесь будет внутренняя навигация
              </div>
            </aside>
            <div className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
              <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
                {searchQuery ? "Результаты поиска" : "Фильмы"}
              </h1>

              {searchQuery && (
                <p className="mb-6 text-sm text-gray-500">
                  Поиск:
                  <span className="ml-2 text-gray-300">«{searchQuery}»</span>
                </p>
              )}

              <div className="mb-8 rounded-xl border border-gray-800 bg-[#0f1115] p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="text-sm font-medium text-gray-300">
                    Сортировка:
                  </span>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white">
                    Новые ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white">
                    Год ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white">
                    Жанр ▼
                  </button>

                  <button className="rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white">
                    Страна ▼
                  </button>
                </div>
              </div>
              {currentMovies.length === 0 ? (
                <div className="rounded-xl border border-gray-800 bg-[#0f1115] p-10 text-center">
                  <h2 className="text-xl font-semibold">Ничего не найдено</h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Попробуйте изменить запрос.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    {currentMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Предыдущая страница"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from(
                        {
                          length: totalPages,
                        },
                        (_, index) => index + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-[#242831] text-white"
                              : "border border-gray-700 bg-[#181b21] text-gray-400 hover:bg-[#242831] hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Следующая страница"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
