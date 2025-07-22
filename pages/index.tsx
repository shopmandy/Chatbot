import Image from "next/image";
import { useState } from "react";
import { MessageCircle, Sparkles, ShoppingBag, LogIn, Heart } from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAboutMinimized, setIsAboutMinimized] = useState(false);
  
  const handleButtonClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleAboutMinimize = () => {
    setIsAboutMinimized(!isAboutMinimized);
  };

  const navItems = [
    { id: 'chatbot', label: 'DIY Chatbot', icon: MessageCircle, path: '/chatbot' },
    { id: 'room', label: 'Room Generator', icon: Sparkles, path: '/room' },
    { id: 'shop', label: 'Shop Toolkits', icon: ShoppingBag, path: 'https://shopmandy.com/', external: true },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffe0f2",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#ff0080",
        minHeight: "100vh",
      }}
    >
      {/* Windows-style Section */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255, 224, 242, 0.8) 0%, rgba(224, 234, 255, 0.8) 100%)",
            border: "2px solid #f91b8f",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(255, 105, 180, 0.3)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Window Title Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, #c8d2f0 100%)",
              borderBottom: "2px solid #f91b8f",
              padding: "12px 20px",
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: "16px",
              fontWeight: "600",
              color: "#ff69b4",
              boxShadow: "0 2px 12px rgba(255, 105, 180, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "700",
                letterSpacing: "1px",
                textShadow: "0 0 8px rgba(255, 182, 230, 0.5)",
              }}
            >
              <span style={{ fontSize: "18px", color: "#f91b8f"}}></span>
              YOUR DIY BFF
            </div>
                         <div className="window-controls">
                 <button 
                   className="window-buttons" 
                   title="Minimize"
                   onClick={handleMinimize}
                 >
                   <span className="window-button-icon">─</span>
                 </button>
                 <button className="window-buttons" title="Maximize">
                   <span className="window-button-icon">□</span>
                 </button>
                 <button className="window-buttons" title="Close">
                   <span className="window-button-icon">×</span>
                 </button>
               </div>
          </div>

          {/* Section Content */}
          <div 
            style={{ 
              padding: "2rem", 
              textAlign: "center",
              display: isMinimized ? "none" : "block",
              transition: "all 0.3s ease"
            }}
          >
            <h1
              style={{
                fontSize: "2.8rem",
                color: "#f91b8f",
                marginBottom: "2rem",
                fontWeight: "600",
                lineHeight: "1.5",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              }}
            >
              WELCOME TO MANDY'S WORKSHOP
            </h1>
            <p style={{
              fontSize: "1.6rem",
              color: "#f91b8f",
              marginBottom: "2rem",
              fontWeight: "600",
              lineHeight: "1.5",
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            }}>
              Get instant help with home projects, decor ideas,
              and DIY tips. Just ask Mandy anything!
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
                flexWrap: "wrap",
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const subheadings = {
                  chatbot: "Chat with Mandy",
                  room: "AI-powered design",
                  shop: "Get equipped"
                };
                return (
                  <button
                    key={item.id}
                    onClick={() => handleButtonClick(item.path)}
                    className="nav-link home-button"
                    style={{
                      width: "160px",
                      textAlign: "center",
                      fontSize: "0.8rem",
                      fontFamily: "'Press Start 2P', VT323, Poppins, Montserrat, Arial, sans-serif",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      borderRadius: "24px",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      cursor: "pointer",
                      margin: "0",
                      height: "auto",
                      minHeight: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Icon style={{ width: 24, height: 24 }} />
                    <span>{item.label}</span>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      fontWeight: "600", 
                      letterSpacing: "0.5px",
                      opacity: 0.8,
                      lineHeight: 1.2,
                      padding: "0.5rem",
                      fontFamily: "Poppins, Montserrat, Arial, sans-serif"
                    }}>
                      {subheadings[item.id as keyof typeof subheadings]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Second Window - About Mandy */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255, 224, 242, 0.8) 0%, #ffdcae 100%)",
            border: "2px solid #f91b8f",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(255, 105, 180, 0.3)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Window Title Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, #ffdcae 100%)",
              borderBottom: "2px solid #f91b8f",
              padding: "12px 20px",
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: "16px",
              fontWeight: "600",
              color: "#ff69b4",
              boxShadow: "0 2px 12px rgba(255, 105, 180, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "f91b8f",
                textShadow: "0 0 8px rgba(255, 182, 230, 0.5)",
              }}
            >
              <span style={{ fontSize: "18px", color: "#f91b8f"}}></span>
              ABOUT MANDY
            </div>
                         <div className="window-controls">
                 <button 
                   className="window-buttons" 
                   title="Minimize"
                   onClick={handleAboutMinimize}
                 >
                   <span className="window-button-icon">─</span>
                 </button>
                <button className="window-buttons" title="Maximize">
                  <span className="window-button-icon">□</span>
                </button>
                <button className="window-buttons" title="Close">
                  <span className="window-button-icon">×</span>
                </button>
              </div>
          </div>

          {/* Section Content */}
          <div 
            style={{ 
              padding: "2rem", 
              textAlign: "left",
              display: isAboutMinimized ? "none" : "block",
              transition: "all 0.3s ease"
            }}
          >
            <h1
              style={{
                fontSize: "3.2rem",
                color: "#f91b8f",
                marginBottom: "2rem",
                fontWeight: "600",
                letterSpacing: "2px",
                lineHeight: "1.5",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              }}
            >
              AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO-IT-HERSELF WITH THE RIGHT TOOLS.
            </h1>
                         <div style={{
               display: "flex",
               alignItems: "flex-start",
               gap: "3rem",
               marginBottom: "2rem"
             }}>
               <div className="mt-6" style={{ flex: "0 0 50%", marginTop: "5rem" }}>
                 <p className="font-semibold text-xl mb-4">
                   We are dedicated to empowering women to confidently build, repair, and 
                   get it done, and we're here to provide the tools to make it happen.
                 </p>
                 
                 <p className="font-semibold text-xl mb-6">
                   Our mission is to break down barriers and stereotypes in the world of DIY 
                   by offering thoughtfully designed tools that cater to the needs and 
                   preferences of women.
                 </p>
               <h3 className="font-bold text-3xl mb-4">We are committed to:</h3>
                 <ul className="space-y-2 text-xl">
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-current" />
                      <span className="font-semibold">Quality and Innovation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-current" />
                      <span className="font-semibold">Education and Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-current" />
                      <span className="font-semibold">Inclusivity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-current" />
                      <span className="font-semibold">Sustainability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-current" />
                      <span className="font-semibold">Community Building</span>
                    </li>
                  </ul>
                  
                  <p className="font-semibold mt-6 text-xl">
                    Mandy is not just a brand; it's a movement. We are here to redefine what it 
                    means to be handy and to ensure that every woman has the tools and 
                    knowledge to turn her desires into reality.
                  </p>
               </div>
               <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "5rem" }}>
                 <Image 
                   src="/box-crop.png" 
                   alt="Mandy's tools and equipment" 
                   width={400} 
                   height={400}
                   style={{ 
                     borderRadius: "12px",
                     boxShadow: "0 8px 24px rgba(255, 105, 180, 0.2)"
                   }}
                 />
               </div>
             </div>
           </div>
        </div>
      </div>
      {/* Third Window - Founder */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(97, 179, 242, 0.8) 0%,rgb(175, 219, 244) 100%)",
            border: "2px solid #f91b8f",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(255, 105, 180, 0.3)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Window Title Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, rgba(97, 179, 242, 0.8) 0%, rgb(175, 219, 244) 100%)",
              borderBottom: "2px solid #f91b8f",
              padding: "12px 20px",
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: "16px",
              fontWeight: "600",
              color: "#ff69b4",
              boxShadow: "0 2px 12px rgba(255, 105, 180, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "f91b8f",
                textShadow: "0 0 8px rgba(255, 182, 230, 0.5)",
              }}
            >
              <span style={{ fontSize: "18px", color: "#f91b8f"}}></span>
              WHO IS MANDY?
            </div>
                         <div className="window-controls">
                 <button 
                   className="window-buttons" 
                   title="Minimize"
                   onClick={handleAboutMinimize}
                 >
                   <span className="window-button-icon">─</span>
                 </button>
                <button className="window-buttons" title="Maximize">
                  <span className="window-button-icon">□</span>
                </button>
                <button className="window-buttons" title="Close">
                  <span className="window-button-icon">×</span>
                </button>
              </div>
          </div>

          {/* Section Content */}
          <div 
            style={{ 
              padding: "2rem", 
              textAlign: "left",
              display: isAboutMinimized ? "none" : "block",
              transition: "all 0.3s ease"
            }}
            
          >
            <h1
              style={{
                fontSize: "3.2rem",
                color: "#f91b8f",
                marginBottom: "2rem",
                fontWeight: "600",
                letterSpacing: "2px",
                lineHeight: "1.5",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              }}
            >
              FEMALE FOUNDED
            </h1>
            <div style={{
               display: "flex",
               alignItems: "flex-start",
               gap: "3rem",
               marginBottom: "2rem"
             }}>
               <div className="mt-6" style={{ flex: "0 0 50%"}}>
            <p className="font-semibold mt-6 text-xl">
              Mandy was founded by Caroline Blanck, an entrepreneur with a background in sustainability, law, and emerging tech. Her goal? Make DIY feel like it belongs to everyone—especially women.
            </p>
            <p className="font-semibold mt-6 text-xl">
              Today, Mandy is powered by an all-women and BIPOC-led team blending design, technology, and self-reliance. We're reimagining tools to be functional, intuitive, and beautiful—built for how we live now.
            </p>
            <p className="font-semibold mt-6 text-xl">
              DIY isn't just a skill—it's a mindset. Our tools are made to spark confidence, creativity, and control.
            </p>
            <p className="font-semibold mt-6 text-xl">
              Let's build something better.
            </p>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
                 <Image 
                   src="/founder.png" 
                   alt="Mandy's Founder, Caroline Blanck" 
                   width={400} 
                   height={400}
                   style={{ 
                     borderRadius: "12px",
                     boxShadow: "0 8px 24px rgba(255, 105, 180, 0.2)"
                   }}
                 />
               </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
