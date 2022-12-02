import Link from "next/link"

const Results = ({ days, user }) => (
  <div className="p-8 pt-0">
    <div className="min-h-screen pb-16 flex-1 flex flex-col justify-center items-center">
      <p>Resultados por dia:</p>
      <ul className="mt-6">
        {days?.map((day) => <li key={day}><Link href={`/${user}/day${day}`}>{`Dia ${day}`}</Link></li>)}
      </ul>
    </div>
  </div>
)

export default Results;
