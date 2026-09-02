import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link
          to="/"
          className="shrink-0 text-2xl font-bold"
        >
          КиноКаталог
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end">

          <input
            type="text"
            placeholder="Название, режиссёр, актёр"
            className="hidden w-full max-w-md rounded-lg border border-gray-700 bg-[#181b21] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-500 md:block"
          />

        </div>
      </div>
    </header>
  )
}

export default Header
