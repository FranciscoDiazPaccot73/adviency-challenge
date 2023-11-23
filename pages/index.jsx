import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const users = [
  { name: "Joel", user: "joelwaiman" },
  { name: "Fran", user: "FranciscoDiazPaccot73" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adviency Challenge</title>
        <meta content="Adviency Challenge" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Adviency Challenge</h2>

        <ul className="flex flex-wrap gap-7 justify-center mt-24">
          {users.map(({ name, user }) => (
            <li key={user} className="inline-flex flex-shrink-0">
              <a
                className="text-white visited:text-neutral-400 hover:underline text-center flex flex-col gap-y-2 items-center justify-center w-20"
                href={`/${name.toLowerCase()}`}
              >
                <Image
                  alt={name}
                  className="rounded-full w-full h-auto"
                  height={80}
                  loading="lazy"
                  src={`https://unavatar.io/github/${user}`}
                  width={80}
                />
                <span className="block w-20 whitespace-nowrap overflow-hidden text-ellipsis text-xs">{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
