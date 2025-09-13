import Link from "next/link";

export default function Header() {
  return (
    <div className="text-white md:text-2xl flex justify-between items-center py-4 border-b border-gray-300 mb-4">
      <Link href="/" className="flex items-center">
        <h1>PokeAPI</h1>
        <img src="/img/logo.png" alt="" className="w-10" />
      </Link>
      <ul className="flex gap-2 md:gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="https://pokeapi.co" target="_blank">
            Docs
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
