import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Day9 = () => {

  const [input, setInput] = useState('');
  const [gifts, setGifts] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(()=>{
    const storedGift = JSON.parse(localStorage.getItem("gifts"));
    if(storedGift){
      setGifts(storedGift)
    }
  }, [])

  const addGift = () => {
    if (gifts.find((item) => item.title === input)) {
      toast.error("Ya has agregado ese regalo", {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }
    else {
      const newGift = { id: input, title: input, qty: count };
      const newGifts = ([newGift, ...gifts]);
      setGifts(newGifts);
      setInput('');
      setCount(1);
      localStorage.setItem('gifts', JSON.stringify(newGifts));
    }
  }

  const deleteGift = (elem) => {
    const giftToDelete = gifts.filter((item) => item.id !== elem.id)
    setGifts(giftToDelete)
    localStorage.setItem('gifts', JSON.stringify(giftToDelete))
  }


  return (
    <>
      <Head>
        <title>JOEL | Dia 9 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 9: La gente está triste por que al cerrar la aplicación pierde todos sus regalos 😢. Usemos localStorage para guardar los regalos en el dispositivo del usuario y cargarlos cuando vuelve!
        </h1>
      </section>

      <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
        <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
          <p className='font-title p-10 text-3xl '>Lista de regalos</p>
          <div className='max-w-[100%] flex justify-evenly'>
            <Toaster />
            <input className='p-2 w-4/6 rounded-lg'
              type="text"
              value={input}
              placeholder='Agrega un regalo 🎅'
              onChange={(e) => setInput(e.target.value)} />
            <input className='p-1 w-2/12 rounded-lg'
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(e.target.value)} />
          </div>
          <button
            className='bg-red-600 rounded-xl m-2 p-2 w-5/6 disabled:opacity-80'
            onClick={addGift}
            disabled={input === ''}>
            Agregar
          </button>
          <ul className='bg-gray-800/50 m-8 w-5/6 p-1 rounded-xl'>
            {(gifts.length) === 0 ?
              <p className='text-center'>No hay regalos en lista 💔</p>
              :
              gifts.map((gift) => {
                return <li className='flex items-center justify-between bg-gray-800/80 rounded-lg m-2 p-2'
                  key={gift.id}>
                  <div className='flex justify-between w-5/6'>
                    <p>{gift.title}</p>
                    <p className='opacity-50'>x {gift.qty}</p>
                  </div>
                  <button className='text-xl text-center bg-red-600 px-2 rounded-lg'
                    onClick={() => deleteGift(gift)}>🗑</button>
                </li>
              })
            }
          </ul>
          <button
            className='bg-red-600 rounded-xl m-2 p-2 w-5/6'
            onClick={() => setGifts([])}>
            Borrar todo
          </button>
        </div>
      </section>
    </>
  )
}
  ;
export default Day9;
