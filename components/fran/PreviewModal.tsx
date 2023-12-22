import { FC } from "react";
import Image from "next/image";
import { GiftType } from "./interfaces";

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
  gift?: GiftType;
}

export const PreviewModal: FC<PreviewProps> = ({ isOpen, onClose, gift }) => (
  <div className={`fran-modal-wrapper ${isOpen ? "open" : ""}`}>
    <div className={`rounded-md bg-glass glass-white-border fran-modal ${isOpen ? "open" : ""}`}>
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
                Receiver
              </th>
              <th className="px-6 py-3" scope="col">
                Price
              </th>
              <th className="px-6 py-3" scope="col">
                Quantity
              </th>
              <th className="px-6 py-3" scope="col">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="pl-6">
                <Image alt={gift?.gift || ""} height={32} src={gift?.imageUrl || "/default-image.png"} width={32} />
              </td>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                {gift?.gift}
              </th>
              <td className="px-6 py-4">{gift?.receiver}</td>
              <td className="px-6 py-4">{`$${gift?.price}`}</td>
              <td className="px-6 py-4">{gift?.amount}</td>
              <td className="px-6 py-4">{`$${(gift?.amount || 0) * (gift?.price || 0)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="relative mt-6 w-full flex gap-6">
        <button className="ml-auto py-1 font-semibold rounded-lg w-28 hover:bg-red-500" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  </div>
);
