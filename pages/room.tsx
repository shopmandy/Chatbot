import { useState, useEffect } from 'react'
import styles from "./room.module.css";
import Head from 'next/head'

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
    if (!image || !prompt) {
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
    const imageUrl = uploadJson.data.url
    const response = await fetch('/api/room-makeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt }),
    })
    const data = await response.json()
    setAfterImage(data.outputUrl)
    setLoading(false)
    setShowMain(true);
    setGallery(g => [{ before: beforePreview || '/before-room.png', after: data.outputUrl, label: prompt || 'My Glow Up!' }, ...g]);
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.pageContainer}>
        {/* Glassy Header */}
        <header className={styles.y2kHeader}>
          <div className={styles.y2kLogo}>
            <span className={styles.y2kLogoIcon}>🌈</span>
            Room Glow Up
          </div>
          <button className={styles.y2kGalleryBtn} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            My Gallery
          </button>
        </header>

        {/* Hero Section */}
        <section className={styles.y2kHero}>
          <h1 className={styles.y2kHeroTitle}>Dream It. See It. Glow Up Your Room.</h1>
          <p className={styles.y2kHeroSubtitle}>
            Upload your space, describe your dream, and watch the magic happen.<br />
            <span style={{ fontSize: '1.1rem', color: '#b8005c' }}>Y2K AI Makeover for your real-life room ✨</span>
          </p>
          <button className={styles.y2kHeroStartBtn} onClick={() => setShowMain(true)}>
            Start Your Glow Up
          </button>
          {/* Animated floating icons */}
          {floatingIcons.map((icon, i) => (
            <span
              key={i}
              className={styles.y2kIconFloat}
              style={{ ...icon.style, animationDuration: icon.style.animationDuration }}
            >
              {icon.icon}
            </span>
          ))}
        </section>

        {/* Main Makeover Card */}
        {showMain && (
          <div className={styles.y2kMainCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {/* Before Polaroid */}
              <div className={styles.polaroid}>
                <img src={beforePreview || '/before-room.png'} alt="Before" />
                <span className={styles.polaroidLabel}>Before</span>
                <span className={styles.polaroidSticker}>📸</span>
              </div>
              {/* Magic Wand Progress */}
              <div className={styles.magicWand}>
                <span className={styles.magicWandIcon}>🪄</span>
                <div className={styles.magicWandBar}></div>
              </div>
              {/* After Polaroid */}
              <div className={styles.polaroid}>
                <img src={afterImage || '/after-room.png'} alt="After" />
                <span className={styles.polaroidLabel}>After</span>
                <span className={styles.polaroidSticker}>✨</span>
              </div>
            </div>
            {/* Input Area */}
            <div className={styles.inputSection}>
              <input
                type="text"
                placeholder="Describe your dream room..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className={styles.promptInput}
                style={{ marginBottom: 12 }}
              />
              <label htmlFor="fileUpload" className={styles.uploadButton}>
                📷 Upload Photos
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                onChange={handleUpload}
                className={styles.fileInput}
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={styles.transformButton}
              >
                {loading ? 'Transforming... ✨' : 'Transform Room ✨'}
              </button>
              {/* Loading Animation */}
              {loading && (
                <div className={styles.loadingContainer}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Mandy is working her magic...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Moodboard Button */}
        <button className={styles.fabMoodboard} title="Make me a moodboard!">
          <span role="img" aria-label="palette">🎨</span>
        </button>

        {/* Glow Up Gallery Wall */}
        <section className={styles.gallerySection}>
          <h3 className={styles.galleryTitle}>Glow Up Gallery</h3>
          <div className={styles.galleryWall}>
            {gallery.map((g, i) => (
              <div className={styles.polaroid + ' ' + styles.galleryPolaroid} key={i}>
                <img src={g.after} alt={g.label} />
                <span className={styles.polaroidLabel}>{g.label}</span>
                <span className={styles.polaroidSticker}>🌟</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
