import { useState, useEffect, useRef, FC, ChangeEvent } from "react";

import { generateRandomID } from "../../utils/fran";
import { GiftType } from "./interfaces";

interface Modal2023Props {
  isOpen: boolean;
  onCancel: () => void;
  onAdd: (arg: GiftType) => void;
  onEdit: (arg: GiftType) => void;
  editingItem?: GiftType | null;
}

export const Modal2023: FC<Modal2023Props> = ({ isOpen, onCancel, onAdd, editingItem, onEdit }) => {
  const DEFAULT_VALUES = { imageUrl: "", price: "", gift: "", amount: 1, receiver: "", id: generateRandomID() };
  const [values, setValues] = useState<GiftType>({ ...DEFAULT_VALUES });
  const [inputHasError, setError] = useState(false);
  const presentRef = useRef<any>();

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setValues(editingItem);
      } else {
        presentRef?.current?.focus();
      }
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const obj: GiftType = { ...values };
    const nameKey = name as keyof typeof obj;

    setError(false);

    obj[nameKey] = value;
    setValues(obj);
  };
  const resetInputs = () => {
    setValues({ ...DEFAULT_VALUES, id: generateRandomID() });
  };

  const handleAddItem = () => {
    if (values.gift !== "" && values.receiver !== "") {
      if (editingItem) {
        onEdit(values);
      } else {
        onAdd(values);
      }
      resetInputs();
      onCancel();
    }
  };

  const handleInputAmount = (action = "remove") => {
    let newAmount = values.amount;

    setError(false);
    if (action === "remove") {
      newAmount -= 1;
    } else {
      newAmount += 1;
    }

    setValues({ ...values, amount: newAmount });
  };

  const handleCancel = () => {
    onCancel();
    resetInputs();
    setError(false);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const getSuggestion = async () => {
    const data = await fetch("/api/fran/random-gift");
    const { gift: suggestedGift } = await data.json();

    setValues({ ...values, gift: suggestedGift });
  };

  return (
    <div className={`fran-modal-wrapper ${isOpen ? "open" : ""}`}>
      <div className={`rounded-md bg-glass glass-white-border fran-modal ${isOpen ? "open" : ""}`}>
        <div>
          <div className="flex gap-4 flex-col items-center mb-6 md:items-baseline md:flex-row">
            <div className="relative mb-4 md:mb-0 w-full">
              <div className="relative w-full">
                <input
                  ref={presentRef}
                  className="p-2 rounded-md w-full"
                  name="gift"
                  placeholder="Gift"
                  title={values.gift}
                  type="text"
                  value={values.gift}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute rounded-r-md text-sm right-0 top-0 h-10 px-2 bg-gray-700 border-l border-l-white hover:bg-green-800"
                  onClick={getSuggestion}
                >
                  Suggest
                </button>
              </div>
              {inputHasError ? <p className="absolute left-2 text-sm text-red-600">Ya cargaste este regalo :(</p> : null}
            </div>
          </div>
          <div className="flex gap-4 flex-col items-center w-full md:items-baseline md:flex-row">
            <input
              className="p-2 rounded-md mb-6"
              name="receiver"
              placeholder="Receiver"
              type="text"
              value={values.receiver}
              onChange={handleInputChange}
            />
            <input
              className="p-2 rounded-md mb-6"
              name="price"
              placeholder="$$$"
              type="number"
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 flex-col items-center md:items-baseline md:flex-row">
            <input
              className="p-2 rounded-md"
              name="url"
              placeholder="Image URL"
              type="text"
              value={values.imageUrl}
              onChange={handleInputChange}
            />
            <button
              className={`rounded-sm w-4 h-4 flex items-center justify-center ${
                values.amount === 1 ? "bg-red-900 text-slate-300" : "bg-red-700 hover:bg-green-800"
              }`}
              disabled={values.amount === 1}
              onClick={() => handleInputAmount()}
            >
              -
            </button>
            {values.amount}
            <button
              className="rounded-sm w-4 h-4 flex items-center justify-center bg-red-700 hover:bg-green-800"
              onClick={() => handleInputAmount("add")}
            >
              +
            </button>
          </div>
        </div>
        <div className="relative mt-10 w-full flex gap-6">
          <button className="font-semibold rounded-lg w-1/2 hover:border hover:border-red-700" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={`font-semibold rounded-lg cursor-pointer bg-green-700 hover:bg-green-800 disabled:bg-green-800 disabled:hover:bg-green-900 disabled:cursor-not-allowed disabled:text-gray-400 px-4 w-1/2 h-10 `}
            disabled={!values.gift || !values.receiver}
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
