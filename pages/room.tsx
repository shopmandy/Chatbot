import { useState, useEffect, useRef } from 'react'
import styles from "./room.module.css";
import Head from 'next/head'
import { Upload, Download, Sparkles, Home, Hammer, ToyBrick } from "lucide-react"



// --- Simple Dino Game Minigame Modal ---
function DinoGameModal({ show, onClose }: { show: boolean, onClose: () => void }) {
  // Don't show on mobile devices (screen width < 768px)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Listen for Escape key to exit
  useEffect(() => {
    if (!show) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [show, onClose]);
  
  // Don't render anything on mobile
  if (isMobile) return null;
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 180;
  const GROUND_Y = 140;
  const PLAYER_SIZE = 33;
  const OBSTACLE_WIDTH = 24;
  const OBSTACLE_HEIGHT = 24;
  const JUMP_HEIGHT = 68;
  const JUMP_DURATION = 650; // ms
  const OBSTACLE_SPEED = 3.0; // px per frame
  const OBSTACLE_INTERVAL = 1200; // ms

  // Refs for mutable game state
  const playerYRef = useRef(GROUND_Y);
  const isJumpingRef = useRef(false);
  const obstaclesRef = useRef<{x: number}[]>([]);
  const gameOverRef = useRef(false);
  const scoreRef = useRef(0);
  const lastObs = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  // State for re-render
  const [playerY, setPlayerY] = useState(GROUND_Y);
  const [obstacles, setObstacles] = useState<{x: number}[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const highScoreRef = useRef(0);
  const [, forceRerender] = useState(0);
  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  // Handle jump
  const jump = () => {
    if (isJumpingRef.current || gameOverRef.current) return;
    isJumpingRef.current = true;
    const start = Date.now();
    function animateJump() {
      const elapsed = Date.now() - start;
      if (elapsed < JUMP_DURATION / 2) {
        playerYRef.current = GROUND_Y - (JUMP_HEIGHT * (elapsed / (JUMP_DURATION / 2)));
        setPlayerY(playerYRef.current);
        requestAnimationFrame(animateJump);
      } else if (elapsed < JUMP_DURATION) {
        playerYRef.current = GROUND_Y - (JUMP_HEIGHT * (1 - (elapsed - JUMP_DURATION / 2) / (JUMP_DURATION / 2)));
        setPlayerY(playerYRef.current);
        requestAnimationFrame(animateJump);
      } else {
        playerYRef.current = GROUND_Y;
        setPlayerY(playerYRef.current);
        isJumpingRef.current = false;
      }
    }
    animateJump();
  };

  // Handle keyboard and tap
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
        if (gameOverRef.current) restart();
      }
    };
    const onTap = () => {
      jump();
      if (gameOverRef.current) restart();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTap);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTap);
    };
    // eslint-disable-next-line
  }, [show]);

  // Game loop
  useEffect(() => {
    if (!show) return;
    // Reset all refs and state
    playerYRef.current = GROUND_Y;
    isJumpingRef.current = false;
    obstaclesRef.current = [];
    gameOverRef.current = false;
    scoreRef.current = 0;
    lastObs.current = Date.now();
    setPlayerY(GROUND_Y);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
    let running = true;
    function loop() {
      if (!running) return;
      // Move obstacles
      obstaclesRef.current = obstaclesRef.current.map(o => ({ x: o.x - OBSTACLE_SPEED }));
      // Remove off-screen
      obstaclesRef.current = obstaclesRef.current.filter(o => o.x + OBSTACLE_WIDTH > 0);
      // Add new obstacle
      const now = Date.now();
      if (now - lastObs.current > OBSTACLE_INTERVAL) {
        obstaclesRef.current.push({ x: GAME_WIDTH });
        lastObs.current = now;
      }
      // Collision detection
      for (const o of obstaclesRef.current) {
        // Check if player and obstacle overlap horizontally
        const playerLeft = 40;
        const playerRight = playerLeft + PLAYER_SIZE;
        const obstacleLeft = o.x;
        const obstacleRight = o.x + OBSTACLE_WIDTH;
        
        // Check if player and obstacle overlap vertically
        const playerTop = playerYRef.current;
        const playerBottom = playerYRef.current + PLAYER_SIZE;
        const obstacleTop = GROUND_Y + PLAYER_SIZE - OBSTACLE_HEIGHT;
        const obstacleBottom = GROUND_Y + PLAYER_SIZE;
        
        // Check for collision (rectangles overlap)
        if (
          playerRight > obstacleLeft &&
          playerLeft < obstacleRight &&
          playerBottom > obstacleTop &&
          playerTop < obstacleBottom
        ) {
          if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current);
            forceRerender(x => x + 1);
          }
          gameOverRef.current = true;
          setGameOver(true);
          running = false;
          break;
        }
      }
      // Score
      if (!gameOverRef.current) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setPlayerY(playerYRef.current);
        setObstacles([...obstaclesRef.current]);
        rafRef.current = requestAnimationFrame(loop);
      } else {
        // Update high score when game over
        if (scoreRef.current > highScoreRef.current) {
          setHighScore(scoreRef.current);
          forceRerender(x => x + 1);
        }
      }
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line
  }, [show]);

  const restart = () => {
    gameOverRef.current = false;
    scoreRef.current = 0;
    obstaclesRef.current = [];
    playerYRef.current = GROUND_Y;
    isJumpingRef.current = false;
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setPlayerY(GROUND_Y);
    lastObs.current = Date.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(function loop() {
      // Move obstacles
      obstaclesRef.current = obstaclesRef.current.map(o => ({ x: o.x - OBSTACLE_SPEED }));
      obstaclesRef.current = obstaclesRef.current.filter(o => o.x + OBSTACLE_WIDTH > 0);
      // Add new obstacle
      const now = Date.now();
      if (now - lastObs.current > OBSTACLE_INTERVAL) {
        obstaclesRef.current.push({ x: GAME_WIDTH });
        lastObs.current = now;
      }
      // Collision detection
      for (const o of obstaclesRef.current) {
        // Check if player and obstacle overlap horizontally
        const playerLeft = 40;
        const playerRight = playerLeft + PLAYER_SIZE;
        const obstacleLeft = o.x;
        const obstacleRight = o.x + OBSTACLE_WIDTH;
        
        // Check if player and obstacle overlap vertically
        const playerTop = playerYRef.current;
        const playerBottom = playerYRef.current + PLAYER_SIZE;
        const obstacleTop = GROUND_Y + PLAYER_SIZE - OBSTACLE_HEIGHT;
        const obstacleBottom = GROUND_Y + PLAYER_SIZE;
        
        // Check for collision (rectangles overlap)
        if (
          playerRight > obstacleLeft &&
          playerLeft < obstacleRight &&
          playerBottom > obstacleTop &&
          playerTop < obstacleBottom
        ) {
          if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current);
            forceRerender(x => x + 1);
          }
          gameOverRef.current = true;
          setGameOver(true);
          return;
        }
      }
      // Score
      if (!gameOverRef.current) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setPlayerY(playerYRef.current);
        setObstacles([...obstaclesRef.current]);
        rafRef.current = requestAnimationFrame(loop);
      } else {
        // Update high score when game over
        if (scoreRef.current > highScoreRef.current) {
          setHighScore(scoreRef.current);
          forceRerender(x => x + 1);
        }
      }
    });
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(255, 224, 242, 0.92)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Press Start 2P', Tiny5, VT323, Courier New, monospace",
    }}>
      <div style={{
        fontSize: '2.2rem',
        color: '#f91b8f',
        fontWeight: 900,
        marginBottom: '1.2rem',
        textShadow: '0 0 12px #ffb6e6, 0 0 2px #fff',
        letterSpacing: '2px',
        textAlign: 'center',
      }}>
        Jump the Blocks!
      </div>
      <div style={{
        position: 'relative',
        width: GAME_WIDTH, height: GAME_HEIGHT,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 24,
        border: '2.5px solid #f91b8f',
        boxShadow: '0 4px 32px #ffb6e6',
        overflow: 'hidden',
      }}>
        {/* Ground */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          top: GROUND_Y + PLAYER_SIZE,
          height: 8,
          background: 'linear-gradient(90deg, #ff69b4 0%, #b6b6ff 100%)',
        }} />
        {/* Player */}
        <div style={{
          position: 'absolute',
          left: 40,
          top: playerY,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
          background: '#ff69b4',
          borderRadius: 8,
          boxShadow: '0 2px 8px #ffd6f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: '#fff',
          fontWeight: 900,
          textShadow: '0 0 8px #fff0f8',
        }}>
          <Hammer style={{ width: 20, height: 20, color: '#fff' }} />
        </div>
        {/* Obstacles */}
        {obstacles.map((o, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: o.x,
            top: GROUND_Y + PLAYER_SIZE - OBSTACLE_HEIGHT,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT,
            background: '#5baefc',
            borderRadius: 6,
            boxShadow: '0 2px 8px #b6eaff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#fff',
            fontWeight: 700,
          }}>
            <ToyBrick style={{ width: 16, height: 16, color: '#fff' }} />
          </div>
        ))}
        {/* Game Over Overlay */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 2,
          }}>
            <div style={{ fontSize: '2rem', color: '#f91b8f', fontWeight: 900, marginBottom: 12 }}>Game Over!</div>
            <div style={{ fontSize: '1.1rem', color: '#b8005c', marginBottom: 18 }}>Press Space or Tap to Restart</div>
          </div>
        )}
      </div>
      <div style={{
        marginTop: '1.2rem',
        color: '#b8005c',
        fontSize: '1.1rem',
        fontWeight: 600,
        textShadow: '0 0 4px #fff0f8',
      }}>
        Score: {score}
      </div>
      <div style={{
        marginTop: '0.6rem',
        color: '#b8005c',
        fontSize: '1.1rem',
        fontWeight: 600,
        textShadow: '0 0 4px #fff0f8',
      }}>
        High Score: {highScore}
      </div>
      <div style={{ fontSize: '1rem', color: '#888', marginTop: 4 }}>Press Space or Tap to Jump</div>
      <div style={{ fontSize: '1rem', color: '#888', marginTop: 4 }}>Press Esc to exit</div>
    </div>
  );
}

