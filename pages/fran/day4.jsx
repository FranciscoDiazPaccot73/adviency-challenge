import { useState } from "react";

const Day4 = () => {
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
      <div className="p-12 rounded flex flex-col justify-center items-center bg-slate-900">
        <p className=" text-4xl mb-8">Regalos:</p>
        <div className="flex gap-6 mb-6">
          <input className="p-2" type="text" onChange={handleInputChange} value={inputValue} />
          <button onClick={handleAddItem}>Agregar</button>
        </div>
        <ul className="flex justify-center flex-col w-full">
          {elements?.map(elem => (
            <li key={elem} className="w-full flex">
              <span>{elem}</span>
              <div className="ml-auto cursor-pointer px-3" onClick={() => deleteItem(elem)}>X</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
)
};
  
export default Day4;
  