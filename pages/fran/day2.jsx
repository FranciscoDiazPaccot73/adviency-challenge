const ELEMENTS = ['Medias', 'Caramelos', 'Vitel Tone']

const Day2 = () => (
  <div className="min-h-screen p-8 pt-0 bg-[url('/christmas.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
    <div className="p-32 rounded flex flex-col justify-center items-center bg-slate-900 w-40 h-48">
      <p className=" text-4xl mb-8">Regalos:</p>
      <ul className="flex items-center justify-center flex-col">
        {ELEMENTS?.map(elem => (
          <li key={elem}>{elem}</li>
        ))}
      </ul>
    </div>
  </div>
);
  export default Day2;
  