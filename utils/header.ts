import { generateDaysArray } from "./array";

type ObjectType = {
  user: string;
  year: string;
  disabled?: boolean;
  day?: number;
};

export const getAvailableButtons = (button: string, location: string) => {
  const [_, who, year, page] = location.split("/");
  const FILES_LENGTH = generateDaysArray("")?.length;

  if (!page || !year || !FILES_LENGTH) return null;

  const obj: ObjectType = { user: who, year };

  const [__, dayString] = page.split("day");
  const day = parseInt(dayString, 10);

  if (button === "prev") {
    obj.disabled = day <= 1;
    obj.day = day - 1;
  }

  if (button === "next") {
    obj.disabled = day >= FILES_LENGTH;
    obj.day = day + 1;
  }

  return obj;
};
