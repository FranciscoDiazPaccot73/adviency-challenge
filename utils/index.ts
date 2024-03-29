const fs = require("fs");

const CWD = process.cwd();
const DIR = `${CWD}/pages/`;

type ChallengeByDayRecord = Record<number, string>;

const challengeByDay: ChallengeByDayRecord = {
  1: "Para calentar motores vamos a mantener las cosas simples, mostremos una lista de regalos, 3 elementos, fijos, sin nada más.",
  2: "Nuestra app se ve muy poco navideña, demosle unos colores más lindos, rojo, verde, amarillo! Podemos ponernos creativos con lo que queramos!",
  3: "Estámos generosos, vamos a agregar un formulario con un input para escribir nuestro regalo y un botón para agregarlo a nuestra lista, todavía no los podemos borrar, pero... es navidad! Por que querríamos borrar regalos?",
  4: "Papa noel no estuvo muy contento con la demanda de regalos, vamos a tener que agregar un botón de eliminar a cada elemento para poder borrarlos individualmente.",
  5: "La gente está muy indecisa y agrega muchos regalos y después los debe borrar de a uno! Agreguemos un botón para eliminar todos los regalos a la vez!",
  6: "Nuestra aplicación no se ve muy bien cuando no hay regalos, agreguemos un mensaje alentando a agregar regalos cuando no haya ninguno!",
  7: "Tuvimos algunos reportes de regalos vacíos o repetidos, asegurmosnos que la gente solo pueda agregar un regalo si escribió algo y si ese regalo no está ya en la lista!",
  8: "Cometimos un error el día anterior, la gente quiere agregar regalos repetidos para regalarselos a diferentes personas, agreguemos un campo al lado del input de texto para poner la cantidad de unidades del regalo que deberíamos comprar.",
  9: "La gente está triste por que al cerrar la aplicación pierde todos sus regalos 😢. Usemos localStorage para guardar los regalos en el dispositivo del usuario y cargarlos cuando vuelve!",
  10: `Las palabras dicen mucho pero las imágenes más! Agreguemos un campo donde podamos pegar un link de imágen para cada regalo y mostremoslo en la lista.`,
  11: `Nuestro formulario tiene muchas cosas y molesta a la vista de los usuarios, pasemoslo a un modal / drawer o lo que quieras y pongamos un botón de "Agregar regalo" que lo muestre.`,
  12: `La gente no recuerda que regalo corresponde a cada quien, agreguemos un campo para destinatario y mostremoslo.`,
  13: `Nuestros usuarios se ponen muy contentos y se equivocan al cargar regalos, agreguemos un botón editar que nos permita cambiar regalos ya agregados.`,
  14: `Nuestra aplicación no es muy accesible, hagamos que podamos agregar, borrar y editar regalos sin tocar el mouse.`,
  15: `Pronto tendremos que preparar una api para nuestra aplicación, preparemos un método para traernos nuestros regalos que use promesas o async await.`,
  16: `La gente está perdiendo la creatividad y necesita una ayuda, agreguemos un botón para obtener un regalo aleatorio para el campo "regalo", podés tener una lista fija de regalos, no es necesario que sean generados.`,
  17: `Nos olvidamos de agregar un campo de precio para nuestros regalos! Aseguremosnos de mostrar el precio correcto tomando en cuenta la cantidad de unidades del regalo.`,
  18: `La gente agrega muchos regalos y necesita saber el total de lo que gastaría, pongamos el total.`,
  19: `La gente quiere hacer el mismo regalo pero a diferentes personas o en diferentes cantidades, agreguemos un botón de duplicar que abra el modal precargado.`,
  20: `Queremos tener una lista de regalos para ir a comprar pero no queremos que tenga los botones o precios, agreguemos un botón de previsualizar que nos abra un modal.`,
  21: `Fuimos a comprar los regalos pero no teniamos datos en el celular, no queremos que le pase a alguien más, agreguemos un botón de imprimir a esa lista.`,
  22: `Levantemos el espíritu navideño agregando un sonido navideño de fondo. No tan alto, tiene que estar deshabilitado por defecto y el usuario puede habilitarlo.`,
  23: `Ya casi es navidad! Agreguemos unos copitos de nieve a nuestra app para darle el último toque navideño`,
};

const templateFile = (user: string, day: number) =>
  `import Head from 'next/head';

  const Day${day} = () => {return(
    <>
      <Head>
        <title>${user.toUpperCase()} | Dia ${day} | Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Challenge del dia */}
      <section className="pt-20 pb-12 border-b border-b-slate-500 h-[245px]">
        <h1 className="font-bold max-w-3xl mx-auto text-xl">
          Dia ${day}: ${challengeByDay[day]}
        </h1>
      </section>
    </>
  )};
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
