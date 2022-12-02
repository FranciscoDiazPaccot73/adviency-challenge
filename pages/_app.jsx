import { useEffect, useState } from 'react';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== '/' && !showHeader) {
      setShowHeader(true)
    }
  }, [])

  const handleBack = () => window.history.back()

  return (
    <div>
      {showHeader ? (
        <header className='h-10 p-2 max-w-3xl mx-auto'>
          <div onClick={handleBack} className="cursor-pointer inline-block">
            <div className='flex gap-2'>
              <svg viewBox="0 0 320 512" fill='#fff' height={24} width={24}>
                <path
                  d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                />
              </svg>
              <span>Back</span>
            </div>
          </div>
        </header>
      ) : null}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
