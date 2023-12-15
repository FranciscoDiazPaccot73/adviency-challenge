import Head from 'next/head';
import { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';

const Day13 = () => {

  const [input, setInput] = useState('');
  const [count, setCount] = useState(1);
  const [gifts, setGifts] = useState([]);
  const [image, setImage] = useState('');
  const [modal, setModal] = useState(false);
  const [addressee, setAddressee] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingGift, setEditingGift] = useState(null)

  useEffect(() => {
    const storedGift = JSON.parse(localStorage.getItem('gifts'));
    if (storedGift) {
      setGifts(storedGift)
    }
  }, [])

  const addGift = () => {
    if (editing) {
      const updatedGifts = gifts.map((item) =>
        item.id === editingGift.id ? { ...item, title: input, addressee, qty: count, image } : item
      );
      setGifts(updatedGifts);
      setEditing(false);
    } else {
      if (gifts.find((item) => item.title === input)) {
        toast.error("Ya has agregado ese regalo", {
          style: {
            background: 'red',
            color: 'white'
          }
        });
      } else {
        const newGift = { id: input, title: input, addressee, qty: count, image };
        const newGifts = [newGift, ...gifts];
        setGifts(newGifts);
        localStorage.setItem('gifts', JSON.stringify(newGifts));
        setModal(!modal);
      }
    }
    setCount(1);
    setInput('');
    setImage('');
    setAddressee('');
    setEditingGift(null);
    setModal(!modal)
  };


  const deleteGift = (item) => {
    const giftToDelete = gifts.filter((elem) => elem.id !== item.id);
    setGifts(giftToDelete);
    localStorage.setItem('gifts', JSON.stringify(giftToDelete))
  }

  const editGift = (gift) => {
    setEditing(true);
    setEditingGift(gift);
    setInput(gift.title);
    setAddressee(gift.addressee);
    setCount(gift.qty);
    setImage(gift.image);
    setModal(true);
  };

  return (
    <>
      <Head>
        <title>JOEL | Dia 13 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 13: Nuestros usuarios se ponen muy contentos y se equivocan al cargar regalos, agreguemos un botón editar que nos permita cambiar regalos ya agregados.
        </h1>
      </section>


      <Toaster />

      <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
        <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
          <p className='font-title p-10 text-3xl '>Lista de regalos</p>
          <button className='bg-red-600 rounded-xl p-2 w-5/6'
            onClick={() => setModal(!modal)}
          >Agregar Regalo
          </button>

          {modal ? (
            <div className='fixed max-w-full min-h-screen bg-gray-700/60 top-0 left-0 right-0 bottom-0'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-lg min-h-[30%] min-w-[30%]'>
                <div className='flex flex-col items-center'>
                  <button className='text-2xl text-red-700 bg-transparent font-medium'
                    onClick={() => setModal(!modal)}>x</button>
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
                  <input className='p-2 w-[90%] rounded-lg m-2'
                    type="text"
                    value={addressee}
                    placeholder='Para: '
                    onChange={(e) => setAddressee(e.target.value)} />
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
                  <div className='flex items-center'>
                    <img className='max-w-[15%]'
                      src={gift.image === '' ? '/cat-christmas.jpeg' : gift.image}
                      alt='Foto del regalo' />
                    <div className='mx-2'>
                      <p className='text-lg'>{gift.title}</p>
                      <p className='font-mono text-gray-400'>{gift.addressee}</p>
                    </div>
                  </div>
                  <div className='flex justify-end w-3/6'>
                    <p className='mx-2 text-gray-400'>x {gift.qty}</p>
                    <button className='text-xl text-center bg-red-600 px-2 rounded-lg'
                      onClick={() => deleteGift(gift)}>🗑</button>
                    <button className='text-xl text-center bg-blue-600 px-2 rounded-lg' onClick={() => editGift(gift)}>
                      ✏️
                    </button>
                  </div>

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
export default Day13;
