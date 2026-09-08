import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
  showOnTop = false,
  cardsCount = 0,
}) {
  if (totalPages <= 1) {
    return null;
  }

  if (showOnTop && cardsCount <= 7) {
    return null;
  }

  const getPaginationPages = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let pages = [];

    if (currentPage <= 4) {
      pages = Array.from({ length: 10 }, (_, index) => index + 1);
    } else if (currentPage >= totalPages - 2) {
      pages = Array.from({ length: 4 }, (_, index) => totalPages - 3 + index);
    } else {
      pages = Array.from({ length: 9 }, (_, index) => currentPage - 4 + index);
    }

    const result = [];

    if (pages[0] > 1) {
      result.push(1);

      if (pages[0] > 2) {
        result.push("dots");
      }
    }

    result.push(...pages);

    if (pages[pages.length - 1] < totalPages) {
      if (pages[pages.length - 1] < totalPages - 1) {
        result.push("dots");
      }

      result.push(totalPages);
    }

    return result;
  };

  const getMobilePaginationPages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const paginationPages = getPaginationPages();

  const mobilePaginationPages = getMobilePaginationPages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2 sm:hidden">
        {mobilePaginationPages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
              currentPage === page
                ? "bg-[#242831] text-white"
                : "border border-gray-700 bg-[#181b21] text-gray-400 hover:bg-[#242831] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        {paginationPages.map((page, index) => {
          if (page === "dots") {
            return (
              <span
                key={`dots-${index}`}
                aria-hidden="true"
                className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-gray-700 bg-[#181b21] px-3 text-sm font-medium text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                currentPage === page
                  ? "bg-[#242831] text-white"
                  : "border border-gray-700 bg-[#181b21] text-gray-400 hover:bg-[#242831] hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-[#181b21] text-gray-300 transition hover:bg-[#242831] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;
