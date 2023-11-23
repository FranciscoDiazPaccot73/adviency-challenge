import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { generateDaysArray } from "../utils/array";

const FranComponent = dynamic(() => import("./AsideFran").then((mod) => mod.FranElements));
const JoelComponent = dynamic(() => import("./AsideJoel").then((mod) => mod.JoelElements));

const YEARS = [2022, 2023];

interface UserProps {
  userName: "fran" | "joel";
}

export const User: FC<UserProps> = ({ userName }) => {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [days, setDays] = useState<number[]>();

  useEffect(() => {
    if (selectedYear) {
      const d = generateDaysArray(selectedYear);

      setDays(d);
    }
  }, [selectedYear]);

  return (
    <div className="p-8 pt-0">
      <div className="min-h-screen flex justify-center items-center">
        <div className="mt-36 rounded-md max-w-[720px] min-h-[350px] w-full mx-auto grid grid-cols-35-65 border border-slate-500 overflow-hidden">
          <aside className="flex flex-col border-r border-slate-500 py-8">
            {YEARS?.map((year: number) => {
              const today = new Date();
              const isYearEnabled = year < today.getFullYear() || today.getMonth() === 11;

              const enabledClasses = `text-white ${selectedYear === year ? "bg-slate-600" : ""} hover:bg-slate-600`;
              const disabledClasses = "bg-gray-900 text-slate-400 cursor-not-allowed";

              return (
                <button
                  key={`button-year-${year}`}
                  className={`px-4 py-3 ${isYearEnabled ? enabledClasses : disabledClasses}`}
                  title={isYearEnabled ? year.toString() : "Disponible el 1 de diciembre de 2023"}
                  onClick={isYearEnabled ? () => setSelectedYear(year) : () => {}}
                >
                  {year}
                </button>
              );
            })}
          </aside>
          <aside>
            {days && userName === "fran" && <FranComponent days={days} selectedYear={selectedYear} />}
            {days && userName === "joel" && <JoelComponent days={days} selectedYear={selectedYear} />}
          </aside>
        </div>
      </div>
    </div>
  );
};
