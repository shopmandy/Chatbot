import { useState, useEffect } from 'react'
import styles from "./room.module.css";
import Head from 'next/head'
import { Upload, Download, Sparkles, Home } from "lucide-react"

const floatingIcons = [
  { icon: '✨', style: { top: '18%', left: '8%', fontSize: '2.2rem', animationDuration: '7s' } },
  { icon: '💖', style: { top: '12%', right: '10%', fontSize: '2.5rem', animationDuration: '9s' } },
  { icon: '🌸', style: { bottom: '14%', left: '12%', fontSize: '2rem', animationDuration: '8s' } },
  { icon: '⭐', style: { bottom: '10%', right: '14%', fontSize: '2.3rem', animationDuration: '10s' } },
  { icon: '🦋', style: { top: '40%', left: '50%', fontSize: '1.8rem', animationDuration: '11s' } },
];

export default function Room() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showMain, setShowMain] = useState(false);
  const [gallery, setGallery] = useState([
    { before: '/before-room.png', after: '/after-room.png', label: 'My Glow Up!' },
    // Add more demo images if desired
  ]);
  const [chooseFileHover, setChooseFileHover] = useState(false);
  const [vision, setVision] = useState('');
  const [visionFocus, setVisionFocus] = useState(false);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);

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
    setGallery(g => [{ before: beforePreview || '/before-room.png', after: data.outputUrl, label: vision || 'My Glow Up!' }, ...g]);
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

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={{
        width: '100%',
        padding: '2.2rem 0 0.7rem 0',
        textAlign: 'center',
        zIndex: 200,
        position: 'relative',
      }}>
        <h1 style={{
          fontFamily: 'Tiny5, Courier New, Courier, monospace',
          fontSize: '4.2rem',
          color: '#f91b8f',
          margin: 0,
          letterSpacing: '2px',
          textShadow: '0 0 12px #ffb6e6, 0 0 2px #fff',
          fontWeight: 900,
        }}>
          ROOM GENERATOR
        </h1>
        <div style={{
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1.2rem',
          color: '#ff69b4',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textShadow: '0 0 4px #fff0f8',
        }}>
          Upload your space, describe your dream, and watch the magic happen.
        </div>
      </div>
      <div>
        {/* Floating Moodboard Button */}
        <button className={styles.fabMoodboard} title="Make me a moodboard!">
          <span role="img" aria-label="palette">🎨</span>
        </button>

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
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
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
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.7rem 2.2rem',
                marginBottom: '1.5rem',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '1rem',
                color: '#f91b84',
                fontWeight: 600,
              }}>
                {['Living Room', 'Kitchen', 'Dining Room', 'Kids Room', 'Bedroom', 'Bathroom', 'Home Office', 'Outdoor Space'].map((room, idx) => (
                  <label key={room} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.7rem' }}>
                    <input
                      type="radio"
                      name="roomType"
                      value={room}
                      style={{ accentColor: '#f91b84', border: '2px solid #f91b84', width: 18, height: 18, margin: 0 }}
                    />
                    <span>{room}</span>
                  </label>
                ))}
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
                {loading ? 'Transforming... ✨' : 'Generate my room!'}
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
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
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
                  padding: '7.2rem 1.2rem 7.2rem 1.2rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 12px #ffd6f7',
                }}>
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
                        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                        transition: 'clip-path 0.3s ease',
                      }}
                      id="afterImage"
                    />
                    {/* Slider Handle */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      width: '4px',
                      height: '100%',
                      background: '#f91b8f',
                      cursor: 'ew-resize',
                      transform: 'translateX(-50%)',
                      zIndex: 10,
                      boxShadow: '0 0 8px rgba(249, 27, 143, 0.5)',
                    }} 
                    id="sliderHandle"
                    onMouseDown={(e) => {
                      const handle = e.currentTarget;
                      const afterImg = document.getElementById('afterImage') as HTMLElement;
                      const container = handle.parentElement;
                      
                                             const handleMouseMove = (e: MouseEvent) => {
                         if (!container) return;
                         const rect = container.getBoundingClientRect();
                         const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                         handle.style.left = x + '%';
                         afterImg.style.clipPath = `polygon(${x}% 0, 100% 0, 100% 100%, ${x}% 100%)`;
                       };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                    />
                    {/* Labels */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(249, 27, 143, 0.9)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      fontFamily: 'Roboto Mono, monospace',
                    }}>
                      BEFORE
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(249, 27, 143, 0.9)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      fontFamily: 'Roboto Mono, monospace',
                    }}>
                      AFTER
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '0.9rem',
                    color: '#f91b84',
                    fontWeight: 600,
                    opacity: 0.9,
                    letterSpacing: '0.5px',
                  }}>
                    Drag the slider to see the transformation
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
          <h3 className={styles.galleryTitle}>GLOW UP GALLERY</h3>
          <div className={styles.galleryWall}>
            {gallery.map((g, i) => (
              <div className={styles.polaroid + ' ' + styles.galleryPolaroid} key={i}>
                <img src={g.after} alt={g.label} />

                <span className={styles.polaroidSticker}>🌟</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
