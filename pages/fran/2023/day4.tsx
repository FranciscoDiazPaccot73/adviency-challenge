import Head from "next/head";
import { ChangeEvent, useState } from "react";

const Day4 = () => {
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
        <title>FRAN | Dia 4 | Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 4: Papa noel no estuvo muy contento con la demanda de regalos, vamos a tener que agregar un botón de eliminar a cada elemento
          para poder borrarlos individualmente.
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
            <ul className="flex justify-center flex-col gap-1">
              {gifts?.map((gift) => (
                <div key={gift} className="flex justify-between">
                  <li>- {gift}</li>
                  <button className="py-1 px-2 rounded-md hover:bg-white-50">Remove</button>
                </div>
              ))}
              {!gifts?.length && <text>Nothing here yet :(</text>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Day4;
