export const getIdByName = (text) => text.replaceAll(" ", '').toLowerCase();

export const generateRandomID = () => Math.random().toString(16).slice(2);

export const getTotal = (elems) => {
  let total = 0;
  elems.forEach(element => {
    total += element.price * element.amount;
  });

  return total;
}
