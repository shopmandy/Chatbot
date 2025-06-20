import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";


export default function Home() {
  return (
    
    <div
    
      style={{
        backgroundColor: "#ffe0f2",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#ff0080",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ff003c",
            marginBottom: "0.5rem",
          }}
        >
          YOUR DIY BFF
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "1.1rem", color: "#333", flex: 1 }}>
            Whether you're hanging a shelf or redecorating your space, Mandy’s
            got the tools and tips to help you do it yourself.
          </p>
          <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
            <Image src="/star.png" alt="sparkle star" width={40} height={40} />
          </div>
        </div>

        {/* 3-column layout */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Column 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Image
              src="/redecorate.png"
              alt="Redecorate"
              width={280}
              height={280}
              style={{ borderRadius: "12px" }}
            />
            <Image
              src="/flowers2.png"
              alt="Flowers 2"
              width={280}
              height={280}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Column 2 - Center */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Image
              src="/ask-mandy.png"
              alt="Ask Mandy"
              width={280}
              height={550}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Column 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Image
              src="/flowers1.png"
              alt="Flowers 1"
              width={280}
              height={280}
              style={{ borderRadius: "12px" }}
            />
            <Image
              src="/denim.png"
              alt="Denim texture"
              width={280}
              height={280}
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* Hero Message */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            backgroundImage: "url('/clouds.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            color: "#ff0099",
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          MANDY IS ALL ABOUT THE GIRLS DOING IT FOR THEMSELVES.
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1.25rem",
            textAlign: "center",
            marginTop: "2rem",
            color: "#444",
            fontWeight: "600",
            lineHeight: 1.5,
          }}
        >
          🚧🔨 to break down
          <br />
          <span style={{ fontStyle: "italic", color: "#999" }}>
            barriers and stereotypes
          </span>
          <br />
          in the world of DIY 🪛👜
        </p>
      </div>
    </div>
  );
}
