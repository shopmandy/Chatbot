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
     <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <>
    <header className="header">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap" rel="stylesheet"/>
      <div className="header-left">
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link className="nav-link" href="/" onClick={closeMenu}>HOME</Link>
          <Link className="nav-link" href="/about" onClick={closeMenu}><span>ABOUT</span></Link>
          <Link className="nav-link" href="/chatbot" onClick={closeMenu}><span>CHATBOT</span></Link>
          <Link className="nav-link" href="/room" onClick={closeMenu}><span>ROOM</span></Link>
          <a 
            className="nav-link" 
            href="https://shopmandy.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span>
            SHOP
            </span>
          </a>
          <div className="header-auth-mobile">
            <SignedOut>
              <SignInButton mode="modal">
                <a className="nav-link" style={{ cursor: 'pointer' }}>
                  <span>SIGN IN</span>
                </a>
              </SignInButton>
              <SignUpButton mode="modal">
                <a className="nav-link" style={{ cursor: 'pointer' }}>
                  <span>SIGN UP</span>
                </a>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
      <div className="header-auth-desktop">
        <SignedOut>
          <SignInButton mode="modal">
            <a className="nav-link" style={{ cursor: 'pointer' }}>
              <span>SIGN IN</span>
            </a>
          </SignInButton>
          <SignUpButton mode="modal">
            <a className="nav-link" style={{ cursor: 'pointer' }}>
              <span>SIGN UP</span>
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
