import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'), {
  suspense: true,
})

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

  return (
    <div>
      {showHeader ? <Header /> : null}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
