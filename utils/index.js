const fs = require('fs');

const CWD = process.cwd();
const DIR = `${CWD}/pages/`;

const templateFile = (user, day) =>
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

export const getFileIfExist = (day, user, year, extension) => {
  if (process.env.NODE_ENV === 'development' && !fs.existsSync(`${DIR}${user}/${year}/day${day}.${extension}`)) {
    fs.writeFile(`${DIR}${user}/${year}/day${day}.${extension}`, templateFile(user, day), (err) => {
      console.log(err);
    });
  }
};

const generate = (days, user, year, extension) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < days + 1; i++) {
    getFileIfExist(i, user, year, extension);
  }
};

const AVAILABLE_YEARS = ['2022', '2023'];

export const generateFiles = (user, year, extension = 'jsx') => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();

  if (!AVAILABLE_YEARS.includes(year)) return;

  if (month === 11 && year === 2022 && currentDay < 23) {
    generate(currentDay, user, year, extension);
  } else {
    generate(1, user, year, extension);
  }
};
