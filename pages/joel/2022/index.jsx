import Results from '../../../components/Results';

import { generateFiles } from '../../../utils';
import { generateDaysArray } from '../../../utils/array';

const INFO = {
  user: 'joel',
  year: '2022',
  whatToDo: 'https://twitter.com/goncy/status/1597581740746637314',
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
