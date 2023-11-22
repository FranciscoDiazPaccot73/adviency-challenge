export const getIdByName = (text: string) =>
  text.replaceAll(" ", "").toLowerCase();

export const generateRandomID = () => Math.random().toString(16).slice(2);

type ElementType = {
  price: number;
  amount: number;
};

export const getTotal = (elems: ElementType[]) => {
  let total = 0;

  elems.forEach((element) => {
    total += element.price * element.amount;
  });

  return total;
};
