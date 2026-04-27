type Props = {
  currentPage: number; // current active page
  totalPages: number; // total number of pages available
  setCurrentPage: (page: number) => void; // function to change page
};

/**
 * =========================================================
 * TASK PAGINATION COMPONENT
 * - Displays current page info
 * - Provides navigation (Prev / Next / Page numbers)
 * - Handles page switching
 * =========================================================
 */
export function TaskPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  /**
   * =========================================================
   * GUARD: DO NOT RENDER IF ONLY ONE PAGE
   * =========================================================
   */
  if (totalPages <= 1) return null;

  return (
    /**
     * =========================================================
     * PAGINATION WRAPPER
     * =========================================================
     */
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50">
      {/* ================= PAGE INFO ================= */}
      <p className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>

      {/* ================= CONTROLS ================= */}
      <div className="flex items-center gap-2">
        {/* -------- PREVIOUS BUTTON -------- */}
        <button
          onClick={
            () => setCurrentPage(Math.max(currentPage - 1, 1)) // prevent going below 1
          }
          disabled={currentPage === 1} // disable if first page
          className={`px-3 py-1.5 text-sm rounded-md border transition
            ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed" // disabled state
                : "hover:bg-gray-100" // active state
            }`}
        >
          Prev
        </button>

        {/* -------- PAGE NUMBERS -------- */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)} // jump to page
                className={`w-9 h-9 text-sm rounded-md border transition
                  ${
                    currentPage === page
                      ? "bg-black text-white border-black" // active page
                      : "hover:bg-gray-100" // inactive page
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* -------- NEXT BUTTON -------- */}
        <button
          onClick={
            () => setCurrentPage(Math.min(currentPage + 1, totalPages)) // prevent overflow
          }
          disabled={currentPage === totalPages} // disable if last page
          className={`px-3 py-1.5 text-sm rounded-md border transition
            ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed" // disabled state
                : "hover:bg-gray-100" // active state
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
