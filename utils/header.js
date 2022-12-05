import { generateDaysArray } from "./array"

const FILES_LENGTH = generateDaysArray().length;

export const getAvailableButtons = (button, location) => {
  const [_, who, page] = location.split('/')
  const obj = { user: who };

  if (!page) return null

  const [__, dayString] = page.split('day')
  const day = parseInt(dayString, 10)

  if (button === 'prev') {
    obj.disabled = day <= 1;
    obj.day = day - 1
  }

  if (button === 'next') {
    obj.disabled = day >= FILES_LENGTH;
    obj.day = day + 1
  }

  return obj;
}
