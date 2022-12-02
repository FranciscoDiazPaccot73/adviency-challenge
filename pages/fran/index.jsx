import Link from "next/link"

import { generateFiles, generateDaysArray } from "../../utils"

const Fran = ({ days }) => {
  return (
    <div className="p-8 pt-0">
      <div className="min-h-screen pb-16 flex-1 flex flex-col justify-center items-center">
        <p>Resultados por dia:</p>
        <ul className="mt-6">
          {days?.map((day) => <li key={day}><Link href={`/fran/day${day}`}>{`Dia ${day}`}</Link></li>)}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  generateFiles('fran')
  const days = generateDaysArray()

  return {
    props: { days },
  }
}

export default Fran;
