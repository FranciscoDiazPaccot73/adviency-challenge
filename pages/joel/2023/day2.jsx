import Head from 'next/head';

const gifts = ['Computadora', 'Celular', 'Gafas']

const Day2 = () => (
  <>
    <Head>
      <title>JOEL | Dia 2 | Adviency Challenge</title>
      <meta name="description" content="Adviency Challenge" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* Challenge del dia */}
    <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
      <h1 className="font-bold max-w-3xl mx-auto text-xl">
        Dia 2: Nuestra app se ve muy poco navideña, demosle unos colores más lindos, rojo, verde, amarillo! Podemos ponernos creativos con lo que queramos!
      </h1>
    </section>

    <section className="flex justify-center items-center min-h-screen bg-[url('/j-bg-2023.webp')] bg-cover bg-no-repeat">
      <div className='flex flex-col justify-center items-center bg-slate-300/40 rounded-lg'>
        <p className='font-title p-10 text-3xl '>Lista de regalos</p>
        <ul className='p-10'>
          {gifts.map((gifts) => {
            return <li key={gifts}>{gifts}</li>
          })}
        </ul>
      </div>
    </section>
  </>
);
export default Day2;
