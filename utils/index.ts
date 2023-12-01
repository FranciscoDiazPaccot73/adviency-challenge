const fs = require("fs");

const CWD = process.cwd();
const DIR = `${CWD}/pages/`;

const templateFile = (user: string, day: number) =>
  `import Head from 'next/head';

  const Day${day} = () => (
    <>
      <Head>
        <title>${user.toUpperCase()} | Dia ${day} | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
  export default Day${day};
  `;

export const getFileIfExist = (day: number, user: string, year: number | string, extension: string) => {
  if (process.env.NODE_ENV === "development" && !fs.existsSync(`${DIR}${user}/${year}/day${day}.${extension}`)) {
    fs.writeFile(`${DIR}${user}/${year}/day${day}.${extension}`, templateFile(user, day), (err: any) => {
      console.log(err);
    });
  }
};

const generate = (days: number, user: string, year: number | string, extension: string) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < days + 1; i++) {
    getFileIfExist(i, user, year, extension);
  }
};

const AVAILABLE_YEARS = ["2022", "2023"];

export const generateFiles = (user: "fran" | "joel", year: number | string, extension = "jsx") => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();

  if (!AVAILABLE_YEARS.includes(year.toString())) return;

  if (month === 11 && year.toString() === "2023" && currentDay < 23) {
    generate(currentDay, user, year, extension);
  } else {
    generate(22, user, year, extension);
  }
};
