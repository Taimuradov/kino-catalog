import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function Header() {
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/70 bg-[#0f1115]/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-7">
        <div className="mx-auto flex w-[calc(100%-104px)] items-center justify-between gap-8">
          <Link
            to="/"
            className="shrink-0 text-3xl font-bold tracking-tight text-white transition hover:text-gray-200"
          >
            КиноКаталог
          </Link>

          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Название, режиссёр, актёр, жанр"
              className="w-full rounded-lg border border-gray-700/80 bg-[#181b21]/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500 focus:bg-[#181b21]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
