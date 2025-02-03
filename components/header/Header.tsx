import React from "react";
import Image from "next/image";

import Logo from "../../public/levity_logo.svg";

export function Header() {
  return (
    <header className="flex justify-between items-center font-mono bg-gray-100 px-4 py-4 md:px-8">
      <Image alt="alt" src={Logo} width={96} height={40} />
      <nav>
        <ul className="flex gap-x-6">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
