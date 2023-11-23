import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import "../styles/globals.css";

const Header = dynamic(() => import("../components/Header"), {
  suspense: true,
});

function MyApp({ Component, pageProps }) {
  const [showHeader, setShowHeader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    if (pathname !== "/" && !showHeader) {
      setShowHeader(true);
    }
  }, []);

  const onGoBack = () => {
    const { pathname } = router;

    if (pathname === "/fran" || pathname === "/joel") {
      setShowHeader(false);
    }
  };

  return (
    <div>
      {showHeader ? <Header goBack={onGoBack} location={window.location.pathname} /> : null}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
