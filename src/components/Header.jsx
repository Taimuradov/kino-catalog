import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function Header({ onHomeClick }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const handleSearch = (event) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handleHomeClick = () => {
    setSearchParams({});

    onHomeClick();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/70 bg-[#0f1115]/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-5 lg:py-6">
        <div className="mx-auto flex w-full items-center justify-between gap-3 sm:w-[calc(100%-40px)] sm:gap-6 lg:w-[calc(100%-104px)] lg:gap-8">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="shrink-0 text-xl font-bold tracking-tight text-white transition hover:text-gray-200 sm:text-2xl lg:text-3xl"
          >
            КиноКаталог
          </Link>

          <div className="relative min-w-0 flex-1 sm:max-w-md lg:max-w-lg">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 sm:left-4"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Название, режиссёр, актёр, жанр"
              aria-label="Поиск фильмов"
              className="h-10 w-full rounded-lg border border-gray-700/80 bg-[#181b21]/80 py-2 pl-10 pr-3 text-xs text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500 focus:bg-[#181b21] sm:h-11 sm:pl-11 sm:pr-4 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
