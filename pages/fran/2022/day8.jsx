import Image from "next/image";
import Head from 'next/head'

import { useState } from "react";

import { getIdByName } from "../../../utils/fran";

const Day8 = () => {
  const [elements, setElements] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputAmount, setInputAmount] = useState(1);
  const [inputHasError, setError] = useState(false);

  const handleInputChange = e => {
    const { value } = e.target;
    setInputValue(value)
    setError(false)
  }

  const handleAddItem = () => {
    const elemId = getIdByName(inputValue)
    if (elements.find(elem => elem && elem.id === elemId)) {
      setError(true)
    } else {
      const newElem = { name: inputValue, amount: inputAmount, id: getIdByName(inputValue) }
      const newElems = [...elements, newElem ];
      setInputValue('')
      setInputAmount(1)
  
      setElements(newElems)
    }
  }

  const deleteItem = (id) => {
    const elemId = getIdByName(id)
    const elemIndex = elements.findIndex(elem => elem.id === elemId);
    let newElems = [...elements]
    if (newElems[elemIndex].amount >= 2) {
      newElems[elemIndex].amount = newElems[elemIndex].amount - 1
    } else {
      newElems = elements.filter(elem => elem.id !== elemId)
    }

    setElements(newElems)
  }

  const handleInputAmount = (action = 'remove') => {
    if (action === 'remove') {
      setInputAmount(prevValue => parseInt(prevValue - 1))
    } else {
      setInputAmount(prevValue => prevValue + 1)
    }
  }

  return (
    <>
      <Head>
        <title>FRAN | Adviency Challenge | Dia 8</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen p-8 pt-0 bg-[url('/christmas.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
        <div className="relative p-6 rounded-md flex flex-col justify-center items-center border border-white md:p-12">
          <p className=" text-2xl mb-4 w-full">Regalos:</p>
          <div className="flex gap-4 mb-7">
            <div className="relative">
              <input className="p-2 rounded-md" type="text" onChange={handleInputChange} value={inputValue} />
              {inputHasError ? <p className="absolute left-2 text-sm text-red-600">Ya cargaste este regalo :(</p> : null}
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-full w-4 h-4 flex items-center justify-center ${inputAmount === 1 ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`}
                disabled={inputAmount === 1}
                onClick={() => handleInputAmount()}>-</button>
              {inputAmount}
              <button
                className={`rounded-full w-4 h-4 flex items-center justify-center bg-red-700 hover:bg-green-800`}
                onClick={() => handleInputAmount('add')}>+</button>
            </div>
            <button disabled={inputValue === ''} className={`rounded-full px-4 ${inputValue === '' ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`} onClick={handleAddItem}>Agregar</button>
          </div>
          <ul className="flex justify-center flex-col w-full">
            {elements?.map(elem => {
              if (!elem.id) return null;

              return (
                <li key={elem.name} className="w-full flex">
                  <span>{elem.name}</span>
                  <div className="ml-auto flex gap-2">
                    <p>x{elem.amount}</p>
                    <div className="cursor-pointer px-3 hover:text-red-700" onClick={() => deleteItem(elem.name)}>{elem.amount >= 2 ? '-' : 'X'}</div>
                  </div>
                </li>
              )
            })}
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
    </>
  )
};

export default Day8;
  