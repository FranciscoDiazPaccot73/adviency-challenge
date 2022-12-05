import Image from "next/image";

import { useState } from "react";

const Day5 = () => {
  const [elements, setElements] = useState(['Medias', 'Caramelos', 'Vitel Tone']);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setInputValue(value)
  }

  const handleAddItem = () => {
    const newElems = [...new Set([...elements, inputValue])];
    setInputValue('')

    setElements(newElems)
  }

  const deleteItem = (id) => {
    const newElems = elements.filter(elem => elem !== id)

    setElements(newElems)
  }

  return (
    <div className="min-h-screen p-8 pt-0 bg-[url('/christmas.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
      <div className="relative p-6 rounded-md flex flex-col justify-center items-center border border-white md:p-12">
        <p className=" text-2xl mb-4 w-full">Regalos:</p>
        <div className="flex gap-4 mb-6">
          <input className="p-2 rounded-md" type="text" onChange={handleInputChange} value={inputValue} />
          <button className="rounded-full bg-red-700 px-4 hover:bg-green-800" onClick={handleAddItem}>Agregar</button>
        </div>
        <ul className="flex justify-center flex-col w-full">
          {elements?.map(elem => (
            <li key={elem} className="w-full flex">
              <span>{elem}</span>
              <div className="ml-auto cursor-pointer px-3 hover:text-red-700" onClick={() => deleteItem(elem)}>X</div>
            </li>
          ))}
        </ul>
        <div className="absolute left-28 -top-10 md:left-36 md:-top-4">
          <Image src="/gnome.webp" alt="Gnome" width={120} height={80} />
        </div>
        {elements?.length ? (
          <button onClick={() => setElements([])} className="w-full mt-8 rounded-full bg-red-700 py-1 hover:bg-green-800">
            Borrar todo
          </button>
        ) : <p>Carga tu primer regalo a la lista :)</p>}
      </div>
    </div>
)
};
  
export default Day5;
