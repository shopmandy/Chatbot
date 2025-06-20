import "@/styles/globals.css";
import Link from 'next/link';
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";


export default function App({ Component, pageProps }: AppProps) {
  const [menuOpen, setMenuOpen] = useState(false); //menu for mobile nav bar

  const closeMenu = () => setMenuOpen(false);

  return (
    <ClerkProvider {...pageProps}>
    <>
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link className="nav-link" href="/" style={{ marginRight: '1rem' }} onClick={closeMenu}>HOME</Link>
          <Link className="nav-link" href="/about" style={{ marginRight: '1rem' }} onClick={closeMenu}>ABOUT</Link>
          <Link className="nav-link" href="/chatbot" style={{ marginRight: '1rem' }} onClick={closeMenu}>CHATBOT</Link>
          <Link className="nav-link" href="/room" style={{ marginRight: '1rem' }} onClick={closeMenu}>ROOM</Link>
          <a 
            className="nav-link" 
            href="https://shopmandy.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ marginRight: '1rem' }}
            onClick={closeMenu}
          >
            SHOP
          </a>
        </nav>
      </div>
      <div className="header-logo">
        <a href="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '60px'}}
          />
        </a>
      </div>
      <div className="right-spacer" />
            <div className="header-auth" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <SignedOut>
      <SignInButton mode="modal">
        <a className="nav-link" style={{ cursor: 'pointer' }}>
          SIGN IN
        </a>
      </SignInButton>
      <SignUpButton mode="modal">
        <a className="nav-link" style={{ cursor: 'pointer' }}>
          SIGN UP
        </a>
      </SignUpButton>
    </SignedOut>

    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
    </header>
    <main style={{ marginTop: '', padding: '1rem' }}>
      <Component {...pageProps} />
    </main>
    <footer style={{
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#ffe0f2',
        color: '#ff0080',
        fontWeight: 'bold',
        borderTop: '2px solid #ff0080',
      }}>
        💖 Follow us on Instagram:{" "}
        <a
          href="https://www.instagram.com/shopmandytools"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ff0080', textDecoration: 'underline' }}
        >
          @shopmandytools
        </a>
      </footer>
    </>
    </ClerkProvider>
  );
}
