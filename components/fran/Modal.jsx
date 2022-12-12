import { useState } from "react";

import { getIdByName } from "../../utils/fran";
import Image from "next/image";

const Modal = ({ show, onCancel, onAdd, elements, gnome = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inputAmount, setInputAmount] = useState(1);
  const [receiver, setReceiver] = useState('');
  const [inputHasError, setError] = useState(false);

  const handleInputChange = e => {
    const { value, name } = e.target;

    if (name === 'gift') {
      setInputValue(value)
      setError(false)
    } else if (name === 'url') {
      setImageUrl(value)
    } else {
      setReceiver(value)
    }
  }
  const resetInputs = () => {
    setInputAmount(1)
    setInputValue('')
    setImageUrl('')
    setReceiver('')
  }
  
  const handleAddItem = () => {
    const elemId = getIdByName(inputValue)
    if (elements.find(elem => elem && elem.id === elemId)) {
      setError(true)
    } else {
      const rec = receiver !== '' ? receiver : 'Yo';
      const newElem = { name: inputValue, amount: inputAmount, id: getIdByName(inputValue), url: imageUrl, receiver: rec }
      const newElems = [...elements, newElem ];
      resetInputs()
      onAdd(newElems)
    }
  }

  const handleInputAmount = (action = 'remove') => {
    if (action === 'remove') {
      setInputAmount(prevValue => parseInt(prevValue - 1))
    } else {
      setInputAmount(prevValue => prevValue + 1)
    }
  }

  const handleCancel = () => {
    onCancel()
    resetInputs()
  }

  return (
    <div className={`fran-modal-wrapper ${show ? 'open' : ''}`}>
      <div className={`rounded-md bg-glass glass-white-border fran-modal ${show ? 'open' : ''}`}>
        <div>
          <div className="flex gap-4 flex-col items-center mb-8 md:items-baseline md:flex-row">
            <div className="relative mb-4 md:mb-0">
              <input placeholder="Regalo" name="gift" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={inputValue} />
              {inputHasError ? <p className="absolute left-2 text-sm text-red-600">Ya cargaste este regalo :(</p> : null}
            </div>
            <input name="receiver" placeholder="Destinatario" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={receiver} />
          </div>
          <div className="flex gap-4 flex-col items-center md:items-baseline md:flex-row">
            <input name="url" placeholder="Image URL" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={imageUrl} />
            <div className="flex items-center gap-2 w-full justify-center text-lg">
              <button
                className={`rounded-full w-4 h-4 flex items-center justify-center ${inputAmount === 1 ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`}
                disabled={inputAmount === 1}
                onClick={() => handleInputAmount()}>-</button>
              {inputAmount}
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
            <button disabled={inputValue === ''} className={`rounded-full px-4 w-1/2 h-10 ${inputValue === '' ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`} onClick={handleAddItem}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
