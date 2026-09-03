import MovieCard from "../components/MovieCard";

function Favorites({ favorites, setFavorites }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-6 text-2xl font-bold">Избранное</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">В избранном пока ничего нет.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
