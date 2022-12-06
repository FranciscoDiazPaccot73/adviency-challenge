const fs = require('fs')

const CWD = process.cwd();
const DIR = `${CWD}/pages/`

const templateFile = (user, day) =>
  `import Head from 'next/head';

  const Day${day} = () => (
    <Head>
      <title>${user.toUpperCase()} | Adviency Challenge | Dia ${day}</title>
      <meta name="description" content="Adviency Challenge" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
  export default Day${day};
  `

export const getFileIfExist = (day, user) => {
  if (process.env.NODE_ENV === 'development' && !fs.existsSync(`${DIR}${user}/day${day}.jsx`)) {
    fs.writeFile(`${DIR}${user}/day${day}.jsx`, templateFile(user, day), (err) => {
      console.log(err)
    })
  }
}

const generate = (days, user) => {
  for (let i = 1; i < days + 1; i++) {
    getFileIfExist(i, user)
  }
}

export const generateFiles = (user) => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth()
  const year = today.getFullYear();
  if (month === 11 && year === 2022 && currentDay < 23) {
    generate(currentDay, user)
  } else {
    generate(22, user)
  }
}
