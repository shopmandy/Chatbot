import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles, ShoppingBag, LogIn, Heart, Package, Star, ArrowRight, Zap, Users, Award} from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './about.module.css';

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAboutMinimized, setIsAboutMinimized] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [slideWidth, setSlideWidth] = useState(300);
  const [activeFeature, setActiveFeature] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const yMission = useTransform(scrollY, [0, 400], [0, 60]);
  const yValues = useTransform(scrollY, [0, 400], [0, 0]);
  const yFounder = useTransform(scrollY, [0, 400], [0, 140]);
  const yInstagram = useTransform(scrollY, [0, 400], [0, 180]);
  const yCarousel = useTransform(scrollY, [0, 400], [0, 0]);
  const yHero = useTransform(scrollY, [0, 200], [0, -120]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0]);
  const opacityValues = useTransform(scrollY, [200, 350, 600], [0, 1, 0]);
  const scaleHero = useTransform(scrollY, [0, 200], [1, 0.95]);

  // Feature highlights for enhanced hero
  const features = [
    {
      icon: Zap,
      title: "Instant AI Help",
      description: "Get expert DIY advice in seconds"
    },
    {
      icon: Sparkles,
      title: "Smart Design",
      description: "AI-powered room transformations"
    },
    {
      icon: Package,
      title: "Curated Tools",
      description: "Handpicked equipment for every project"
    }
  ];

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
    },
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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

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
      {/* Enhanced Hero Section */}
      <motion.div 
        style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
        className="hero-section"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(224, 234, 255, 0.9) 100%)",
              border: "3px solid #f91b8f",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Enhanced Window Title Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, #c8d2f0 100%)",
                borderBottom: "3px solid #f91b8f",
                padding: "16px 24px",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ff69b4",
                boxShadow: "0 4px 20px rgba(255, 105, 180, 0.2)",
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textShadow: "0 0 12px rgba(255, 182, 230, 0.6)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Star style={{ width: 20, height: 20, color: "#f91b8f" }} />
                YOUR DIY BFF
              </motion.div>
              <div className="window-controls">
                <motion.button 
                  className="window-buttons" 
                  title="Minimize"
                  onClick={handleMinimize}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">─</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Maximize"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">□</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">×</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Section Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                padding: "3rem", 
                textAlign: "center",
                display: isMinimized ? "none" : "block",
                transition: "all 0.3s ease"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  fontSize: "3.2rem",
                  color: "#f91b8f",
                  marginBottom: "1.5rem",
                  fontWeight: "700",
                  lineHeight: "1.3",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
                }}
              >
                WELCOME TO MANDY'S WORKSHOP
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  fontSize: "1.8rem",
                  color: "#f91b8f",
                  marginBottom: "3rem",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  opacity: 0.9,
                }}
              >
                Get instant help with home projects, decor ideas,
                and DIY tips. Just ask Mandy anything!
              </motion.p>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  marginBottom: "3rem",
                  flexWrap: "wrap",
                }}
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = index === activeFeature;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.7, 
                        scale: isActive ? 1.05 : 1,
                        y: isActive ? -5 : 0
                      }}
                      transition={{ duration: 0.5 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "1rem",
                        borderRadius: "16px",
                        background: isActive 
                          ? "linear-gradient(135deg, rgba(255, 182, 230, 0.3) 0%, rgba(200, 210, 255, 0.3) 100%)"
                          : "transparent",
                        border: isActive ? "2px solid #f91b8f" : "2px solid transparent",
                        transition: "all 0.3s ease",
                        minWidth: "150px",
                      }}
                    >
                      <Icon 
                        style={{ 
                          width: 32, 
                          height: 32, 
                          color: isActive ? "#f91b8f" : "#ff69b4",
                          filter: isActive ? "drop-shadow(0 4px 8px rgba(255, 105, 180, 0.4))" : "none"
                        }} 
                      />
                      <span style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "#f91b8f",
                        fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                      }}>
                        {feature.title}
                      </span>
                      <span style={{
                        fontSize: "0.8rem",
                        color: "#ff69b4",
                        opacity: 0.8,
                        textAlign: "center",
                        fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                      }}>
                        {feature.description}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Enhanced Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  flexWrap: "wrap",
                }}
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const subheadings = {
                    chatbot: "Chat with Mandy",
                    room: "AI-powered design",
                    shop: "Get equipped"
                  };
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        boxShadow: "0 12px 32px rgba(255, 105, 180, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleButtonClick(item.path)}
                      className="nav-link home-button"
                      style={{
                        width: "180px",
                        textAlign: "center",
                        fontSize: "0.9rem",
                        fontFamily: "'Press Start 2P', VT323, Poppins, Montserrat, Arial, sans-serif",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        borderRadius: "28px",
                        border: "none",
                        padding: "0.8rem 1.2rem",
                        cursor: "pointer",
                        margin: "0",
                        height: "auto",
                        minHeight: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.8rem",
                        background: "linear-gradient(135deg, #fff6fa 0%, #f0f3fb 100%)",
                        boxShadow: "0 8px 24px rgba(255, 105, 180, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon style={{ width: 28, height: 28 }} />
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
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced About Section */}
      <motion.div 
        style={{ y: yMission }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(255, 220, 174, 0.9) 100%)",
              border: "3px solid #f91b8f",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Enhanced Window Title Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, rgba(255, 220, 174, 0.95) 100%)",
                borderBottom: "3px solid #f91b8f",
                padding: "16px 24px",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ff69b4",
                boxShadow: "0 4px 20px rgba(255, 105, 180, 0.2)",
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textShadow: "0 0 12px rgba(255, 182, 230, 0.6)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Award style={{ width: 20, height: 20, color: "#f91b8f" }} />
                ABOUT MANDY
              </motion.div>
              <div className="window-controls">
                <motion.button 
                  className="window-buttons" 
                  title="Minimize"
                  onClick={handleAboutMinimize}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">─</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Maximize"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">□</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">×</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Section Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              style={{ 
                padding: "3rem", 
                textAlign: "left",
                display: isAboutMinimized ? "none" : "block",
                transition: "all 0.3s ease"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "3.6rem",
                  color: "#f91b8f",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  lineHeight: "1.2",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
                  marginBottom: "2rem",
                }}
              >
                AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO-IT-HERSELF WITH THE RIGHT TOOLS.
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "3rem",
                  marginBottom: "2rem"
                }}
              >
                <motion.div 
                  style={{ flex: "0 0 50%", marginTop: "2rem" }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <motion.p 
                    className="font-semibold text-xl mb-6"
                    style={{
                      fontSize: "1.3rem",
                      color: "#f91b8f",
                      lineHeight: "1.6",
                      fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                      fontWeight: "600",
                      marginBottom: "2rem",
                    }}
                  >
                    We are dedicated to empowering women to confidently build, repair, and 
                    get it done, and we're here to provide the tools to make it happen.
                  </motion.p>
                  
                  <motion.p 
                    className="font-semibold text-xl mb-8"
                    style={{
                      fontSize: "1.3rem",
                      color: "#f91b8f",
                      lineHeight: "1.6",
                      fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                      fontWeight: "600",
                      marginBottom: "2rem",
                    }}
                  >
                    Our mission is to break down barriers and stereotypes in the world of DIY 
                    by offering thoughtfully designed tools that cater to the needs and 
                    preferences of women.
                  </motion.p>
                  
                  <motion.h3 
                    className="font-bold text-3xl mb-6"
                    style={{
                      fontSize: "2rem",
                      color: "#f91b8f",
                      fontWeight: "700",
                      fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                      marginBottom: "1.5rem",
                    }}
                  >
                    We are committed to:
                  </motion.h3>
                  
                  <motion.ul 
                    className="space-y-3 text-xl"
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {[
                      "Quality and Innovation",
                      "Education and Support", 
                      "Inclusivity",
                      "Sustainability",
                      "Community Building"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "1rem",
                          fontSize: "1.2rem",
                          color: "#f91b8f",
                          fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Heart 
                            style={{ 
                              width: 24, 
                              height: 24, 
                              color: "#f91b8f",
                              filter: "drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3))"
                            }} 
                          />
                        </motion.div>
                        <span style={{ fontWeight: "600" }}>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.p 
                    className="font-semibold mt-8 text-xl"
                    style={{
                      fontSize: "1.3rem",
                      color: "#f91b8f",
                      lineHeight: "1.6",
                      fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                      fontWeight: "600",
                      marginTop: "2rem",
                    }}
                  >
                    Mandy is not just a brand; it's a movement. We are here to redefine what it 
                    means to be handy and to ensure that every woman has the tools and 
                    knowledge to turn her desires into reality.
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  style={{ 
                    flex: 1, 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "flex-start", 
                    marginTop: "2rem" 
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 16px 48px rgba(255, 105, 180, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/box-crop.png" 
                      alt="Mandy's tools and equipment" 
                      width={450} 
                      height={450}
                      style={{ 
                        borderRadius: "16px",
                        boxShadow: "0 12px 32px rgba(255, 105, 180, 0.25)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Enhanced Founder Section */}
      <motion.div 
        style={{ y: yFounder }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(97, 179, 242, 0.9) 0%, rgba(175, 219, 244, 0.9) 100%)",
              border: "3px solid #f91b8f",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Enhanced Window Title Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(97, 179, 242, 0.95) 0%, rgba(175, 219, 244, 0.95) 100%)",
                borderBottom: "3px solid #f91b8f",
                padding: "16px 24px",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ff69b4",
                boxShadow: "0 4px 20px rgba(255, 105, 180, 0.2)",
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textShadow: "0 0 12px rgba(255, 182, 230, 0.6)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Users style={{ width: 20, height: 20, color: "#f91b8f" }} />
                WHO IS MANDY?
              </motion.div>
              <div className="window-controls">
                <motion.button 
                  className="window-buttons" 
                  title="Minimize"
                  onClick={handleAboutMinimize}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">─</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Maximize"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">□</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">×</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Section Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              style={{ 
                padding: "3rem", 
                textAlign: "left",
                display: isAboutMinimized ? "none" : "block",
                transition: "all 0.3s ease"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "3.6rem",
                  color: "#f91b8f",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  lineHeight: "1.3",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
                  marginBottom: "2rem",
                }}
              >
                FEMALE FOUNDED
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "3rem",
                  marginBottom: "2rem"
                }}
              >
                <motion.div 
                  style={{ flex: "0 0 50%", marginTop: "1rem" }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  {[
                    "Mandy was founded by Caroline Blanck, an entrepreneur with a background in sustainability, law, and emerging tech. Her goal? Make DIY feel like it belongs to everyone—especially women.",
                    "Today, Mandy is powered by an all-women and BIPOC-led team blending design, technology, and self-reliance. We're reimagining tools to be functional, intuitive, and beautiful—built for how we live now.",
                    "DIY isn't just a skill—it's a mindset. Our tools are made to spark confidence, creativity, and control.",
                    "Let's build something better."
                  ].map((paragraph, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                      viewport={{ once: true }}
                      style={{
                        fontSize: "1.3rem",
                        color: "#f91b8f",
                        lineHeight: "1.6",
                        fontFamily: "Poppins, Montserrat, Arial, sans-serif",
                        fontWeight: "600",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
                
                <motion.div 
                  style={{ 
                    flex: 1, 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "flex-start",
                    marginTop: "1rem"
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 16px 48px rgba(255, 105, 180, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/founder.png" 
                      alt="Mandy's Founder, Caroline Blanck" 
                      width={450} 
                      height={450}
                      style={{ 
                        borderRadius: "16px",
                        boxShadow: "0 12px 32px rgba(255, 105, 180, 0.25)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

       {/* Enhanced Instagram Section */}
       <motion.div 
         style={{ y: yInstagram }}
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         viewport={{ once: true }}
       >
         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             style={{
               background: "linear-gradient(135deg, rgba(230, 184, 241, 0.9) 0%, rgba(248, 174, 255, 0.9) 100%)",
               border: "3px solid #f91b8f",
               borderRadius: "24px",
               boxShadow: "0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
               backdropFilter: "blur(20px)",
               overflow: "hidden",
               marginBottom: "3rem",
               position: "relative",
             }}
           >
             {/* Enhanced Window Title Bar */}
             <motion.div
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               viewport={{ once: true }}
               style={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
                 background: "linear-gradient(135deg, rgba(230, 184, 241, 0.95) 0%, rgba(248, 174, 255, 0.95) 100%)",
                 borderBottom: "3px solid #f91b8f",
                 padding: "16px 24px",
                 fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                 fontSize: "18px",
                 fontWeight: "700",
                 color: "#ff69b4",
                 boxShadow: "0 4px 20px rgba(255, 105, 180, 0.2)",
               }}
             >
               <motion.div
                 style={{
                   display: "flex",
                   alignItems: "center",
                   gap: "12px",
                   fontWeight: "700",
                   letterSpacing: "2px",
                   textShadow: "0 0 12px rgba(255, 182, 230, 0.6)",
                 }}
                 whileHover={{ scale: 1.05 }}
                 transition={{ duration: 0.2 }}
               >
                 <Heart style={{ width: 20, height: 20, color: "#f91b8f" }} />
                 FOLLOW @SHOPMANDYTOOLS
               </motion.div>
               <div className="window-controls">
                 <motion.button 
                   className="window-buttons" 
                   title="Minimize"
                   onClick={handleAboutMinimize}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <span className="window-button-icon">─</span>
                 </motion.button>
                 <motion.button 
                   className="window-buttons" 
                   title="Maximize"
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <span className="window-button-icon">□</span>
                 </motion.button>
                 <motion.button 
                   className="window-buttons" 
                   title="Close"
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <span className="window-button-icon">×</span>
                 </motion.button>
               </div>
             </motion.div>

             {/* Enhanced Section Content */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               viewport={{ once: true }}
               style={{ 
                 padding: "3rem", 
                 textAlign: "center",
                 display: isAboutMinimized ? "none" : "block",
                 transition: "all 0.3s ease"
               }}
             >
               <motion.h1
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.8 }}
                 viewport={{ once: true }}
                 style={{
                   fontSize: "3.6rem",
                   color: "#f91b8f",
                   marginBottom: "2rem",
                   fontWeight: "700",
                   letterSpacing: "2px",
                   lineHeight: "1.3",
                   fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                   textShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
                 }}
               >
                 BUILD WITH US @SHOPMANDYTOOLS
               </motion.h1>
               
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.0 }}
                 viewport={{ once: true }}
                 style={{
                   position: "relative",
                   overflow: "hidden",
                   borderRadius: "16px",
                   background: "rgba(255, 255, 255, 0.1)",
                   padding: "2rem",
                   marginTop: "2rem",
                 }}
               >
                 <motion.section 
                   className={styles.carouselSection} 
                   style={{ y: yCarousel }}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 0.8, delay: 1.2 }}
                   viewport={{ once: true }}
                 >
                   <div className={styles.carouselHeader}>
                   </div>
                   <div className={styles.carouselContainer}>
                     <div className={styles.carouselWrapper}>
                       <div
                         className={styles.carouselTrack}
                         style={{ transform: `translateX(-${currentImageIndex * slideWidth}px)` }}
                       >
                         {continuousImages.map((image, index) => (
                           <motion.div
                             key={index}
                             className={styles.carouselSlide}
                             ref={index === 0 ? slideRef : undefined}
                             whileHover={{ scale: 1.05 }}
                             transition={{ duration: 0.3 }}
                           >
                             <a href="https://instagram.com/shopmandytools">
                               <img
                                 onMouseEnter={() => setIsPaused(true)}
                                 onMouseLeave={() => setIsPaused(false)}
                                 src={image.src}
                                 alt={image.alt}
                                 className={styles.carouselImage}
                                 style={{
                                   transition: "all 0.3s ease",
                                   filter: "brightness(0.9) contrast(1.1)",
                                 }}
                               />
                             </a>
                           </motion.div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </motion.section>
               </motion.div>
             </motion.div>
           </motion.div>
         </div>
       </motion.div>
      {/* Enhanced Final CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ marginTop: "10rem" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(250, 238, 246, 0.9) 100%)",
              border: "3px solid #f91b8f",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            {/* Enhanced Window Title Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, rgba(255, 220, 174, 0.95) 100%)",
                borderBottom: "3px solid #f91b8f",
                padding: "16px 24px",
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: "18px",
                fontWeight: "700",
                color: "#ff69b4",
                boxShadow: "0 4px 20px rgba(255, 105, 180, 0.2)",
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textShadow: "0 0 12px rgba(255, 182, 230, 0.6)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles style={{ width: 20, height: 20, color: "#f91b8f" }} />
                READY TO START BUILDING?
              </motion.div>
              <div className="window-controls">
                <motion.button 
                  className="window-buttons" 
                  title="Minimize"
                  onClick={handleAboutMinimize}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">─</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Maximize"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">□</span>
                </motion.button>
                <motion.button 
                  className="window-buttons" 
                  title="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="window-button-icon">×</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Section Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              style={{ 
                padding: "3rem", 
                textAlign: "center",
                display: isAboutMinimized ? "none" : "block",
                transition: "all 0.3s ease"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "3.2rem",
                  color: "#f91b8f",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  lineHeight: "1.2",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  textShadow: "0 4px 16px rgba(255, 105, 180, 0.3)",
                }}
              >
                YOUR NEXT PROJECT IS ONE<br />
                <span style={{ marginLeft: "2rem" }}>TOOLKIT AWAY</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "1.4rem",
                  color: "#f91b8f",
                  marginBottom: "3rem",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textAlign: "center",
                  opacity: 0.9,
                }}
              >
                Browse our complete collection of curated toolkits and find everything you need<br />
                to bring your DIY dreams to life. Quality tools, expert picks!
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  flexWrap: "wrap"
                }}
              >
                                 {/* Enhanced Shop All Toolkits Button */}
                 <motion.div 
                   style={{ position: "relative", display: "inline-block" }}
                   whileHover={{ y: -5 }}
                   transition={{ duration: 0.3 }}
                 >
                   {/* Shadow layer */}
                   <motion.div 
                     style={{
                       position: "absolute",
                       top: "4px",
                       left: "4px",
                       width: "100%",
                       height: "100%",
                       backgroundColor: "#4a1d3d",
                       borderRadius: "12px",
                       zIndex: 1,
                       opacity: 0.7
                     }}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.3 }}
                   />
                  {/* Main button */}
                  <motion.button
                    onClick={() => handleButtonClick('https://shopmandy.com/')}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 12px 32px rgba(249, 27, 143, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: "relative",
                      width: "200px",
                      textAlign: "center",
                      fontSize: "1rem",
                      fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      borderRadius: "12px",
                      border: "2px solid #4a1d3d",
                      padding: "16px 20px",
                      cursor: "heart",
                      margin: "0",
                      backgroundColor: "#f91b8f",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      zIndex: 2,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Package style={{ width: 52, height: 52, color: "white" }} />
                    <span>Shop All Toolkits</span>
                  </motion.button>
                </motion.div>

                                 {/* Enhanced Join Community Button */}
                 <motion.div 
                   style={{ position: "relative", display: "inline-block" }}
                   whileHover={{ y: -5 }}
                   transition={{ duration: 0.3 }}
                 >
                   {/* Shadow layer */}
                   <motion.div 
                     style={{
                       position: "absolute",
                       top: "4px",
                       left: "4px",
                       height: "100%",
                       width: "100%",
                       backgroundColor: "#4a1d3d",
                       borderRadius: "12px",
                       zIndex: 1,
                       opacity: 0.7
                     }}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.3 }}
                   />
                  {/* Main button */}
                  <motion.button
                    onClick={() => handleButtonClick('https://instagram.com/shopmandytools')}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 12px 32px rgba(249, 27, 143, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: "relative",
                      width: "200px",
                      textAlign: "center",
                      fontSize: "1rem",
                      fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      borderRadius: "12px",
                      border: "2px solid #4a1d3d",
                      padding: "16px 20px",
                      cursor: "pointer",
                      margin: "0",
                      backgroundColor: "#f91b8f",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      zIndex: 2,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Heart style={{ width: 52, height: 52, color: "white" }} />
                    <span>Join Community</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
