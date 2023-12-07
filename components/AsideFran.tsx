import dynamic from "next/dynamic";
import { FC } from "react";

const FranComponent2022: any = dynamic(() => import("../pages/fran/2022"));
const FranComponent2023: any = dynamic(() => import("../pages/fran/2023"));

export interface ElementsProps {
  selectedYear?: number;
  days: number[];
}

export const FranElements: FC<ElementsProps> = ({ selectedYear, days }) => {
  if (!selectedYear) return null;

  return (
    <aside>
      {selectedYear === 2022 && <FranComponent2022 days={days} />}
      {selectedYear === 2023 && <FranComponent2023 days={days} />}
    </aside>
  );
};
