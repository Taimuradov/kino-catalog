import { useEffect, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import MovieCarousel from "../components/MovieCarousel";
import Navigation from "../components/Navigation";
import Background from "../components/Background";

import movies from "../data/movies";
import { useRating } from "../context/RatingContext";

function MoviePage({ favorites = [], setFavorites = () => {} }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const movie = movies.find((item) => item.id === Number(id));

  const { getMovieRating, setMovieRating } = useRating();

  const [hoveredRating, setHoveredRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // Каждый раз при открытии страницы фильма
  // начинаем с самого верха.
  useEffect(() => {
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: "auto",
    });
  }, [id]);

  const handleBack = () => {
    const previousPage = location.state?.from;
    const returnMovieId = location.state?.returnMovieId;

    if (previousPage) {
      navigate(previousPage, {
        state: {
          restoreMovieId: returnMovieId,
        },
      });

      return;
    }

    navigate("/");
  };

  if (!movie) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-[#0f1115] text-white">
        <Background />

        <section className="relative z-10 mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10">
          <div className="rounded-xl border border-gray-800 bg-[#181b21] p-5 sm:rounded-2xl sm:p-8">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
              Фильм не найден
            </h2>

            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-400 transition hover:text-white sm:text-base"
            >
              ← Вернуться к фильмам
            </button>
          </div>
        </section>
      </main>
    );
  }

  const userRating = getMovieRating(movie.id);

  const displayedRating = hoveredRating || userRating;

  const votes = userRating > 0 ? 1 : 0;

  const handleRating = (rating) => {
    setMovieRating(movie.id, rating);
  };

  const isFavorite = favorites.some((item) => item.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((item) => item.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const recommendations = movies
    .filter((item) => item.id !== movie.id)
    .sort((a, b) => {
      const movieGenres = movie.genre?.toLowerCase().split(" / ");

      const aMatch = movieGenres?.some((genre) =>
        a.genre?.toLowerCase().includes(genre),
      );

      const bMatch = movieGenres?.some((genre) =>
        b.genre?.toLowerCase().includes(genre),
      );

      return Number(bMatch) - Number(aMatch);
    })
    .slice(0, 5);

  const addComment = (event) => {
    event.preventDefault();

    const text = commentText.trim();

    if (!text) {
      return;
    }

    const newComment = {
      id: Date.now(),
      text,
      date: "Только что",
    };

    setComments((prev) => [newComment, ...prev]);

    setCommentText("");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0f1115] text-white">
      <Background />

      <div className="relative z-10">
        <Navigation />

        <MovieCarousel />

        <div className="h-2 sm:h-4" />

        <section className="mx-auto max-w-7xl px-3 pb-8 sm:px-6 sm:pb-16">
          <div className="mx-auto w-full overflow-hidden rounded-xl border border-gray-800 bg-[#181b21]/95 backdrop-blur-sm sm:w-[calc(100%-104px)] sm:rounded-2xl">
            <div className="flex">
              <aside className="hidden w-56 shrink-0 border-r border-gray-800 p-6 md:block">
                <div className="text-sm text-gray-500">
                  Здесь будет внутренняя навигация
                </div>
              </aside>

              <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-5 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white sm:mb-6"
                >
                  <ArrowLeft size={17} />
                  Назад
                </button>

                <section className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-7">
                  <div className="mx-auto w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-black sm:max-w-[260px] lg:mx-0">
                    <div className="aspect-[2/3]">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                      <h1 className="min-w-0 flex-1 text-2xl font-bold leading-tight sm:text-3xl">
                        {movie.title}
                      </h1>

                      <div
                        className="flex shrink-0 flex-col items-start sm:items-end"
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isActive = star <= displayedRating;
                              const isHovered = star === hoveredRating;

                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onMouseEnter={() => setHoveredRating(star)}
                                  onClick={() => handleRating(star)}
                                  className={`flex h-7 w-7 items-center justify-center text-xl leading-none transition-all duration-150 ${
                                    isHovered ? "scale-125" : "scale-100"
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
                              );
                            })}
                          </div>

                          <span className="min-w-[20px] text-right text-sm font-semibold text-yellow-400">
                            {displayedRating}
                          </span>
                        </div>

                        <span className="mt-1 text-[11px] text-gray-500">
                          ({votes} гол.)
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500">Страна</p>

                          <p className="mt-1 text-sm leading-6 text-gray-200">
                            {movie.country}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Жанр</p>

                          <p className="mt-1 text-sm leading-6 text-gray-200">
                            {movie.genre}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Качество</p>

                          <p className="mt-1 text-sm text-gray-200">
                            {movie.quality}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500">Год выпуска</p>

                          <p className="mt-1 text-sm text-gray-200">
                            {movie.year}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Премьера</p>

                          <p className="mt-1 text-sm text-gray-200">
                            {movie.premiere}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Хронометраж</p>

                          <p className="mt-1 text-sm text-gray-200">
                            {movie.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    <section className="mt-6">
                      <p className="text-xs text-gray-500">Режиссёр</p>

                      <p className="mt-1 text-sm leading-6 text-gray-200">
                        {movie.director}
                      </p>
                    </section>

                    <section className="mt-5">
                      <p className="text-xs text-gray-500">Актёры</p>

                      <p className="mt-1 w-full text-sm leading-6 text-gray-200">
                        {Array.isArray(movie.actors)
                          ? movie.actors.join(", ")
                          : movie.actors}
                      </p>
                    </section>

                    <button
                      type="button"
                      onClick={toggleFavorite}
                      className={`mt-6 rounded-lg border px-4 py-2 text-sm transition ${
                        isFavorite
                          ? "border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/15"
                          : "border-gray-700 bg-[#242831] text-gray-300 hover:border-gray-600 hover:bg-[#2d323c] hover:text-white"
                      }`}
                    >
                      {isFavorite ? "✓ В избранном" : "♡ Добавить в избранное"}
                    </button>
                  </div>
                </section>

                <section className="mt-8 sm:mt-10">
                  <h2 className="mb-3 text-lg font-semibold sm:text-xl">
                    Описание
                  </h2>

                  <p className="max-w-5xl text-sm leading-7 text-gray-400">
                    {movie.description}
                  </p>
                </section>

                <section
                  id="player"
                  className="mt-10 border-t border-gray-800 pt-7 sm:mt-12 sm:pt-8"
                >
                  <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                    Смотреть фильм
                  </h2>

                  <div className="flex aspect-video items-center justify-center rounded-xl border border-gray-800 bg-black">
                    <div className="text-center">
                      <div className="mb-3 text-4xl sm:text-5xl">▶</div>

                      <p className="text-sm text-gray-400 sm:text-base">
                        Здесь будет видеоплеер
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  id="recommendations"
                  className="mt-10 border-t border-gray-800 pt-7 sm:mt-12 sm:pt-8"
                >
                  <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                    Рекомендации
                  </h2>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                    {recommendations.map((recommendedMovie) => (
                      <Link
                        key={recommendedMovie.id}
                        to={`/movie/${recommendedMovie.id}`}
                        state={{
                          from: location.pathname + location.search,
                        }}
                        className="group min-w-0"
                      >
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-black">
                          <img
                            src={recommendedMovie.poster}
                            alt={recommendedMovie.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-white transition group-hover:text-gray-300">
                          {recommendedMovie.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {recommendedMovie.year}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>

                <section
                  id="comments"
                  className="mt-10 border-t border-gray-800 pt-7 sm:mt-12 sm:pt-8"
                >
                  <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                    Комментарии
                  </h2>

                  <form
                    onSubmit={addComment}
                    className="rounded-xl border border-gray-800 bg-[#0f1115] p-3 sm:p-4"
                  >
                    <textarea
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      placeholder="Напишите свой комментарий..."
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-800 bg-[#181b21] p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-gray-600 sm:p-4"
                    />

                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="flex items-center gap-2 rounded-lg bg-[#242831] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d323c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
                      >
                        <Send size={16} />
                        Отправить
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 space-y-4">
                    {comments.length === 0 ? (
                      <div className="rounded-xl border border-gray-800 bg-[#0f1115] p-5 text-center sm:p-6">
                        <p className="text-sm text-gray-500">
                          Пока нет комментариев.
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                          Будьте первым, кто оставит комментарий.
                        </p>
                      </div>
                    ) : (
                      comments.map((comment) => (
                        <article
                          key={comment.id}
                          className="rounded-xl border border-gray-800 bg-[#0f1115] p-4 sm:p-5"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-gray-200">
                              Зритель
                            </span>

                            <span className="text-xs text-gray-600">
                              {comment.date}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-gray-400">
                            {comment.text}
                          </p>
                        </article>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MoviePage;