export default function Room() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showMain, setShowMain] = useState(false);
  const [gallery, setGallery] = useState([
    { before: '/before-room-3.png', after: '/after-room-3.png', label: 'My Glow Up!', roomType: 'Dorm' },
    // Add more demo images if desired
  ]);
  const [chooseFileHover, setChooseFileHover] = useState(false);
  const [vision, setVision] = useState('');
  const [visionFocus, setVisionFocus] = useState(false);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);
  const [roomType, setRoomType] = useState('');
  const [showMinigame, setShowMinigame] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<null | { src: string; alt: string }>(null);
  const [customRoomType, setCustomRoomType] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showAfterImage, setShowAfterImage] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);

  // Apply default theme colors
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('chatTheme') || '{}') as Record<string, string>;
    const defaultTheme = {
      '--button-bg': 'linear-gradient(90deg, #ffe0f2 0%, #ffd6f7 100%)',
      '--button-text': '#f91b8f',
      '--button-border': '#ff69b4',
      '--chat-border': '#f91b8f',
      '--user-bubble': '#f91b8f',
      '--chat-bubble': '#ffe0f2',
      '--chat-bg': 'linear-gradient(135deg, #ffe0f2 0%, #e0eaff 100%)',
      '--chat-text': '#f91b8f',
      '--chat-text-user': 'white'
    };
    const themeToApply = Object.keys(savedTheme).length ? savedTheme : defaultTheme;
    for (const [key, value] of Object.entries(themeToApply)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);

  // Update vision prompt when room type changes
  useEffect(() => {
    const roomTypeText = showCustomInput ? customRoomType : roomType;
    
    // Remove any existing room type prefix first
    const cleanVision = vision.replace(/^I'm transforming my [^.]+\.?\s*/, '');
    
    if (roomTypeText && roomTypeText !== 'Other' && roomTypeText !== '') {
      const prefix = `I'm transforming my ${roomTypeText} `;
      setVision(prefix + cleanVision);
    } else {
      // No room type selected, just use the clean vision
      setVision(cleanVision);
    }
  }, [roomType, customRoomType, showCustomInput]);

  const handleRoomTypeChange = (value: string) => {
    if (value === 'Other') {
      setShowCustomInput(true);
      setRoomType('Other');
    } else {
      setShowCustomInput(false);
      setRoomType(value);
      setCustomRoomType('');
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setBeforePreview(URL.createObjectURL(file))
    }
  }

  const handleGenerate = async () => {
    if (!image || !vision) {
      alert('Please upload an image and enter a prompt')
      return
    }
    setShowMinigame(true);
    setLoading(true)
    const formData = new FormData()
    formData.append('image', image)
    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    })
    const uploadJson = await uploadRes.json()
    if (!uploadJson.success || !uploadJson.data?.url) {
      setLoading(false)
      alert('Image upload failed. Please check your API key and try again.')
      return
    }
    const imageUrl = uploadJson.data.display_url || uploadJson.data.url
    const response = await fetch('/api/room-makeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt: vision }),
    })
    const data = await response.json()
    setAfterImage(data.outputUrl)
    setLoading(false)
    setShowMain(true);
    setGallery(g => [{ before: beforePreview || '/before-room.png', after: data.outputUrl, label: vision || 'My Glow Up!', roomType }, ...g]);
  }

  const handleSuggestionClick = (text: string) => {
    const cleanText = text.replace(/^\+\s*/, '').toLowerCase();
    setVision(v => {
      const trimmed = v.trimEnd();
      // Split by comma, trim each, and check for duplicates
      const existing = trimmed.split(',').map(s => s.trim().toLowerCase());
      if (existing.includes(cleanText)) return v;
      if (!trimmed) return cleanText;
      if (trimmed.endsWith(',')) return trimmed + ' ' + cleanText;
      return trimmed + ', ' + cleanText;
    });
  };

  const handleDownload = async () => {
    if (!afterImage) {
      alert('No image to download yet! Generate a room first.');
      return;
    }

    try {
      // Fetch the image as a blob
      const response = await fetch(afterImage);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      link.download = `transformed-room-${timestamp}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  //subheader before/after example
  const [imageIndex, setImageIndex] = useState(0);
  const images = ["/before-room-3.jpg", "/after-room-3.png"]; // will change
  const toggleImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled(!isToggled);
  // Lightbox modal for enlarged image
  useEffect(() => {
    if (!enlargedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEnlargedImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enlargedImage]);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Tiny5&family=VT323&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      {loading && showMinigame && <DinoGameModal show={loading} onClose={() => setShowMinigame(false)} />}
      <div style={{
        width: '100%',
        padding: '2.2rem 0 0.7rem 0',
        textAlign: 'center',
        zIndex: 200,
        position: 'relative',
      }}>
        <h1 className={styles.headerTitle} style={{
          fontFamily: "'Press Start 2P', Tiny5, Courier New, Courier, monospace",
        }}>
          ROOM GENERATOR
        </h1>
        <div className={styles.headerText}
        >
          Upload your space, describe your dream, and watch the magic happen.
        </div>
        <h2 className={styles.headerTitle} style={{
          fontFamily: "'Press Start 2P', Tiny5, Courier New, Courier, monospace",
          fontSize: "2rem",
        }}>
          ✨ SEE THE MAGIC IN ACTION ✨
        </h2>
        <div className={styles.headerText} style={{
          fontSize: "1.2rem"
        }}>
          Real transformations, real results - your space could be next!
        </div>
      </div>
      <div>
        {/* Subheader section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '2.5rem auto',
          flexWrap: 'wrap',
        }}>
          {/* Left Window */}
          <section className={styles.subheaderWindow}>
            <div style={{
              flex: 1.2,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              <ul className={styles.subheaderList} style={{
                fontFamily: "'Roboto Mono', 'Press Start 2P', Tiny5, Courier New, Courier, monospace",
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                gap: '1.6rem',
              }}>
                <li style={{ margin: 0 }}>
                  <span style={{fontFamily: "'Press Start 2P', Tiny5, Courier, monospace"
                  }}>🎨 AI-POWERED DESIGN - </span>
                  Smart algorithms create personalized room layouts</li>
                <li style={{ margin: 0 }}>
                  <span style={{fontFamily: "'Press Start 2P', Tiny5, Courier, monospace"}}>⚡ INSTANT RESULTS - </span> 
                  Generate beautiful rooms in seconds</li>
                <li style={{ margin: 0 }}>
                  <span style={{fontFamily: "'Press Start 2P', Tiny5, Courier, monospace"
                  }}>💡 SMART SUGGESTIONS - </span> 
                  Get product recommendations based on your room</li>
              </ul>
            </div>
            
            {/* Dynamic Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#f91b8f',
                animation: 'arrowSlide 1s infinite',
                filter: 'drop-shadow(0 0 8px #ffb6e6)',
                transform: 'rotate(0deg)',
              }}>
                →
              </div>
              <style>{`
                @keyframes arrowSlide { 
                  0%, 100% { 
                    transform: translateX(0); 
                  }
                  50% { 
                    transform: translateX(12px); 
                  }
                }
              `}</style>
            </div>
            
            {/* example image */}
            <div className={styles.subheaderRightImage}>
              <label style={{fontFamily: "'Roboto Mono', Tiny5, Courier, monospace", marginBottom: '1rem', textAlign: 'center'}}>
              ✨ Toggle for room transformation magic ✨</label>
              
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                {/* Image */}
                <img
                src={isToggled ? '/after-room-3.png' : '/before-room-3.png'}
                alt="Before/After"
                className={styles.rightImage}
                style={{ margin: 0 }}
                />
                
                {/* Tag bubbles and toggle under the image */}
                <div style={{
                  position: 'absolute',
                  bottom: '-2.2rem',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {/* Tag bubbles on the left */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    minWidth: '120px', // Reserve space for bubbles
                  }}>
                    {isToggled && (
                      <>
                        <span style={{
                          padding: '0.3rem 0.6rem',
                          background: '#ffe0f2',
                          color: '#f91b8f',
                          borderRadius: '16px',
                          fontSize: '0.6rem',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 600,
                          border: '1px solid #ff69b4',
                        }}>
                          cozy
                        </span>
                        <span style={{
                          padding: '0.3rem 0.6rem',
                          background: '#e0eaff',
                          color: '#5baefc',
                          borderRadius: '16px',
                          fontSize: '0.6rem',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 600,
                          border: '1px solid #5baefc',
                        }}>
                          peaceful
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Toggle on the right */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}>
                    <label className={styles.switch} style={{
                      transform: 'scale(0.7)',
                    }}>
                      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '2.5rem auto',
          flexWrap: 'wrap',
        }}>
          {/* Left Window */}
          <div style={{
            flex: 1,
            minWidth: '340px',
            background: '#fff',
            border: '2.5px solid #f91b8f',
            borderRadius: '18px',
            boxShadow: '0 4px 24px #ffb6e6, 0 1.5px 0 0 #fff inset, 0 0 0 4px #ffe0f2 inset, 0 8px 32px rgba(182,182,255,0.13)',
            outlineOffset: '-6px',
            position: 'relative',
            transition: 'box-shadow 0.2s',
            overflow: 'hidden',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '700px',
            height: '100%',
          }}>
            {/* Window Title Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f91b84',
              borderBottom: '2px solid #f91b8f',
              padding: '12px 20px',
              fontFamily: "Roboto Mono, monospace",
              fontSize: '16px',
              fontWeight: 600,
              color: '#ffffff',
              boxShadow: '0 2px 12px rgba(255, 105, 180, 0.15)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                textShadow: '0 0 8px rgba(255, 182, 230, 0.5)',
              }}>
                DESIGN YOUR DREAM ROOM
              </div>
              <div className="window-controls">
                <button className="window-buttons" title="Minimize"><span className="window-button-icon">─</span></button>
                <button className="window-buttons" title="Maximize"><span className="window-button-icon">□</span></button>
                <button className="window-buttons" title="Close"><span className="window-button-icon">×</span></button>
              </div>
            </div>
            {/* Window Content */}
            <div style={{ padding: '2rem', minHeight: '300px' }}>
              <div style={{
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '1.2rem',
                color: '#f91b8f',
                fontWeight: 600,
                marginBottom: '2rem',
                letterSpacing: '1px',
                textShadow: '0 0 4px #fff0f8',
                textAlign: 'left',
              }}>
                Upload Your Room Photo
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
              }}>
                <Upload style={{
                  width: '2rem',
                  height: '2rem',
                  color: '#f91b84',
                  marginBottom: '0.5rem',
                  filter: 'drop-shadow(0 2px 8px #ffe0f2)'
                }} />
                <span style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1rem',
                  color: '#f91b84',
                  fontWeight: 600,
                  opacity: 0.8,
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                }}>
                  Drop your room photo here
                </span>
                <label htmlFor="fileUpload" style={{
                    marginTop: '0.8rem',
                    marginBottom: '1rem',
                    padding: '0.45rem 1.2rem',
                    borderRadius: '8px',
                    background: chooseFileHover ? '#ff69b4' : '#f91b8f',
                    color: '#fff',
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    border: 'none',
                    boxShadow: '0 1px 6px #ffb6e6',
                    cursor: 'pointer',
                    letterSpacing: '0.5px',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={() => setChooseFileHover(true)}
                  onMouseLeave={() => setChooseFileHover(false)}>
                  Choose photo
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </div>
              <div style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1.2rem',
                  color: '#f91b8f',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  letterSpacing: '1px',
                  textShadow: '0 0 4px #fff0f8',
                  textAlign: 'left',
                }}>
                  Select Room Type
              </div>
              <select
                value={showCustomInput ? 'Other' : roomType}
                onChange={(e) => handleRoomTypeChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: '10px',
                  border: '2px solid #ffd6f7',
                  background: '#fff6fa',
                  color: '#b8005c',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1rem',
                  fontWeight: 500,
                  outline: 'none',
                  marginBottom: '1.5rem',
                  cursor: 'pointer',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
              >
                <option value="">Select a room type</option>
                <option value="Living Room">Living Room</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Dining Room">Dining Room</option>
                <option value="Kids Room">Kids Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Home Office">Home Office</option>
                <option value="Outdoor Space">Outdoor Space</option>
                <option value="Other">Other</option>
              </select>
              {showCustomInput && (
                <div style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1.2rem',
                  color: '#f91b8f',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  letterSpacing: '1px',
                  textShadow: '0 0 4px #fff0f8',
                  textAlign: 'left',
                }}>
                  Custom Room Type:
                </div>
              )}
              {showCustomInput && (
                <input
                  type="text"
                  value={customRoomType}
                  onChange={(e) => setCustomRoomType(e.target.value)}
                  placeholder="Enter a custom room type"
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.2rem',
                    borderRadius: '10px',
                    border: visionFocus ? '2px solid #f91b8f' : '2px solid #ffd6f7',
                    background: '#fff6fa',
                    color: '#b8005c',
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '1rem',
                    fontWeight: 500,
                    outline: 'none',
                    marginBottom: '0.8rem',
                    boxShadow: visionFocus ? '0 0 0 2px #ffe0f2' : 'none',
                    transition: 'border 0.2s, box-shadow 0.2s',
                    resize: 'vertical',
                  }}
                />
              )}
              <div style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1.2rem',
                  color: '#f91b8f',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  letterSpacing: '1px',
                  textShadow: '0 0 4px #fff0f8',
                  textAlign: 'left',
                }}>
                  Describe Your Vision
              </div>
              <input
                value={vision}
                onChange={e => setVision(e.target.value)}
                onFocus={() => setVisionFocus(true)}
                onBlur={() => setVisionFocus(false)}
                placeholder="Tell us what changes you'd like to make to your room..."
                style={{
                  width: '100%',
                  padding: '1.1rem 1.2rem',
                  borderRadius: '10px',
                  border: visionFocus ? '2px solid #f91b8f' : '2px solid #ffd6f7',
                  background: '#fff6fa',
                  color: '#b8005c',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1rem',
                  fontWeight: 500,
                  outline: 'none',
                  marginBottom: '0.8rem',
                  boxShadow: visionFocus ? '0 0 0 2px #ffe0f2' : 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  resize: 'vertical',
                }}
              />
              <div style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1rem',
                  color: '#ff69b4',
                  fontWeight: 600,
                  marginBottom: '0.8rem',
                  letterSpacing: '1px',
                  textShadow: '0 0 4px #fff0f8',
                  textAlign: 'left',
                }}>
                  Quick Suggestions:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.7rem',
                marginBottom: '1.5rem',
              }}>
                {[
                  "+ Add warm lighting", "+ Include plants", "+ Use natural colors", "+ Maximize storage", "+ Create cozy corners", "+ Add texture"
                ].map((text, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredBubble(i)}
                    onMouseLeave={() => setHoveredBubble(null)}
                    onClick={() => handleSuggestionClick(text)}
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 1rem',
                      borderRadius: '999px',
                      background: hoveredBubble === i ? '#ffd6f7' : '#ffe0f2',
                      color: '#f91b84',
                      fontFamily: 'Roboto Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: hoveredBubble === i ? '2px solid #ff69b4' : '2px solid #ff96cc',
                      boxShadow: '0 2px 8px #ffd6f7',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.2s, border 0.2s',
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '1.2rem 0',
                  marginTop: '0.5rem',
                  marginBottom: '1.5rem',
                  background: '#f91b8f',
                  color: '#fff',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px #ffd6f7',
                  cursor: 'pointer',
                  letterSpacing: '0.9px',
                  transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={handleGenerate}
                disabled={loading}
              >
                <span style={{
                  position: 'absolute',
                  top: 10,
                  left: 16,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <Sparkles style={{ color: '#fff6fa', width: 26, height: 26, }} />
                </span>
                {loading ? (
                  <span>
                    Transforming
                    <span style={{ display: 'inline-block', width: '1.2em', textAlign: 'left' }}>
                      <span style={{
                        animation: 'dot1 1.5s infinite',
                        display: 'inline',
                      }}>.</span>
                      <span style={{
                        animation: 'dot2 1.5s infinite',
                        display: 'inline',
                      }}>.</span>
                      <span style={{
                        animation: 'dot3 1.5s infinite',
                        display: 'inline',
                      }}>.</span>
                    </span>
                    <style>{`
                      @keyframes dot1 {
                        0%, 20% { opacity: 0; }
                        40%, 100% { opacity: 1; }
                      }
                      @keyframes dot2 {
                        0%, 40% { opacity: 0; }
                        60%, 100% { opacity: 1; }
                      }
                      @keyframes dot3 {
                        0%, 60% { opacity: 0; }
                        80%, 100% { opacity: 1; }
                      }
                    `}</style>
                  </span>
                ) : (
                  'Generate my room!'
                )}
              </button>
            </div>
          </div>
          {/* Right Window */}
          <div style={{
            flex: 1,
            minWidth: '340px',
            background: '#fff',
            border: '2.5px solid #f91b8f',
            borderRadius: '18px',
            boxShadow: '0 4px 24px #ffb6e6, 0 1.5px 0 0 #fff inset, 0 0 0 4px #ffe0f2 inset, 0 8px 32px rgba(182,182,255,0.13)',
            outlineOffset: '-6px',
            position: 'relative',
            transition: 'box-shadow 0.2s',
            overflow: 'hidden',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '700px',
            height: 'auto',
            alignSelf: 'stretch',
          }}>
            {/* Window Title Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f91b84',
              borderBottom: '2px solid #f91b8f',
              padding: '12px 20px',
              fontFamily: "Roboto Mono, monospace",
              fontSize: '16px',
              fontWeight: 600,
              color: '#ffffff',
              boxShadow: '0 2px 12px rgba(255, 105, 180, 0.15)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                textShadow: '0 0 8px rgba(255, 182, 230, 0.5)',
              }}>
                YOUR GENERATED ROOM
              </div>
              <div className="window-controls">
                <button className="window-buttons" title="Minimize"><span className="window-button-icon">─</span></button>
                <button className="window-buttons" title="Maximize"><span className="window-button-icon">□</span></button>
                <button className="window-buttons" title="Close"><span className="window-button-icon">×</span></button>
              </div>
            </div>
            {/* Window Content */}
            <div style={{ padding: '2rem', minHeight: '300px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {!afterImage ? (
                <div style={{
                  background: '#ffe0f2',
                  borderRadius: '12px',
                  padding: beforePreview ? '1.5rem' : '7.2rem 1.2rem 7.2rem 1.2rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 12px #ffd6f7',
                }}>
                  {beforePreview ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                    }}>
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '300px',
                        height: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '3px solid #f91b8f',
                        boxShadow: '0 4px 16px #ffd6f7',
                      }}>
                        <img 
                          src={beforePreview} 
                          alt="Uploaded room" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '1.1rem',
                        color: '#f91b8f',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textShadow: '0 0 4px #fff0f8',
                      }}>
                        Photo uploaded! Ready to transform
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Home style={{
                          width: '3rem',
                          height: '3rem',
                          color: '#f91b84',
                          marginBottom: '0.5rem',
                          filter: 'drop-shadow(0 2px 8px #ffe0f2)',
                        }} />
                      </div>
                      <div style={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '1.3rem',
                        color: '#f91b8f',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        marginBottom: '0.9rem',
                        textShadow: '0 0 4px #fff0f8',
                      }}>
                        Ready to generate
                      </div>
                      <div style={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '0.8rem',
                        color: '#f91b84',
                        fontWeight: 600,
                        opacity: 0.9,
                        letterSpacing: '0.5px',
                      }}>
                        Upload a photo and describe your dream, then hit generate
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{
                  background: '#ffe0f2',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 12px #ffd6f7',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '300px',
                    height: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '3px solid #f91b8f',
                    boxShadow: '0 4px 16px #ffd6f7',
                    marginBottom: '1rem',
                  }}>
                    {/* Before Image (Background) */}
                    <img 
                      src={beforePreview || '/before-room.png'} 
                      alt="Before" 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* After Image (Overlay) */}
                    <img 
                      src={afterImage} 
                      alt="After" 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: showAfterImage ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#f91b84',
                      fontFamily: 'Roboto Mono, monospace',
                      fontWeight: 600,
                    }}>
                      {showAfterImage ? 'After' : 'Before'}
                    </span>
                    <label className={styles.switch} style={{
                      transform: 'scale(0.8)',
                    }}>
                      <input 
                        type="checkbox" 
                        checked={showAfterImage} 
                        onChange={() => setShowAfterImage(!showAfterImage)} 
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <div style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '0.9rem',
                    color: '#f91b84',
                    fontWeight: 600,
                    opacity: 0.9,
                    letterSpacing: '0.5px',
                  }}>
                    Toggle to see the transformation!
                  </div>
                </div>
              )}
              <div style={{ width: '100%', marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                                  <button
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      padding: '1.2rem 0',
                      background: '#f91b8f',
                      color: '#fff',
                      fontFamily: 'Roboto Mono, monospace',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 24px #ffd6f7',
                      cursor: 'pointer',
                      letterSpacing: '0.9px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                     }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={handleDownload}
                  >
                  <span style={{
                    position: 'absolute',
                    top: 10,
                    left: 16,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <Download style={{ color: '#fff6fa', width: 26, height: 26 }} />
                  </span>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Glow Up Gallery Wall */}
        <section className={styles.gallerySection}>
          <div style={{
            fontSize: '3.4rem',
            color: '#f91b84',
            margin: '0 0 0.4rem 0',
            fontWeight: 800,
            letterSpacing: '2px',
            fontFamily: "'Press Start 2P', 'Tiny5', 'Courier New', Courier, monospace",
          }}>GLOW UP GALLERY</div>
          <div style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '1.2rem',
                    color: '#f91b84',
                    fontWeight: 600,
                    opacity: 0.9,
                    letterSpacing: '0.5px',
                  }}>
            See the magic happen - real room transformations
          </div>
          <div className={styles.galleryWall}>
            {(showAllGallery ? gallery : gallery.slice(0, 2)).map((g, i) => (
              <div className={styles.polaroid} key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 280, maxWidth: 340, padding: '2.2rem 2.2rem 3.2rem 2.2rem', position: 'relative', border: '2.5px solid #f91b8f', borderRadius: 18, background: '#fff' }}>
                {/* Title */}
                <div style={{
                  fontFamily: 'Tiny5',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#f91b8f',
                  marginBottom: '0.7rem',
                  letterSpacing: '1px',
                  textShadow: '0 0 4px #fff0f8',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>{(g.roomType || 'Room')} Makeover</div>
                {/* Before label */}
                <div style={{
                  fontSize: '1.1rem',
                  color: '#ff69b4',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: 4,
                  fontFamily: 'Roboto Mono, monospace',
                }}>Before</div>
                {/* Before image */}
                <img src={g.before} alt="Before" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 16, border: '2.5px solid #ff69b4', marginBottom: 22, boxShadow: '0 2px 12px #ffd6f7', cursor: 'pointer' }} onClick={() => setEnlargedImage({ src: g.before, alt: 'Before' })} />
                {/* Animated arrow */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0.5rem 0' }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '2.4rem',
                    animation: 'arrowBounce 1s infinite',
                  }}>
                    ↓
                  </span>
                  <style>{`@keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }`}</style>
                </div>
                {/* After label */}
                <div style={{
                  fontSize: '1.1rem',
                  color: '#5baefc',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginTop: 10,
                  marginBottom: 4,
                  fontFamily: 'Roboto Mono, monospace',
                }}>After</div>
                {/* After image */}
                <img src={g.after} alt="After" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 16, border: '2.5px solid #ff69b4', marginTop: 22, boxShadow: '0 2px 12px #ffd6f7', cursor: 'pointer' }} onClick={() => setEnlargedImage({ src: g.after, alt: 'After' })} />
              </div>
            ))}
          </div>
          {gallery.length > 2 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}>
              <button
                onClick={() => setShowAllGallery(!showAllGallery)}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffdcae 0%, #ffe0f2 100%)',
                  border: '2px solid #ff69b4',
                  color: '#f91b8f',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 105, 180, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 105, 180, 0.15)';
                }}
              >
                {showAllGallery ? 'Show Less' : `See  Older Designs`}
              </button>
            </div>
          )}
        </section>
      </div>
      {enlargedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage.src}
            alt={enlargedImage.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 20,
              boxShadow: '0 8px 40px #000a',
              background: '#fff',
              cursor: 'auto',
              border: '4px solid #fff',
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
