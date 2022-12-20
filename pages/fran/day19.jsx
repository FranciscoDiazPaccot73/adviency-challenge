import Image from "next/image";
import Head from 'next/head'
import { useState, useEffect, useRef } from "react";

import Modal from "../../components/fran/Modal";

import { getTotal, generateRandomID } from "../../utils/fran";

const Day19 = () => {
  const [elements, setElements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [total, setTotal] = useState(0)
  const itemToEdit = useRef()
  const options = { style: 'currency', currency: 'ARS' };
  const numberFormat = new Intl.NumberFormat('es-AR', options);

  useEffect(() => {
    const items = localStorage.getItem('fran')
    if (items) {
      setElements(JSON.parse(items))
      setTotal(getTotal(JSON.parse(items)))
    }

    fetch('/api/fran').then(async data => {
      const json = await data.json()
      console.log(json)
    })
    
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

  const deleteItem = (elemId) => {
    const elemIndex = elements.findIndex(elem => elem.id === elemId);
    let newElems = [...elements]
    if (newElems[elemIndex].amount >= 2) {
      newElems[elemIndex].amount = newElems[elemIndex].amount - 1
    } else {
      newElems = elements.filter(elem => elem.id !== elemId)
    }

    setElements(newElems)
    setTotal(getTotal(newElems))
    updateLocalStorage(newElems)
  }

  const handleDeleteAll = () => {
    setElements([])
    setTotal(getTotal([]))
    localStorage.removeItem('fran')
  }

  const handleAdd = (newElems) => {
    setElements(newElems)
    setTotal(getTotal(newElems))
    updateLocalStorage(newElems)

    handleResetModal()
  }

  const handleResetModal = () => {
    itemToEdit.current = null;
    setShowModal(false)
  }
  
  const handleEdit = (item, isDuplicate = false) => {
    const newItem = { ...item };
    itemToEdit.current = newItem

    if (isDuplicate) {
      itemToEdit.current.id = generateRandomID()
    }

    setShowModal(true)
  }

  return (
    <>
      <Head>
        <title>FRAN | Dia 19 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen p-8 pt-0 bg-[url('/christmas.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
        <Modal show={showModal} onCancel={handleResetModal} onAdd={handleAdd} elements={elements} gnome editItem={itemToEdit.current} />
        <div className="relative p-6 rounded-md flex flex-col justify-center items-center bg-glass border glass-white-border bg-glass-minimus md:p-8">
          <p className={`text-2xl mb-4 w-full splash-bg ${showSplash ? 'hide' : ''}`}>Regalos:</p>
          <button className={`w-full rounded-full h-10 flex items-center justify-center mb-8 bg-red-700 hover:bg-green-800 splash-bg ${showSplash ? 'hide' : ''}`} onClick={() => setShowModal(prevValue => !prevValue)}>AGREGAR REGALOS</button>
          <ul className={`flex justify-center flex-col w-full splash-bg ${showSplash ? 'hide' : ''}`}>
            {elements?.map(elem => {
              if (!elem.id) return null;
              
              return (
                <li key={elem.id} className="w-full flex items-center mt-3">
                  <img src={elem.url !== '' ? elem.url : '/default-image.png'} alt={elem.name} width={42} height={42} className='mr-2' />
                  <div>
                    <div className="flex items-center">
                      <span>{elem.name}</span>
                      <p className="ml-2 text-xs">({elem.amount})</p>
                    </div>
                    <p className="text-xs font-bold">{numberFormat.format(elem.price * elem.amount)}</p>
                    <p className="text-xs text-slate-400">{elem.receiver}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="cursor-pointer px-3 hover:text-red-700" onClick={() => handleEdit(elem)}>E</button>
                    <button className="cursor-pointer px-3 hover:text-red-700" onClick={() => handleEdit(elem, true)}>D</button>
                    <button className="cursor-pointer px-3 hover:text-red-700" onClick={() => deleteItem(elem.id)}>{elem.amount >= 2 ? '-' : 'X'}</button>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className={`absolute splash ${!showSplash ? 'move' : ''}`}>
            <Image src="/gnome.webp" alt="Gnome" width={120} height={80} />
          </div>
          <div className={`w-full splash-bg ${showSplash ? 'hide' : ''}`}>
            {elements?.length ? (
              <div>
                <div className="my-4 border-t">
                  <p className="font-bold pt-3">{`Total: ${numberFormat.format(total)}`}</p>
                </div>
                <button onClick={handleDeleteAll} className="w-full mt-5 rounded-full border border-red-700 text-white py-1 hover:bg-red-700">
                  Borrar todo
                </button>
              </div>
            ) : <p>Carga tu primer regalo a la lista :)</p>}
          </div>
        </div>
      </div>
    </>
  )
};

export default Day19;
  