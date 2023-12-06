import Head from 'next/head';

const gifts = ["Computadora", "Celular", "Gafas"]

  const Day1 = () => (
    <>
      <Head>
        <title>JOEL | Dia 1 | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 1: Para calentar motores vamos a mantener las cosas simples, mostremos una lista de regalos, 3 elementos, fijos, sin nada más.
        </h1>
      </section>

      <section className='flex flex-col justify-center items-center min-h-screen '>
        <p className='p-10 text-xl '>Lista de regalos</p>
        <ul>
          {gifts.map((gifts)=>{
            return <li key={gifts}>{gifts}</li>
          })}
        </ul>
      </section>
    </>
  );
  export default Day1;
  