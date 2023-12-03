import Head from "next/head";

const GIFTS = ["Celular", "Computadora", "PS5"];

const Day1 = () => (
  <>
    <Head>
      <title>FRAN | Dia 1 | Adviency Challenge</title>
      <meta content="Adviency Challenge" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
    {/* Challenge del dia */}
    <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
      <h1 className="font-bold max-w-3xl mx-auto text-xl">
        Dia 1: Para calentar motores vamos a mantener las cosas simples, mostremos una lista de regalos, 3 elementos, fijos, sin nada más.
      </h1>
    </section>
    <div className="p-8 pt-0 mt-10">
      <div className="pb-16 flex-1 flex flex-col justify-center items-center">
        <p className=" text-4xl mb-8">Regalos:</p>
        <ul className="flex items-center justify-center flex-col">
          {GIFTS?.map((gift) => (
            <li key={gift}>{gift}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default Day1;
