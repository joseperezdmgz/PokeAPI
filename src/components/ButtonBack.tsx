"use client";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  return (
    <button
      className="p-2 cursor-pointer underline underline-offset-4"
      onClick={() => router.back()}
    >
      {"<"} Volver
    </button>
  );
}
