import { useState, useEffect, useRef } from "react";

import { generateRandomID } from "../../utils/fran";
import Image from "next/image";

const PRESENTS =[
  { name: 'Campera', price: 12000, image: '' },
  { name: 'Remera', price: 5000, image: '' },
  { name: 'Zapatillas', price: 37500, image: '' },
  { name: 'Buzo', price: 6000, image: '' },
  { name: 'Gorra', price: 3200, image: '' },
  { name: 'Medias', price: 1700, image: '' },
  { name: 'Pantalon', price: 7500, image: '' },
]

const Modal = ({ show, onCancel, onAdd, elements, gnome = false, editItem }) => {
  const DEFAULT_VALUES = { name: '', amount: 1, url: '', receiver: '', price: '' }
  const [values, setValues] = useState({...DEFAULT_VALUES, id: generateRandomID()})
  const [inputHasError, setError] = useState(false);
  const presentRef = useRef()

  useEffect(() => {
    if (show) presentRef.current.focus();
  }, [show])

  useEffect(() => {
    editItem && setValues(editItem)
  }, [editItem])

  const handleInputChange = e => {
    const { value, name } = e.target;
    const obj = { ...values }
    setError(false)

    if (name === 'gift') {
      obj.name = value;
    } else if (name === 'url') {
      obj.url = value;
    } else if(name === 'price') {
      obj.price = value;
    } else {
      obj.receiver = value;
    }
    setValues(obj)
  }
  const resetInputs = () => {
    setValues({...DEFAULT_VALUES, id: generateRandomID()})
  }
  
  const handleAddItem = () => {
    const rec = values.receiver !== '' ? values.receiver : 'Yo';
    const currentElem = elements.find(elem => elem && elem.name === values.name && elem.receiver === rec)
    if ((currentElem && !editItem) || (currentElem && editItem && currentElem.amount === values.amount && editItem)) {
      setError(true)
    } else {
      let newElem = { ...values, id: generateRandomID(), receiver: rec }
      let newElems = [...elements, newElem ];
      const myElem = elements.find(elem => elem && elem.id === values.id)
      if (editItem && myElem) {
        newElem = { ...values, receiver: rec }
        newElems = [];
        elements.forEach(elem => {
          let mutedElem = { ...elem };
          if (elem.id === myElem.id) {
            mutedElem = newElem;
          }
          newElems.push(mutedElem)
        })
      }
      resetInputs()
      onAdd(newElems)
    }
  }

  const handleInputAmount = (action = 'remove') => {
    const obj = { ...values };
    setError(false)
    if (action === 'remove') {
      obj.amount -= 1;
    } else {
      obj.amount += 1;
    }
    setValues(obj)
  }

  const handleCancel = () => {
    onCancel()
    resetInputs()
    setError(false)
  }

  const getSuggestion = () => {
    const presents = PRESENTS.filter(p => p.name !== values?.name);
    
    const { name, price, image } = presents[Math.floor(Math.random()*presents.length)];

    setValues({ ...values, name, price, image })
  }

  return (
    <div className={`fran-modal-wrapper ${show ? 'open' : ''}`}>
      <div className={`rounded-md bg-glass glass-white-border fran-modal ${show ? 'open' : ''}`}>
        <div>
          <div className="flex gap-4 flex-col items-center mb-8 md:items-baseline md:flex-row">
            <div className="relative mb-4 md:mb-0">
              <div className="relative">
                <input ref={presentRef} placeholder="Regalo" name="gift" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={values.name} />
                <button onClick={getSuggestion} className="absolute rounded-r-md text-sm right-0 top-0 h-10 px-2 bg-gray-700 border-l border-l-white hover:bg-green-800">Sugerir</button>
              </div>
              {inputHasError ? <p className="absolute left-2 text-sm text-red-600">Ya cargaste este regalo :(</p> : null}
            </div>
            <input name="receiver" placeholder="Destinatario" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={values.receiver} />
          </div>
          <div className="flex gap-4 flex-col items-center md:items-baseline md:flex-row">
            <input name="url" placeholder="Image URL" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={values.url} />
            <div className="flex items-center gap-2 w-full text-lg justify-center md:justify-start">
              <input onChange={handleInputChange} name="price" placeholder="Precio" type="number" value={values.price} className="p-2 rounded-md price-input-element" />
              <button
                className={`rounded-full w-4 h-4 flex items-center justify-center ${values.amount === 1 ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`}
                disabled={values.amount === 1}
                onClick={() => handleInputAmount()}>-</button>
              {values.amount}
              <button
                className={`rounded-full w-4 h-4 flex items-center justify-center bg-red-700 hover:bg-green-800`}
                onClick={() => handleInputAmount('add')}>+</button>
            </div>
          </div>
          <div className="relative mt-10 w-full flex gap-6">
            {gnome ? (
              <div className="absolute -top-14 right-0">
                <Image src="/gnome.webp" alt="Gnome" width={65} height={30} />
              </div>
            ) : null}
            <button className="w-1/2 hover:text-red-700" onClick={handleCancel}>Cancelar</button>
            <button disabled={values.name === ''} className={`rounded-full px-4 w-1/2 h-10 ${values.name === '' ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`} onClick={handleAddItem}>
              {`${editItem ? 'Confirmar' : 'Agregar'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
