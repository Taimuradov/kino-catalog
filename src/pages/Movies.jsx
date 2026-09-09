import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import movies from "../data/movies";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
import Background from "../components/Background";

function Movies({ favorites, setFavorites }) {
  const moviesPerPage = 10;

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  const movieList = [...movies]
    .filter((movie) => {
      const type = Array.isArray(movie.type)
        ? movie.type.join(" ").toLowerCase()
        : movie.type?.toLowerCase() || "";

      return (
        type.includes("фильм") ||
        type.includes("movie") ||
        type.includes("film")
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.premiere);
      const dateB = new Date(b.premiere);

      return dateB - dateA;
    });

  const filteredMovies = movieList.filter((movie) => {
    if (!searchQuery) {
      return true;
    }

    const title = movie.title?.toLowerCase() || "";

    const director = movie.director?.toLowerCase() || "";

    const actors = Array.isArray(movie.actors)
      ? movie.actors.join(" ").toLowerCase()
      : movie.actors?.toLowerCase() || "";

    const genre = Array.isArray(movie.genre)
      ? movie.genre.join(" ").toLowerCase()
      : movie.genre?.toLowerCase() || "";

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

  const catalogBlockRef = useRef(null);

  const shouldScrollToCatalogRef = useRef(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (shouldScrollToCatalogRef.current) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!shouldScrollToCatalogRef.current) {
      return;
    }

    shouldScrollToCatalogRef.current = false;

    if (!catalogBlockRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      const catalogTop =
        catalogBlockRef.current.getBoundingClientRect().top + window.scrollY;

      const header = document.querySelector("header");

      const headerHeight = header ? header.getBoundingClientRect().height : 0;

      const gap = 8;

      const targetPosition = catalogTop - headerHeight - gap;

      window.scrollTo({
        top: Math.max(targetPosition, 0),
        behavior: "smooth",
      });
    });
  }, [currentPage]);

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }

    shouldScrollToCatalogRef.current = true;

    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    if (currentPage === totalPages) {
      return;
    }

    shouldScrollToCatalogRef.current = true;

    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    if (page === currentPage) {
      return;
    }

    shouldScrollToCatalogRef.current = true;

    setCurrentPage(page);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0f1115] text-white">
      <Background />

      <div className="relative z-10">
        <Navigation />

        <MovieCarousel />

        <div className="h-8 sm:h-16" />

        <section className="mx-auto max-w-7xl px-3 pb-8 sm:px-6 sm:pb-16">
          <div
            ref={catalogBlockRef}
            className="mx-auto min-h-[700px] w-full overflow-hidden rounded-xl border border-gray-800 bg-[#181b21]/95 backdrop-blur-sm sm:w-[calc(100%-104px)] sm:rounded-2xl"
          >
            <div className="flex min-h-[700px]">
              <aside className="hidden w-56 shrink-0 border-r border-gray-800 p-6 md:block">
                <div className="text-sm text-gray-500">
                  Здесь будет внутренняя навигация
                </div>
              </aside>

              <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                <h1 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
                  {searchQuery ? "Результаты поиска" : "Фильмы"}
                </h1>

                {searchQuery && (
                  <p className="mb-5 break-words text-sm text-gray-500 sm:mb-6">
                    Поиск:
                    <span className="ml-2 text-gray-300">«{searchQuery}»</span>
                  </p>
                )}

                <div className="mb-6 rounded-xl border border-gray-800 bg-[#0f1115]/90 p-3 backdrop-blur-sm sm:mb-8 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                    <span className="w-full text-sm font-medium text-gray-300 sm:w-auto">
                      Сортировка:
                    </span>

                    <button
                      type="button"
                      className="rounded-lg border border-gray-700 bg-[#181b21]/90 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white sm:px-4"
                    >
                      Новые ▼
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-gray-700 bg-[#181b21]/90 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white sm:px-4"
                    >
                      Год ▼
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-gray-700 bg-[#181b21]/90 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white sm:px-4"
                    >
                      Жанр ▼
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-gray-700 bg-[#181b21]/90 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-[#242831] hover:text-white sm:px-4"
                    >
                      Страна ▼
                    </button>
                  </div>
                </div>

                {currentMovies.length > 0 && totalPages > 1 && (
                  <div className="mb-6 sm:mb-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPrevious={previousPage}
                      onNext={nextPage}
                      onPageChange={goToPage}
                      showOnTop
                      cardsCount={currentMovies.length}
                    />
                  </div>
                )}

                {currentMovies.length === 0 ? (
                  <div className="rounded-xl border border-gray-800 bg-[#0f1115]/90 p-8 text-center sm:p-10">
                    <h2 className="text-xl font-semibold">Фильмы не найдены</h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Попробуйте изменить запрос.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 sm:gap-5">
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
                      <div className="mt-8 sm:mt-10">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPrevious={previousPage}
                          onNext={nextPage}
                          onPageChange={goToPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Movies;
