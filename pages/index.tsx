import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles, ShoppingBag, LogIn, Heart, Package} from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './about.module.css';

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAboutMinimized, setIsAboutMinimized] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [slideWidth, setSlideWidth] = useState(300); // default width
  const slideRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax for each block (adjust the ranges for more/less movement)
  const yMission = useTransform(scrollY, [0, 400], [0, 60]);
  const yValues = useTransform(scrollY, [0, 400], [0, 0]);
  const yFounder = useTransform(scrollY, [0, 400], [0, 140]);
  const yInstagram = useTransform(scrollY, [0, 400], [0, 180]);
  const yCarousel = useTransform(scrollY, [0, 400], [0, 0]);
  const yHero = useTransform(scrollY, [0, 200], [0, -120]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0]);
  const opacityValues = useTransform(scrollY, [200, 350, 600], [0, 1, 0]);

  // Sample images for the carousel - replace with your actual images
  const carouselImages = [
    {
      src: '/box-crop.png',
      alt: 'Mandy Toolbox'
    },
    {
      src: '/carousel-image-2.png',
      alt: 'Mandy Bronco'
    },
    {
      src: '/hero-cb-edit.png',
      alt: 'Mandy Hero'
    },
    {
      src: '/wrench.png',
      alt: 'Mandy Wrench'
    }
    ,
    {
      src: '/denim-4517843_1280.jpg',
      alt: 'Denim'
    },
    {
      src: '/carousel-image.png',
      alt: 'Behind the Scenes'
    },
    {
      src: '/mandy-collage.png',
      alt: 'Mandy Collage'
    }
  ];

    // Repeat images many times for robust infinite scroll
    const repeatCount = 10;
    const continuousImages = Array(repeatCount).fill(carouselImages).flat();
    const totalImages = continuousImages.length;
    const baseLength = carouselImages.length;

    // Start index in the middle
    const [currentImageIndex, setCurrentImageIndex] = useState(baseLength * Math.floor(repeatCount / 2));
    const [isPaused, setIsPaused] = useState(false);
  
// Measure slide width for responsive carousel
useEffect(() => {
  function updateWidth() {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.offsetWidth);
    }
  }
  updateWidth();
  window.addEventListener('resize', updateWidth);
  return () => window.removeEventListener('resize', updateWidth);
}, []);

// Continuous smooth scrolling effect with robust reset
useEffect(() => {
  if (isPaused) return;
  const interval = setInterval(() => {
    setCurrentImageIndex(prev => {
      let next = prev + 0.012; // slightly faster for pixel-based
      if (next > totalImages - baseLength * 2) {
        return baseLength * Math.floor(repeatCount / 2);
      }
      return next;
    });
  }, 60);
  return () => clearInterval(interval);
}, [baseLength, totalImages, isPaused]);

useEffect(() => {
  setShowInstagram(true);
  if (typeof window !== 'undefined' && (window as any).instgrm === undefined) {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  } else if (typeof window !== 'undefined' && (window as any).instgrm) {
    (window as any).instgrm.Embeds.process();
  }
}, []);

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

       {/* Third Window - Follow Mandy */}
       <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(230, 184, 241, 0.8) 0%,rgb(248, 174, 255) 100%)",
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
              background: "linear-gradient(135deg, rgba(230, 184, 241, 0.8) 0%,rgb(248, 174, 255) 100%)",
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
              FOLLOW @SHOPMANDYTOOLS
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
              BUILD WITH US @SHOPMANDYTOOLS
            </h1>
            <motion.section className={styles.carouselSection} style={{ y: yCarousel }}>
            <div className={styles.carouselHeader}>
              <span className={styles.carouselHeaderText}>Build along with us!</span>
              <a
                href="https://instagram.com/shopmandytools"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.carouselHeaderLink}
              >
                @shopmandytools
              </a>
            </div>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselWrapper}>
                <div
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(-${currentImageIndex * slideWidth}px)` }}
                >
                  {continuousImages.map((image, index) => (
                    <div
                      key={index}
                      className={styles.carouselSlide}
                      ref={index === 0 ? slideRef : undefined}
                    >
                      <a href="https://instagram.com/shopmandytools">
                        <img
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          src={image.src}
                          alt={image.alt}
                          className={styles.carouselImage}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
          </div>
        </div>
      </div>
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
              READY TO START BUILDING?
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
              YOUR NEXT PROJECT IS ONE TOOLKIT AWAY
            </h1>
            <div className={styles.aboutContent}>
              <p>
              Browse our complete collection of curated toolkits and find everything you need to bring your DIY dreams to life. Quality tools, expert picks!
              </p>
              <button
                    key={'shop'}
                    onClick={() => handleButtonClick('https://shopmandy.com/')}
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
                    <Package className="w-4 h-4 mr-2" />
                    Shop All Toolkits
                   
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
