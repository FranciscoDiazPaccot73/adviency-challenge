import Head from "next/head";

const GIFTS = ["Celular", "Computadora", "PS5"];

const Day2 = () => (
  <>
    <Head>
      <title>FRAN | Dia 2 | Adviency Challenge</title>
      <meta content="Adviency Challenge" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
    {/* Challenge del dia */}
    <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
      <h1 className="font-bold max-w-3xl mx-auto text-xl">
        Dia 2: Nuestra app se ve muy poco navideña, demosle unos colores más lindos, rojo, verde, amarillo! Podemos ponernos creativos con
        lo que queramos!
      </h1>
    </section>
    <div className={`p-8 pt-0 min-h-[calc(100vh-245px)] bg-[url('/christmas2023.webp')] bg-cover bg-no-repeat`}>
      <div className="pb-16 flex-1 flex flex-col justify-center items-center">
        <p className="pt-10 text-4xl mb-8">Regalos:</p>
        <ul className="flex items-center justify-center flex-col">
          {GIFTS?.map((gift) => (
            <li key={gift}>{gift}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default Day2;
