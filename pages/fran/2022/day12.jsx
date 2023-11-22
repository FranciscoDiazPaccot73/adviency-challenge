import Image from "next/image";
import Head from 'next/head'
import { useState, useEffect } from "react";

import Modal from "../../../components/fran/Modal";

import { getIdByName } from "../../../utils/fran";

const Day12 = () => {
  const [elements, setElements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const items = localStorage.getItem('fran')
    if (items) {
      setElements(JSON.parse(items))
    }
    
    setTimeout(() => {
      setShowSplash(false)
    }, 500);
  }, [])

  const updateLocalStorage = (newItems) => {
    if (newItems.length) {
      const itemsString = JSON.stringify(newItems);
      
      localStorage.setItem('fran', itemsString)
    } else {
      localStorage.removeItem('fran')
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
    updateLocalStorage(newElems)
  }

  const handleDeleteAll = () => {
    setElements([])
    localStorage.removeItem('fran')
  }

  const handleAdd = (newElems) => {
    setElements(newElems)
    updateLocalStorage(newElems)

    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>FRAN | Adviency Challenge | Dia 12</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen p-8 pt-0 bg-[url('/christmas.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
        <Modal show={showModal} onCancel={() => setShowModal(false)} onAdd={handleAdd} elements={elements} gnome />
        <div className="relative p-6 rounded-md flex flex-col justify-center items-center bg-glass border glass-white-border bg-glass-minimus md:p-8">
          <p className={`text-2xl mb-4 w-full splash-bg ${showSplash ? 'hide' : ''}`}>Regalos:</p>
          <button className={`w-full rounded-full h-10 flex items-center justify-center mb-8 bg-red-700 hover:bg-green-800 splash-bg ${showSplash ? 'hide' : ''}`} onClick={() => setShowModal(prevValue => !prevValue)}>AGREGAR REGALOS</button>
          <ul className={`flex justify-center flex-col w-full splash-bg ${showSplash ? 'hide' : ''}`}>
            {elements?.map(elem => {
              if (!elem.id) return null;

              return (
                <li key={elem.name} className="w-full flex items-center mt-3">
                  <img src={elem.url !== '' ? elem.url : '/default-image.png'} alt={elem.name} width={42} height={42} className='mr-2' />
                  <div>
                    <div className="flex items-center">
                      <span>{elem.name}</span>
                      <p className="ml-2 text-xs">({elem.amount})</p>
                    </div>
                    <p className="text-xs text-slate-400">{elem.receiver}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <div className="cursor-pointer px-3 hover:text-red-700" onClick={() => deleteItem(elem.name)}>{elem.amount >= 2 ? '-' : 'X'}</div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className={`absolute splash ${!showSplash ? 'move' : ''}`}>
            <Image src="/gnome.webp" alt="Gnome" width={120} height={80} />
          </div>
          <div className={`splash-bg ${showSplash ? 'hide' : ''}`}>
            {elements?.length ? (
              <button onClick={handleDeleteAll} className="w-full mt-10 rounded-full bg-red-700 py-1 hover:bg-green-800">
                Borrar todo
              </button>
            ) : <p>Carga tu primer regalo a la lista :)</p>}
          </div>
        </div>
      </div>
    </>
  )
};

export default Day12;
  