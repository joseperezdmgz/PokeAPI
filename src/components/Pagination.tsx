"use client";

type PaginationProps = {
  count: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  offset: number;
  onOffsetChange: (offset: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({
  limit,
  onLimitChange,
  offset,
  onOffsetChange,
  onPrev,
  onNext,
  count,
}: PaginationProps) {
  const hasPrev = Number(offset) > 0;
  const hasNext = Number(offset) + limit < count;

  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      {hasPrev && (
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black cursor-pointer"
          onClick={() => onOffsetChange(0)}
        >
          {"<<"}
        </button>
      )}

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
      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
