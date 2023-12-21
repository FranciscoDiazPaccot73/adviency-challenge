import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Day18 = () => {

  const [input, setInput] = useState('');
  const [count, setCount] = useState(1);
  const [mount, setMount] = useState(null)
  const [gifts, setGifts] = useState([]);
  const [image, setImage] = useState('');
  const [modal, setModal] = useState(false);
  const [addressee, setAddressee] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const storedGift = JSON.parse(localStorage.getItem('gifts'));
    if (storedGift) {
      setGifts(storedGift)
      updateTotal(storedGift)
    }
  }, []);

  
  const updateTotal = (giftsArray) => {
    const calculatedTotal = giftsArray.reduce((acc, gift) => {
      return acc + gift.qty * gift.mount;
    }, 0);
    setTotal(calculatedTotal);
  };

  const addGift = () => {
    if (editing) {
      const updatedGifts = gifts.map((item) =>
        item.id === editingGift.id ? { ...item, title: input, qty: count, addressee, image, mount } : item);
      setEditing(false);
      setGifts(updatedGifts)
    }
    else {
      if (gifts.find((item) => item.title === input)) {
        toast.error("Ya has agregado ese regalo", {
          style: {
            background: 'red',
            color: 'white',
          }
        });
      } else {
        const newGift = { id: input, title: input, addressee, qty: count, mount, image };
        const newGifts = ([newGift, ...gifts]);
        setTotal(total + newGift.qty * newGift.mount)
        setEditing(false)
        setGifts(newGifts);
        setModal(!modal)
        localStorage.setItem('gifts', JSON.stringify(newGifts))
      }
    }
    setCount(1);
    setAddressee('');
    setEditingGift(null);
    setImage('');
    setModal(!modal);
    setInput('');
    setMount(0)
  }

  const deleteGift = (item) => {
    const giftToDelete = gifts.filter((elem) => elem.id !== item.id)
    setGifts(giftToDelete);
    localStorage.setItem('gift', JSON.stringify(giftToDelete));
    updateTotal(giftToDelete);
  }

  const close = () => {
    setModal(!modal)
    setInput('');
    setAddressee('');
    setCount(1);
    setMount(null);
    setImage('')
  }

  const editGift = (gift) => {
    setEditing(true);
    setEditingGift(gift);
    setInput(gift.title);
    setCount(gift.qty);
    setImage(gift.image);
    setAddressee(gift.addressee);
    setMount(gift.mount)
    setModal(!modal)
  }

  const randomly = () => {
    const stock = ['Medias', 'Ak-47', 'Papas Dia%', 'Katana', 'Renault 12', 'Laburo'];
    const randomGift = Math.floor(Math.random() * stock.length);
    setInput(stock[randomGift])
  }

  return (
    <>
      <Head>
        <title>JOEL | Dia 18 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 18: La gente agrega muchos regalos y necesita saber el total de lo que gastaría, pongamos el total.
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
                    onClick={() => close()}>x</button>
                  <div className='flex items-center justify-between w-[90%]'>
                    <input className='p-2 rounded-lg my-2 w-5/6'
                      type="text"
                      value={input}
                      placeholder='Agrega un regalo 🎅'
                      onChange={(e) => setInput(e.target.value)} />
                    <button className='bg-blue-600 p-2 rounded-lg'
                      onClick={randomly}>✨</button>
                  </div>
                  <input className='p-1 w-2/6 rounded-lg my-2'
                    type="number"
                    value={mount}
                    placeholder='$1000'
                    onChange={(e) => setMount(e.target.value)} />
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
                    <span className='text-gray-400'>x {gift.qty}</span>
                    <span className='mx-3 text-gray-400'
                    >${gift.mount * gift.qty}</span>
                    <button className='text-xl text-center bg-red-600 px-2 rounded-lg'
                      onClick={() => deleteGift(gift)}>🗑</button>
                    <button className='text-xl mx-1 text-center bg-blue-600 px-1 rounded-lg' onClick={() => editGift(gift)}>
                      🖍
                    </button>
                  </div>

                </li>
              })
            }
          </ul>

          
          <span className='bg-gray-800/80 rounded-lg m-2 p-2'>Total ${total}</span>

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
export default Day18;
