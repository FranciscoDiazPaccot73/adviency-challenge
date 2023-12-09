import Head from 'next/head';

  const Day9 = () => (
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
    </>
  );
  export default Day9;
  