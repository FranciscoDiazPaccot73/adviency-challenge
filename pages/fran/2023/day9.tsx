import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { type, deleteWord, setTextContent } from "../../../utils/fran";
import { Modal2023 } from "../../../components/fran/Modal2023";
import { GiftType } from "../../../components/fran/interfaces";

const Day9 = () => {
  const [gifts, setgifts] = useState<GiftType[]>([]);
  const [newGiftValue, setValue] = useState<GiftType | null>();
  const [isTyping, setTyping] = useState<boolean>(false);
  const [isRemovingAll, setIsRemovingAll] = useState<boolean>(false);
  const [isOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastLenght, setLastLenght] = useState<number>(0);
  const inputRef = useRef<any>();

  useEffect(() => {
    const items = localStorage.getItem("fran");

    if (items) {
      const itemsParsed = JSON.parse(items);

      setgifts(itemsParsed);
    }
  }, []);

  const addGift = (newGift: GiftType) => {
    if (!gifts.find((currentGift) => currentGift.gift === newGift.gift)) {
      setValue(newGift);
      setgifts([...gifts, newGift]);
      localStorage.setItem("fran", JSON.stringify([...gifts, newGift]));
    }
  };

  const handleRemove = (giftToRemove: GiftType) => {
    const newGifts = gifts.filter(({ gift }) => gift !== giftToRemove.gift);

    setTyping(true);
    deleteWord(giftToRemove.id, [`- ${giftToRemove.gift}`]);

    const timeWriting = giftToRemove.gift.length * 150;

    setTimeout(() => {
      setTyping(false);
      setgifts(newGifts);
      localStorage.setItem("fran", JSON.stringify(newGifts));
    }, timeWriting);
  };

  useEffect(() => {
    if (newGiftValue && lastLenght < gifts.length && !isRemovingAll) {
      setTyping(true);
      type(newGiftValue.id, [`- ${newGiftValue.gift}`]);

      const timeWriting = newGiftValue.gift.length * 150;

      setValue(null);

      setTimeout(() => setTyping(false), timeWriting);
    }
    setLastLenght(gifts.length);

    if (isRemovingAll) {
      if (!gifts.length) {
        setIsRemovingAll(false);
      } else {
        const giftToRemove = gifts[gifts.length - 1];

        handleRemove(giftToRemove);
      }
    }

    if (!newGiftValue) {
      gifts.forEach((item: GiftType) => {
        setTextContent(item.id, `- ${item.gift}`);
      });
    }
  }, [gifts.length, isRemovingAll]);

  useEffect(() => {
    if (!isTyping && inputRef?.current) {
      inputRef?.current.focus();
    }
  }, [isTyping]);

  const handleRemoveAll = () => {
    setIsRemovingAll(true);
  };

  return (
    <>
      <Head>
        <title>FRAN | Dia 9 | Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 9: La gente está triste por que al cerrar la aplicación pierde todos sus regalos 😢. Usemos localStorage para guardar los
          regalos en el dispositivo del usuario y cargarlos cuando vuelve!
        </h1>
      </section>
      <Modal2023 isOpen={isOpen} onAdd={addGift} onCancel={() => setIsModalOpen(false)} />
      <div className={`p-8 pt-0 min-h-[calc(100vh-245px)] bg-[url('/christmas2023.webp')] bg-cover bg-no-repeat`}>
        <div className="pb-16 flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl mb-8 mt-20">Gifts:</p>
          <div className="p-6 border rounded-lg border-white bg-glass w-96 flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                className="w-full py-1 px-4 rounded-lg cursor-pointer bg-green-700 hover:bg-green-800 disabled:bg-green-800 disabled:hover:bg-green-800 disabled:cursor-not-allowed disabled:text-gray-400"
                onClick={() => setIsModalOpen(true)}
              >
                Add
              </button>
            </div>
            <ul className="flex justify-center flex-col gap-1">
              {gifts?.map((gift) => (
                <div key={gift.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <li id={gift.id} />
                    {!isTyping && <p className="ml-2 text-xs">({gift.amount})</p>}
                  </div>
                  {!isTyping && (
                    <button className="py-1 px-2 rounded-md border border-white-50 hover:bg-white-50" onClick={() => handleRemove(gift)}>
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

export default Day9;
