import Results from "../../components/Results"

import { generateFiles, generateDaysArray } from "../../utils"

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