import "@/styles/globals.css";
import Link from 'next/link';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link className="nav-link" href="/" style={{ marginRight: '1rem' }}>HOME</Link>
        <Link className="nav-link" href="/about" style={{ marginRight: '1rem' }}>ABOUT</Link>
        <Link className="nav-link" href="/chatbot" style={{ marginRight: '1rem' }}>CHATBOT</Link>
        <a 
          className="nav-link" 
          href="https://shopmandy.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ marginRight: '1rem' }}
        >
          SHOP
        </a>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
