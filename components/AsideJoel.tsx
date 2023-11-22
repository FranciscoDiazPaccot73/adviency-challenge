import dynamic from "next/dynamic";
import { FC } from "react";
import { ElementsProps } from "./AsideFran";

const JoelComponent2022 = dynamic(() => import("../pages/joel/2022"));
const JoelComponent2023 = dynamic(() => import("../pages/joel/2023"));

export const JoelElements: FC<ElementsProps> = ({ selectedYear, days }) => {
  if (!selectedYear) return null;

  return (
    <aside>
      {selectedYear === 2022 && <JoelComponent2022 days={days} />}
      {selectedYear === 2023 && <JoelComponent2023 days={days} />}
    </aside>
  );
};
