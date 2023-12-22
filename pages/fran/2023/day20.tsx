import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type, deleteWord, setTextContent, generateRandomID } from "../../../utils/fran";
import { Modal2023 } from "../../../components/fran/Modal2023";
import { PreviewModal } from "../../../components/fran/PreviewModal";
import { GiftType } from "../../../components/fran/interfaces";

type PreviewModalType = {
  isOpen: boolean;
  gift?: GiftType;
};

const Day20 = () => {
  const [gifts, setgifts] = useState<GiftType[]>([]);
  const [editingItem, setEditingItem] = useState<GiftType | null>();
  const [newGiftValue, setValue] = useState<GiftType | null>();
  const [isTyping, setTyping] = useState<boolean>(false);
  const [isRemovingAll, setIsRemovingAll] = useState<boolean>(false);
  const [isOpen, setIsModalOpen] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<PreviewModalType>({ isOpen: false });
  const [lastLenght, setLastLenght] = useState<number>(0);
  const inputRef = useRef<any>();

  const totalPrice = gifts.reduce((acc, currentGift) => acc + currentGift.price * currentGift.amount, 0);

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

  const handleEditGift = (newGift: GiftType) => {
    const exists = gifts.find((gift) => gift.id === newGift.id);

    const newGifts: GiftType[] = gifts.map((gift) => {
      if (gift.id !== newGift.id) return gift;

      return newGift;
    });

    if (!exists) newGifts.push(newGift);

    setValue(newGift);
    setgifts(newGifts);
    localStorage.setItem("fran", JSON.stringify(newGifts));
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

  const handleEditing = (g: GiftType) => {
    setEditingItem(g);
    setIsModalOpen(true);
  };

  const handleDuplicate = (g: GiftType) => {
    const duplicatedItem = { ...g, receiver: "", id: generateRandomID() };

    setEditingItem(duplicatedItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <>
      <Head>
        <title>FRAN | Dia 20 | Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia 20: Queremos tener una lista de regalos para ir a comprar pero no queremos que tenga los botones o precios, agreguemos un
          botón de previsualizar que nos abra un modal.
        </h1>
      </section>
      <Modal2023 editingItem={editingItem} isOpen={isOpen} onAdd={addGift} onCancel={handleCloseModal} onEdit={handleEditGift} />
      <PreviewModal gift={previewModal.gift} isOpen={previewModal.isOpen} onClose={() => setPreviewModal({ isOpen: false })} />
      <div className={`p-8 pt-0 min-h-[calc(100vh-245px)] bg-[url('/christmas2023.webp')] bg-cover bg-no-repeat`}>
        <div className="pb-16 flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl mb-8 mt-20">Gifts:</p>
          <div className="p-6 border rounded-lg border-white bg-glass flex flex-col gap-4 w-4/5">
            <div className="flex gap-4">
              <button
                className="w-full py-1 px-4 rounded-lg cursor-pointer bg-green-700 hover:bg-green-800 disabled:bg-green-800 disabled:hover:bg-green-800 disabled:cursor-not-allowed disabled:text-gray-400"
                onClick={() => setIsModalOpen(true)}
              >
                Add
              </button>
            </div>
            {gifts?.length ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3" scope="col">
                        Image
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Gift
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gifts?.map((gift) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="pl-6">
                          <Image alt={gift.gift} height={32} src={gift.imageUrl || "/default-image.png"} width={32} />
                        </td>
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" id={gift.id} scope="row" />
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className="p-1 rounded-md text-blue-500 hover:underline disabled:hover:cursor-not-allowed disabled:hover:no-underline"
                              disabled={isTyping}
                              title="Duplicate"
                              onClick={() => setPreviewModal({ isOpen: true, gift })}
                            >
                              Details
                            </button>
                            <div className="w-[1px] h-[25px] bg-white-50" />
                            <button
                              className="p-1 rounded-md hover:underline disabled:hover:cursor-not-allowed disabled:hover:no-underline"
                              disabled={isTyping}
                              title="Duplicate"
                              onClick={() => handleDuplicate(gift)}
                            >
                              Duplicate
                            </button>
                            <button
                              className="p-1 rounded-md hover:underline  disabled:hover:cursor-not-allowed disabled:hover:no-underline"
                              disabled={isTyping}
                              title="Edit"
                              onClick={() => handleEditing(gift)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 p-1 rounded-md hover:underline  disabled:hover:cursor-not-allowed disabled:hover:no-underline"
                              disabled={isTyping}
                              title="Remove"
                              onClick={() => handleRemove(gift)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <text>Nothing here yet :(</text>
            )}
            {gifts.length ? (
              <div className="pt-2 w-full border-t border-t-white flex flex-col">
                <p className="ml-auto">TOTAL</p>
                <p className="ml-auto">{`$${totalPrice}`}</p>
              </div>
            ) : null}
          </div>
          {gifts.length ? (
            <button
              className="w-4/5 mt-4 rounded-lg py-1 bg-red-700 hover:bg-red-800 disabled:bg-red-400"
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

export default Day20;
