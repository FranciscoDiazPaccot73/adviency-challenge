import Head from "next/head";
import { ChangeEvent, useState } from "react";

const Day3 = () => {
  const [gifts, setgifts] = useState<string[]>([]);
  const [newGiftValue, setValue] = useState<string | null>();

  const addGift = () => {
    if (newGiftValue) {
      const newElems = [...new Set([...gifts, newGiftValue])];

      setgifts(newElems);
      setValue("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    return setValue(value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      addGift();
    }
  };

  return (
    <>
      <Head>
        <title>FRAN | Dia 3 | Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 3: Estámos generosos, vamos a agregar un formulario con un input para escribir nuestro regalo y un botón para agregarlo a
          nuestra lista, todavía no los podemos borrar, pero... es navidad! Por que querríamos borrar regalos?
        </h1>
      </section>
      <div className={`p-8 pt-0 min-h-[calc(100vh-245px)] bg-[url('/christmas2023.webp')] bg-cover bg-no-repeat`}>
        <div className="pb-16 flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl mb-8 mt-20">Regalos:</p>
          <div className="p-6 border rounded-lg border-white w-96 flex flex-col gap-4">
            <div className="flex gap-4">
              <input className="w-full px-2" value={newGiftValue as string} onChange={handleInputChange} onKeyDown={handleKeyDown} />
              <button
                className="py-1 px-4 rounded-lg cursor-pointer hover:bg-slate-800 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-400"
                disabled={!newGiftValue}
                onClick={addGift}
              >
                Add
              </button>
            </div>
            <ul className="flex justify-center flex-col">
              {gifts?.map((gift) => (
                <li key={gift}>- {gift}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Day3;
