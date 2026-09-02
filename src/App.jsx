import MovieCard from "./components/MovieCard"
import movies from "./data/movies"

function App() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <header className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <h1 className="text-2xl font-bold">
            КиноКаталог
          </h1>

          <nav className="flex items-center gap-6">
            <button className="text-gray-300 transition hover:text-white">
              Фильмы
            </button>

            <button className="text-gray-300 transition hover:text-white">
              Избранное
            </button>
          </nav>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        
        <section>
          <h2 className="mb-2 text-3xl font-bold">
            Найди свой фильм
          </h2>

          <p className="mb-6 text-gray-400">
            Ищи фильмы по названию и добавляй понравившиеся в избранное.
          </p>

          <div className="flex max-w-2xl gap-3">
            <input
              type="text"
              placeholder="Введите название фильма..."
              className="flex-1 rounded-lg border border-gray-700 bg-[#181b21] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
            />

            <button className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200">
              Найти
            </button>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">
            Фильмы
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App