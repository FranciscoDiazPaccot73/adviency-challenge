import Head from 'next/head';
import { useState } from 'react';

  const Day5 = () => {

    const [input, setInput] = useState('');
    const [gifts, setGifts] = useState([]);

    const addGift = () => {
      const newGift = ([input, ...gifts]);
      setGifts(newGift);
      setInput('')
    }

    const deleteGift = (elem) => {
      const giftToDelete = gifts.filter((item) => item !== elem);
      setGifts(giftToDelete);
    }

    return(
      <>
      <Head>
        <title>JOEL | Dia 5 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 5: La gente está muy indecisa y agrega muchos regalos y después los debe borrar de a uno! Agreguemos un botón para eliminar todos los regalos a la vez!
        </h1>
      </section>

      <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
        <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
          <p className='font-title p-10 text-3xl '>Lista de regalos</p>
          <input className='p-2 w-5/6 rounded-lg'
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)} />
          <button
            className='bg-red-600 rounded-xl m-2 p-2 w-5/6 disabled:opacity-80'
            onClick={addGift}
            disabled = {input === ''}>
            Agregar
          </button>
          <ul className='bg-gray-800/50 m-8 w-5/6 p-1 rounded-xl'>
            {(gifts.length) === 0?
              <p className='text-center'>No hay regalos en lista 💔</p>
              :
              gifts.map((gift) => {
                return <li className='flex items-center justify-between bg-gray-800/80 rounded-lg m-2 p-2' 
                key={gift}>
                  <p>{gift}</p>
                  <button className='text-xl text-center bg-red-600 px-2 rounded-lg'
                  onClick={()=>deleteGift(gift)}>🗑</button>
                  </li>
              })
            }
          </ul>
          <button
            className='bg-red-600 rounded-xl m-2 p-2 w-5/6'
            onClick={()=>setGifts([])}>
            Borrar todo
          </button>
        </div>
      </section>
    </>
    )
  }

  ;
  export default Day5;
  