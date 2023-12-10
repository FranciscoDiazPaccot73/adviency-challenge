export const getIdByName = (text: string) => text.replaceAll(" ", "").toLowerCase();

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

export const setTextContent = (id: string, value: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
};

export const type = (id: string, words: string[]) => {
  const i = 0;
  let j = 0;
  let currentWord = "";
  const element = document.getElementById(id);

  const internalFunction = () => {
    currentWord = words[i];
    if (element) {
      element.textContent = currentWord.substring(0, j + 1);
      j += 1;
      if (j < currentWord.length) {
        setTimeout(internalFunction, 80);
      }
    }
  };

  internalFunction();
};

export const deleteWord = (id: string, words: string[]) => {
  let i = 0;
  const currentWord = words[i];
  let j = currentWord.length;
  const element = document.getElementById(id);

  const internalFunction = () => {
    if (element) {
      element.textContent = currentWord.substring(0, j - 1);
      j -= 1;
      if (j > 0) {
        i += 1;
        if (i === words.length) {
          i = 0;
        }
        setTimeout(internalFunction, 50);
      }
    }
  };

  internalFunction();
};
