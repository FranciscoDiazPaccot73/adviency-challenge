import Results from '../../../components/Results';

import { generateFiles } from '../../../utils';
import { generateDaysArray } from '../../../utils/array';

const INFO = {
  user: 'joel',
  year: '2023',
};

const Joel = ({ days }) => <Results days={days} user={INFO.user} year={INFO.year} />;

export async function getStaticProps(context) {
  generateFiles(INFO.user, INFO.year);
  const days = generateDaysArray(INFO.year);

  return {
    props: { days },
  };
}

export default Joel;
