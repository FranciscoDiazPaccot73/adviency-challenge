import { useState } from "react";

const Modal = ({ show }) => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inputAmount, setInputAmount] = useState(1);
  const [inputHasError, setError] = useState(false);

  console.log(show)

  const handleInputChange = e => {
    const { value, name } = e.target;

    if (name === 'gift') {
      setInputValue(value)
      setError(false)
    } else {
      setImageUrl(value)
    }
  }
  
  const handleAddItem = () => {
    const elemId = getIdByName(inputValue)
    if (elements.find(elem => elem && elem.id === elemId)) {
      setError(true)
    } else {
      const newElem = { name: inputValue, amount: inputAmount, id: getIdByName(inputValue), url: imageUrl }
      const newElems = [...elements, newElem ];
      setInputValue('')
      setInputAmount(1)
      setImageUrl('')
  
      setElements(newElems)
      updateLocalStorage(newElems)
    }
  }

  const handleInputAmount = (action = 'remove') => {
    if (action === 'remove') {
      setInputAmount(prevValue => parseInt(prevValue - 1))
    } else {
      setInputAmount(prevValue => prevValue + 1)
    }
  }

  return (
    <div className={`fran-modal ${show ? 'open' : ''}`}>
      <div className="flex gap-4 mb-7 flex-col items-center md:items-baseline md:flex-row">
        <div className="relative">
          <input placeholder="Regalo" name="gift" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={inputValue} />
          {inputHasError ? <p className="absolute left-2 text-sm text-red-600">Ya cargaste este regalo :(</p> : null}
        </div>
        <input name="url" placeholder="Image URL" className="p-2 rounded-md" type="text" onChange={handleInputChange} value={imageUrl} />
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
        <button disabled={inputValue === ''} className={`rounded-full px-4 h-10 ${inputValue === '' ? 'bg-red-900 text-slate-300' : 'bg-red-700 hover:bg-green-800'}`} onClick={handleAddItem}>Agregar</button>
      </div>
    </div>
  )
}

export default Modal;
