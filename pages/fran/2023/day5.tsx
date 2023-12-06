import Head from "next/head";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { type, deleteWord } from "../../../utils/fran";

const Day5 = () => {
  const [gifts, setgifts] = useState<string[]>([]);
  const [newGiftValue, setValue] = useState<string | null>();
  const [isTyping, setTyping] = useState<boolean>(false);
  const [isRemovingAll, setIsRemovingAll] = useState<boolean>(false);
  const [lastLenght, setLastLenght] = useState<number>(0);
  const inputRef = useRef();

  const addGift = () => {
    if (newGiftValue) {
      const newElems = [...new Set([...gifts, newGiftValue])];

      setgifts(newElems);
    }
  };

  const handleRemove = (value: string) => {
    const newGifts = gifts.filter((gift) => gift !== value);

    setTyping(true);
    deleteWord(value, [`- ${value}`]);

    const timeWriting = value.length * 150;

    setTimeout(() => {
      setTyping(false);
      setgifts(newGifts);
    }, timeWriting);
  };

  useEffect(() => {
    if (newGiftValue && lastLenght < gifts.length && !isRemovingAll) {
      setTyping(true);
      type(newGiftValue, [`- ${newGiftValue}`]);

      const timeWriting = newGiftValue.length * 150;

      setValue("");

      setTimeout(() => setTyping(false), timeWriting);
    }
    setLastLenght(gifts.length);

    if (isRemovingAll) {
      if (!gifts.length) {
        setIsRemovingAll(false);
      } else {
        handleRemove(gifts[gifts.length - 1]);
      }
    }
  }, [gifts.length, isRemovingAll]);

  useEffect(() => {
    if (!isTyping && inputRef?.current) {
      inputRef?.current.focus();
    }
  }, [isTyping]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    return setValue(value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      addGift();
    }
  };

  const handleRemoveAll = () => {
    setIsRemovingAll(true);
  };

  return (
    <>
      <Head>
        <title>FRAN | Dia 5 | Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 5: La gente está muy indecisa y agrega muchos regalos y después los debe borrar de a uno! Agreguemos un botón para eliminar
          todos los regalos a la vez!
        </h1>
      </section>
      <div className={`p-8 pt-0 min-h-[calc(100vh-245px)] bg-[url('/christmas2023.webp')] bg-cover bg-no-repeat`}>
        <div className="pb-16 flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl mb-8 mt-20">Gifts:</p>
          <div className="p-6 border rounded-lg border-whit bg-slate-700 w-96 flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                ref={inputRef as any}
                className="w-full px-2 rounded-md"
                disabled={isTyping}
                value={newGiftValue as string}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
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
                <div key={gift} className="flex justify-between items-center">
                  <li id={gift} />
                  {!isTyping && (
                    <button className="py-1 px-2 rounded-md hover:bg-white-50" onClick={() => handleRemove(gift)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {!gifts?.length && <text>Nothing here yet :(</text>}
            </ul>
          </div>
          {gifts.length ? (
            <button
              className="w-96 mt-4 rounded-lg py-1 bg-red-700 hover:bg-red-800 disabled:bg-red-400"
              disabled={isTyping}
              onClick={handleRemoveAll}
            >
              Remove all
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Day5;
