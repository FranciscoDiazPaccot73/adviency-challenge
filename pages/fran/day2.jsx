const ELEMENTS = ['Medias', 'Caramelos', 'Vitel Tone']

const Day2 = () => (
  <div className="p-8 pt-0">
    <div className="min-h-screen pb-16 flex-1 flex flex-col justify-center items-center">
      <p className=" text-4xl mb-8">Regalos</p>
      <ul className="flex items-center justify-center flex-col">
        {ELEMENTS?.map(elem => (
          <li key={elem}>{elem}</li>
        ))}
      </ul>
    </div>
  </div>
);
  export default Day2;
  