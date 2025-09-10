"use client";

type PaginationProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black cursor-pointer"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        Prev
      </button>

      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black cursor-pointer hover:bg-gray-300 hover:text-black"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
