import Head from 'next/head';
import { useState } from 'react';

const Day3 = () => {

  const [input, setInput] = useState('');
  const [gifts, setGifts] = useState([]);

  const handlerAddGift = (e) => {
    const { value } = e.target;
    setInput(value)
  }

  const addGift = () => {
    const newGift = ([input, ...gifts]);
    setGifts(newGift)
    setInput('')
  }

  return (
    <>
      <Head>
        <title>JOEL | Dia 3 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 3: Estámos generosos, vamos a agregar un formulario con un input para escribir nuestro regalo y un botón para agregarlo a nuestra lista, todavía no los podemos borrar, pero... es navidad! Por que querríamos borrar regalos?
        </h1>
      </section>

      <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
        <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
          <p className='font-title p-10 text-3xl '>Lista de regalos</p>
          <input className='p-2 w-5/6'
            type="text"
            value={input}
            onChange={handlerAddGift} />
          <button
            className='bg-red-600 rounded-xl m-2 p-2 w-5/6'
            onClick={addGift}>
            Agregar
          </button>
          <ul className='bg-gray-800/50 m-8 w-5/6 p-1 rounded-xl'>
            {gifts?
              gifts.map((gifts) => {
                return <li className='bg-gray-800/80 rounded-lg m-2 p-2' 
                key={gifts}>
                  {gifts}
                  </li>
              })
              :
              <p>No hay regalos en lista</p>
            }
          </ul>
        </div>
      </section>
    </>
  )
};
export default Day3;
