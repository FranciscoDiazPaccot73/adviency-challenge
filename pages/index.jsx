import Head from 'next/head'
import Image from 'next/image'

import TwitterIcon from '../components/icons/TwitterIcon'

import styles from '../styles/Home.module.css'

const users = [
  { name: 'Joel', user: 'joelwaiman' },
  { name: 'Fran', user: 'FranciscoDiazPaccot73' },
]

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adviency Challenge</title>
        <meta name="description" content="Adviency Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Adviency Challenge
        </h2>
        <a className='mt-8' href='https://twitter.com/goncy/status/1597581740746637314' target="_blank">
          <TwitterIcon />
        </a>

        <ul className='flex flex-wrap gap-7 justify-center mt-24'>
          {users.map(({ name, user}) => (
            <li key={user} className='inline-flex flex-shrink-0'>
              <a
                className='text-white visited:text-neutral-400 hover:underline text-center flex flex-col gap-y-2 items-center justify-center w-20'
                href={`/${name.toLowerCase()}`}
              >
                <img
                  loading='lazy'
                  width='80px'
                  height='80px'
                  className='rounded-full w-full h-auto'
                  src={'https://unavatar.io/github/' + user}
                  alt={name}
                />
                <span className='block w-20 whitespace-nowrap overflow-hidden text-ellipsis text-xs'>
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
