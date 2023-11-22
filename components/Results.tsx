import Link from "next/link";
import { FC } from "react";
import TwitterIcon from "./icons/TwitterIcon";

interface ResultsProps {
  days?: number[];
  user: string;
  year: number;
  whatToDo?: string;
}

const Results: FC<ResultsProps> = ({ days, user, year, whatToDo }) => (
  <div className="px-8 pb-8">
    <div className="min-h-screen flex-1 flex flex-col justify-center items-center">
      {whatToDo && (
        <a
          className="mt-8"
          href={whatToDo}
          rel="noreferrer"
          target="_blank"
          title="Ver consigna en Twitter"
        >
          <TwitterIcon />
        </a>
      )}
      <p>Resultados por dia:</p>
      <ul className="mt-6">
        {days?.map((day) => (
          <li key={day}>
            <Link href={`/${user}/${year}/day${day}`}>{`Dia ${day}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Results;
