import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Day11 = () => {

  const [input, setInput] = useState('');
  const [count, setCount] = useState(1);
  const [gifts, setGifts] = useState([]);
  const [image, setImage] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const storedGift = JSON.parse(localStorage.getItem('gifts'));
    if (storedGift) {
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
      const newGift = { id: input, title: input, qty: count, image: image };
      const newGifts = ([newGift, ...gifts]);
      setGifts(newGifts);
      setCount(1);
      setInput('');
      setImage('');
      localStorage.setItem('gifts', JSON.stringify(newGifts))
      handleModal()
    }
  }

  const deleteGift = (elem) => {
    const giftToDelete = gifts.filter((item) => item.id !== elem.id);
    setGifts(giftToDelete);
    localStorage.setItem('gifts', JSON.stringify(giftToDelete))
  }

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      <Head>
        <title>JOEL | Dia 11 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 11: Nuestro formulario tiene muchas cosas y molesta a la vista de los usuarios, pasemoslo a un modal / drawer o lo que quieras y pongamos un botón de "Agregar regalo" que lo muestre.
        </h1>
      </section>

      <Toaster />

      <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
        <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
          <p className='font-title p-10 text-3xl '>Lista de regalos</p>
          <button className='bg-red-600 rounded-xl p-2 w-5/6'
            onClick={() => handleModal()}
          >Agregar Regalo
          </button>

          {modal ? (
            <div className='fixed max-w-full min-h-screen bg-gray-700/60 top-0 left-0 right-0 bottom-0'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-lg min-h-[30%] min-w-[30%]'>
                <div className='flex flex-col items-center'>
                  <button className='text-2xl text-red-700 bg-transparent font-medium'
                    onClick={() => handleModal()}>x</button>
                  <input className='p-2 w-[90%] rounded-lg m-2'
                    type="text"
                    value={input}
                    placeholder='Agrega un regalo 🎅'
                    onChange={(e) => setInput(e.target.value)} />
                  <input className='p-2 w-[90%] rounded-lg m-2'
                    type="text"
                    value={image}
                    placeholder='URL imagen'
                    onChange={(e) => setImage(e.target.value)} />
                  <input className='p-1 w-1/6 rounded-lg m-2'
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(e.target.value)} />
                  <button
                    className='bg-red-600 rounded-xl m-2 p-2 w-5/6 disabled:opacity-80'
                    onClick={addGift}
                    disabled={input === ''}>
                    Agregar a la lista
                  </button>
                </div>
              </div>
            </div>)
            :
            null}

          <ul className='bg-gray-800/50 m-8 w-5/6 p-1 rounded-xl'>
            {(gifts.length) === 0 ?
              <p className='text-center'>No hay regalos en lista 💔</p>
              :
              gifts.map((gift) => {
                return <li className='flex items-center justify-between bg-gray-800/80 rounded-lg m-2 p-2'
                  key={gift.id}>
                  <div className='flex justify-between w-5/6 items-center'>
                    <img className='max-w-[10%]'
                      src={gift.image === '' ? '/cat-christmas.jpeg' : gift.image}
                      alt='Foto del regalo' />
                    <p>{gift.title}</p>
                    <p className='text-gray-400'>x {gift.qty}</p>
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
};
export default Day11;
