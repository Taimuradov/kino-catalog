import { useEffect, useRef, useState } from "react";

import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import Navigation from "../components/Navigation";
import Pagination from "../components/Pagination";
import Background from "../components/Background";

function Favorites({ favorites, setFavorites }) {
  const moviesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / moviesPerPage);

  const startIndex = (currentPage - 1) * moviesPerPage;

  const currentFavorites = favorites.slice(
    startIndex,
    startIndex + moviesPerPage,
  );

  const favoritesBlockRef = useRef(null);

  const shouldScrollToFavoritesRef = useRef(false);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!shouldScrollToFavoritesRef.current) {
      return;
    }

    shouldScrollToFavoritesRef.current = false;

    if (!favoritesBlockRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      const favoritesTop =
        favoritesBlockRef.current.getBoundingClientRect().top + window.scrollY;

      const header = document.querySelector("header");

      const headerHeight = header ? header.getBoundingClientRect().height : 0;

      const gap = 8;

      const targetPosition = favoritesTop - headerHeight - gap;

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

    shouldScrollToFavoritesRef.current = true;

    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    if (currentPage === totalPages) {
      return;
    }

    shouldScrollToFavoritesRef.current = true;

    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    if (page === currentPage) {
      return;
    }

    shouldScrollToFavoritesRef.current = true;

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
            ref={favoritesBlockRef}
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
                  Избранное
                </h1>

                {favorites.length > 0 && totalPages > 1 && (
                  <div className="mb-6 sm:mb-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPrevious={previousPage}
                      onNext={nextPage}
                      onPageChange={goToPage}
                    />
                  </div>
                )}

                {favorites.length === 0 ? (
                  <div className="rounded-xl border border-gray-800 bg-[#0f1115]/90 p-8 text-center sm:p-10">
                    <h2 className="text-xl font-semibold">
                      В избранном пока ничего нет
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Добавляйте фильмы в избранное, чтобы они появились здесь.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 sm:gap-5">
                      {currentFavorites.map((movie) => (
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

export default Favorites;
