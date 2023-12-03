import Results from "../../../components/Results";

import { generateFiles } from "../../../utils";
import { generateDaysArray } from "../../../utils/array";

const INFO = {
  user: "joel",
  year: "2023",
  whatToDo: "https://twitter.com/goncy/status/1730572226565386677",
};

const Joel = ({ days }) => <Results days={days} user={INFO.user} whatToDo={INFO.whatToDo} year={INFO.year} />;

export async function getStaticProps(context) {
  generateFiles(INFO.user, INFO.year);
  const days = generateDaysArray(INFO.year);

  return {
    props: { days },
  };
}

export default Joel;
