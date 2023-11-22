const AVAILABLE_YEARS = ['2022', '2023'];

export const generateDaysArray = (year) => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();
  let length = 22;

  if (!AVAILABLE_YEARS.includes(year)) return;

  if (month === 11 && year === 2022 && currentDay < 23) {
    length = currentDay;
  }

  // eslint-disable-next-line consistent-return
  return Array.from({ length }, (_, i) => i + 1);
};
