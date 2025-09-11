"use client";

import Link from "next/link";

type PaginationProps = {
  limit: number;
  offset: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  router: any;
};

export default function Pagination({
  limit,
  offset,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  router,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      {hasPrev && <Link href={`/?offset=0&limit=${limit}`}>{"<<"}</Link>}
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
        onChange={(e) =>
          router.push(`/?offset=${offset}&limit=${e.target.value}`)
        }
      >
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
