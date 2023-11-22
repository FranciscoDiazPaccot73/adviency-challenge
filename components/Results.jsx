import Link from 'next/link';
import TwitterIcon from './icons/TwitterIcon';

const Results = ({ days, user, year }) => (
  <div className="p-8 pt-0">
    <div className="min-h-screen pb-16 flex-1 flex flex-col justify-center items-center">
      <a className="mt-8" href="https://twitter.com/goncy/status/1597581740746637314" rel="noreferrer" target="_blank">
        <TwitterIcon />
      </a>
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
