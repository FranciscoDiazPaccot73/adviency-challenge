import Results from "../../components/Results"

import { generateFiles } from "../../utils"
import { generateDaysArray } from "../../utils/array"

const USER = 'joel';

const Joel = ({ days }) => <Results days={days} user={USER} />

export async function getStaticProps(context) {
  generateFiles(USER)
  const days = generateDaysArray()

  return {
    props: { days },
  }
}

export default Joel;