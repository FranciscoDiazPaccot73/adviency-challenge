export const getIdByName = (text) => text.replaceAll(" ", '').toLowerCase();

export const generateRandomID = () => Math.random().toString(16).slice(2);
