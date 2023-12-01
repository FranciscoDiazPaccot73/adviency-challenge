import { FC } from "react";
import Results from "../../../components/Results";

import { generateFiles } from "../../../utils";
import { generateDaysArray } from "../../../utils/array";

const INFO = {
  user: "fran",
  year: 2023,
  whatToDo: "https://twitter.com/goncy/status/1730572226565386677",
};

interface FranProps {
  days: number[];
}

const Fran: FC<FranProps> = ({ days }) => <Results days={days} user={INFO.user} year={INFO.year} />;

export async function getStaticProps() {
  generateFiles(INFO.user, INFO.year, "tsx");
  const days = generateDaysArray(INFO.year);

  return {
    props: { days },
  };
}

export default Fran;
