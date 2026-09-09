import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <section className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-6">
      <nav className="mx-auto flex w-full gap-2 overflow-x-auto pb-1 sm:w-[calc(100%-104px)]">
        <Link
          to="/"
          className={`flex min-w-[90px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Главная
        </Link>

        <Link
          to="/new"
          className={`flex min-w-[90px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/new"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Новинки
        </Link>

        <Link
          to="/collections"
          className={`flex min-w-[100px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/collections"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Подборки
        </Link>

        <Link
          to="/movies"
          className={`flex min-w-[90px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/movies"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Фильмы
        </Link>

        <Link
          to="/series"
          className={`flex min-w-[90px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/series"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Сериалы
        </Link>

        <Link
          to="/cartoons"
          className={`flex min-w-[110px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[130px] sm:px-4 ${
            location.pathname === "/cartoons"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Мультфильмы
        </Link>

        <Link
          to="/favorites"
          className={`flex min-w-[100px] flex-1 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition sm:min-w-[110px] sm:px-4 ${
            location.pathname === "/favorites"
              ? "bg-[#242831]/90 text-white"
              : "bg-[#181b21]/95 text-gray-400 hover:bg-[#242831] hover:text-white"
          }`}
        >
          Избранное
        </Link>
      </nav>
    </section>
  );
}

export default Navigation;
