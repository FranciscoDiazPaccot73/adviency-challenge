const fs = require('fs')

const CWD = process.cwd();
const DIR = `${CWD}/pages/`

const templateFile = 
  `const Component = () => <div />;
  export default Component;
  `

export const getFileIfExist = (day, user) => {
  if (process.env.NODE_ENV === 'development' && !fs.existsSync(`${DIR}${user}/day${day}.jsx`)) {
    fs.writeFile(`${DIR}${user}/day${day}.jsx`, templateFile, (err) => {
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
