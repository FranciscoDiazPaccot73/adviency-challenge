export const generateDaysArray = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth()
  const year = today.getFullYear();
  let length = 22;
  if (month === 11 && year === 2022 &&  currentDay < 23) {
    length = currentDay;
  }

  return Array.from({ length}, (v, i) => i + 1)
}
