import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import movies from "../data/movies";

function MovieCarousel() {
  const maxVisibleMovies = 6;

  const viewportRef = useRef(null);

  const [visibleMovies, setVisibleMovies] = useState(6);
  const [cardWidth, setCardWidth] = useState(0);
  const [carouselGap, setCarouselGap] = useState(12);

  const [currentSlide, setCurrentSlide] = useState(maxVisibleMovies);

  const [isTransitioning, setIsTransitioning] = useState(true);

  const latestMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 15);

  useEffect(() => {
    const updateResponsiveValues = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleMovies(2);
        setCarouselGap(8);
      } else if (width < 768) {
        setVisibleMovies(3);
        setCarouselGap(8);
      } else if (width < 1024) {
        setVisibleMovies(4);
        setCarouselGap(12);
      } else if (width < 1280) {
        setVisibleMovies(5);
        setCarouselGap(12);
      } else {
        setVisibleMovies(6);
        setCarouselGap(12);
      }
    };

    updateResponsiveValues();

    window.addEventListener("resize", updateResponsiveValues);

    return () => {
      window.removeEventListener("resize", updateResponsiveValues);
    };
  }, []);

  const canLoop = latestMovies.length > visibleMovies;

  const cloneCount = Math.min(visibleMovies, latestMovies.length);

  const sliderMovies = canLoop
    ? [
        ...latestMovies.slice(-cloneCount),
        ...latestMovies,
        ...latestMovies.slice(0, cloneCount),
      ]
    : latestMovies;

  useEffect(() => {
    const updateCardWidth = () => {
      if (!viewportRef.current) {
        return;
      }

      const viewportWidth = viewportRef.current.clientWidth;

      if (!viewportWidth) {
        return;
      }

      const cardsCount = canLoop
        ? visibleMovies
        : Math.min(latestMovies.length, visibleMovies);

      if (cardsCount === 0) {
        setCardWidth(0);
        return;
      }

      const totalGap = carouselGap * Math.max(cardsCount - 1, 0);

      const calculatedWidth = (viewportWidth - totalGap) / cardsCount;

      setCardWidth(Math.max(calculatedWidth, 0));
    };

    updateCardWidth();

    const resizeObserver = new ResizeObserver(updateCardWidth);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateCardWidth);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", updateCardWidth);
    };
  }, [visibleMovies, carouselGap, canLoop]);

  useEffect(() => {
    setIsTransitioning(false);

    setCurrentSlide(canLoop ? cloneCount : 0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });
  }, [cloneCount, canLoop]);

  useEffect(() => {
    if (!canLoop) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, [canLoop]);

  useEffect(() => {
    if (!canLoop || !isTransitioning) {
      return;
    }

    const lastSlide = latestMovies.length + cloneCount;

    if (currentSlide >= lastSlide) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);

        setCurrentSlide(cloneCount);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);

      return () => {
        clearTimeout(timer);
      };
    }

    if (currentSlide <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);

        setCurrentSlide(latestMovies.length);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentSlide, cloneCount, canLoop, isTransitioning, latestMovies.length]);

  const previousSlide = () => {
    if (!canLoop || !isTransitioning) {
      return;
    }

    setCurrentSlide((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (!canLoop || !isTransitioning) {
      return;
    }

    setCurrentSlide((prev) => prev + 1);
  };

  const slideDistance = cardWidth + carouselGap;

  return (
    <section className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          onClick={previousSlide}
          disabled={!canLoop}
          aria-label="Предыдущий фильм"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#181b21]/90 text-gray-300 backdrop-blur-sm transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={18} className="sm:h-[22px] sm:w-[22px]" />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-gray-800 bg-[#181b21]/90 p-1.5 backdrop-blur-sm sm:rounded-2xl sm:p-3">
          <div ref={viewportRef} className="w-full overflow-hidden">
            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                gap: `${carouselGap}px`,
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
                  <div className="aspect-[2/3.2] overflow-hidden rounded-lg bg-[#242831] sm:aspect-auto sm:h-52 sm:rounded-xl md:h-60 lg:h-64">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      loading="lazy"
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
          disabled={!canLoop}
          aria-label="Следующий фильм"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#181b21]/90 text-gray-300 backdrop-blur-sm transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <ChevronRight size={18} className="sm:h-[22px] sm:w-[22px]" />
        </button>
      </div>
    </section>
  );
}

export default MovieCarousel;
