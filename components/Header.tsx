import { useState, useEffect, FC } from "react";
import Link from "next/link";

import { getAvailableButtons } from "../utils/header";

interface HeaderProps {
  location: string;
  goBack: () => void;
}

const Header: FC<HeaderProps> = ({ location, goBack }) => {
  const [hasNext, setNext] = useState(getAvailableButtons("next", location));
  const [hasPrev, setPrev] = useState(getAvailableButtons("prev", location));

  useEffect(() => {
    setNext(getAvailableButtons("next", location));
    setPrev(getAvailableButtons("prev", location));
  }, [location]);

  const getBackUrl = () => (location.includes("day") ? `/${hasPrev?.user}` : "/");

  return (
    <header className="h-12 items-center flex justify-between z-10 p-2 mx-auto absolute left-4 w-1/2 md:left-1/2 md:-translate-x-1/2">
      <Link className="cursor-pointer inline-block" href={getBackUrl()} onClick={goBack}>
        <div className="flex gap-2">
          <svg fill="#fff" height={24} viewBox="0 0 320 512" width={24}>
            <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
          </svg>
          <span>Back</span>
        </div>
      </Link>
      {hasPrev ? (
        <div className="flex ml-5 font-bold gap-4 md:gap-18">
          {hasPrev?.disabled ? (
            <span className="text-gray-400 p-2 bg-glass">Anterior</span>
          ) : (
            <Link className="p-2 bg-glass" href={`/${hasPrev?.user}/${hasPrev?.year}/day${hasPrev?.day}`}>
              Anterior
            </Link>
          )}
          {hasNext?.disabled ? (
            <span className="text-gray-400 p-2 bg-glass">Siguiente</span>
          ) : (
            <Link className="p-2 bg-glass" href={`/${hasNext?.user}/${hasNext?.year}/day${hasNext?.day}`}>
              Siguiente
            </Link>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
