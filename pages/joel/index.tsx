import Link from 'next/link';

const YEARS = ['2022', '2023'];

export const USER = 'joel';

const Joel = ({ days }) => (
  <div className="p-8 pt-0">
    <div className="min-h-screen pb-16 flex-1 flex justify-center items-center gap-4">
      {YEARS?.map((year: string) => (
        <Link className="px-4 py-2 rounded-md bg-slate-400 text-center text-black hover:bg-slate-500" href={`/${USER}/${year}`}>
          {year}
        </Link>
      ))}
    </div>
  </div>
);

export default Joel;
