import { useState } from 'react'
import Select from 'react-select';
import styles from './room.module.css';
import Head from 'next/head';

const roomOptions = [
  { value: 'Bedroom', label: 'Bedroom' },
  { value: 'Living Room', label: 'Living Room' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Bathroom', label: 'Bathroom' },
  { value: 'Dining Room', label: 'Dining Room' },
  { value: 'Office', label: 'Office' },
  { value: 'Guest Room', label: 'Guest Room' },
  { value: 'Game Room', label: 'Game Room' },
  { value: 'Home Theater', label: 'Home Theater' },
  { value: 'Sunroom', label: 'Sunroom' },
  { value: 'Basement', label: 'Basement' },
  { value: 'Attic', label: 'Attic' },
  { value: 'Garage', label: 'Garage' },
  { value: 'Walk-in Closet', label: 'Walk-in Closet' },
  { value: 'Patio', label: 'Patio' },
  { value: 'Porch', label: 'Porch' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Gym', label: 'Gym' },
  { value: 'Nursery', label: 'Nursery' },
  { value: 'Library', label: 'Library' },
  { value: 'Entryway', label: 'Entryway' },
  { value: 'Hallway', label: 'Hallway' },
  { value: 'Laundry Room', label: 'Laundry Room' },
  { value: 'Balcony', label: 'Balcony' },
  { value: 'Other', label: 'Other' },
];

function getAmazonLinks(roomType: string, prompt: string): { keyword: string, url: string }[] {
  const base: Record<string, string[]> = {
    Bedroom: ['bed', 'nightstand', 'dresser', 'lamp', 'rug'],
    'Living Room': ['sofa', 'coffee table', 'armchair', 'lamp', 'rug'],
    Kitchen: ['dining table', 'bar stool', 'kitchen cart', 'pendant light'],
    Bathroom: ['bath mat', 'shower curtain', 'towel set', 'bathroom shelf'],
    'Dining Room': ['dining table', 'dining chair', 'sideboard', 'chandelier'],
    Office: ['desk', 'office chair', 'bookshelf', 'desk lamp'],
    'Guest Room': ['bed', 'nightstand', 'blanket', 'lamp'],
    'Game Room': ['gaming chair', 'bean bag', 'tv stand', 'game console'],
    'Home Theater': ['recliner', 'projector', 'soundbar', 'popcorn maker'],
    'Sunroom': ['wicker chair', 'plant stand', 'side table', 'throw pillow'],
    'Basement': ['sectional', 'area rug', 'storage shelf', 'mini fridge'],
    'Attic': ['storage bin', 'reading chair', 'floor lamp'],
    'Garage': ['tool chest', 'storage rack', 'workbench'],
    'Walk-in Closet': ['shoe rack', 'clothes hanger', 'mirror'],
    Patio: ['patio set', 'outdoor rug', 'string lights'],
    Porch: ['rocking chair', 'outdoor bench', 'planter'],
    Studio: ['easel', 'art supplies', 'studio light'],
    Workshop: ['tool set', 'workbench', 'storage bin'],
    Gym: ['yoga mat', 'dumbbells', 'resistance bands'],
    Nursery: ['crib', 'changing table', 'rocking chair'],
    Library: ['bookshelf', 'reading lamp', 'armchair'],
    Entryway: ['console table', 'coat rack', 'shoe bench'],
    Hallway: ['runner rug', 'wall art', 'console table'],
    'Laundry Room': ['laundry basket', 'drying rack', 'storage shelf'],
    Balcony: ['bistro set', 'outdoor rug', 'planter'],
    Other: ['home decor', 'furniture'],
  };
  const keywords = base[roomType] || ['home decor'];
  return keywords.map(keyword => {
    const search = prompt ? `${prompt} ${keyword}` : keyword;
    return {
      keyword: search,
      url: `https://www.amazon.com/s?k=${encodeURIComponent(search)}`
    };
  });
}

export default function Room() {
  const [prompt, setPrompt] = useState('')
  const [roomType, setRoomType] = useState('Bedroom')
  const [image, setImage] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [amazonLinks, setAmazonLinks] = useState<{ keyword: string, url: string }[]>([])
  const [showProducts, setShowProducts] = useState(false)

  const handleShopProducts = () => {
    const links = getAmazonLinks(roomType, prompt);
    setAmazonLinks(links);
    setShowProducts(true);
  };

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

    const uploadJson = await uploadRes.json();
    if (!uploadJson.success || !uploadJson.data || !uploadJson.data.url) {
      setLoading(false);
      alert('Image upload failed. Please check your API key and try again.');
      return;
    }

    const imageUrl = uploadJson.data.url
    const fullPrompt = `${roomType.toLowerCase()} ${prompt}`

    const response = await fetch('/api/room-makeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt: fullPrompt }),
    })

    const data = await response.json()
    setAfterImage(data.outputUrl)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>TRANSFORM YOUR SPACE</h1>
        <p className={styles.subtitle}>
          Tell Mandy what you want your dream room to look like and she will redecorate it for you.
        </p>

        {/* Before and After */}
        <div className={styles.section} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            {beforePreview ? (
              <img src={beforePreview} alt="Before" style={{ width: '350px', borderRadius: '16px' }} />
            ) : (
              <img src="/before-room.png" alt="Before" style={{ width: '350px', borderRadius: '16px' }} />
            )}
          </div>
          <div>
            {afterImage ? (
              <img src={afterImage} alt="After" style={{ width: '350px', borderRadius: '16px' }} />
            ) : (
              <img src="/after-room.png" alt="After" style={{ width: '350px', borderRadius: '16px' }} />
            )}
          </div>
        </div>

        {/* Steps Section */}
        <div className={styles.section} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: 420, margin: '0 auto' }}>
          {/* Step 1: Upload */}
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>Step 1: Upload a picture of your room</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <label htmlFor="fileUpload" className={styles.uploadLabel} style={{ margin: 0 }}>
                Upload Photo
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Step 2: Room Type */}
          <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>Step 2: Choose a room type</div>
            <Select
              inputId="roomType"
              options={roomOptions}
              value={roomOptions.find(opt => opt.value === roomType)}
              onChange={opt => setRoomType(opt?.value || '')}
              styles={{
                control: (base) => ({
                  ...base,
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  fontWeight: 'bold',
                  color: '#ff0099',
                  fontSize: '1.2rem',
                  border: '2px solid #ff0099',
                  background: '#fff0fa',
                  outlineColor: '#ff0099',
                  cursor: 'pointer',
                  borderRadius: 12,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#ff0099', // <-- This makes the selected value pink!
                  fontWeight: 'bold',
                }),
                option: (base, state) => ({
                  ...base,
                  color: '#ff0099',
                  background: state.isFocused ? '#ffe0f2' : '#fff0fa',
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }),
              }}
              isSearchable
            />
          </div>

          {/* Step 3: Prompt */}
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>Step 3: Tell Mandy about your dream room</div>
            <div className={styles.inputRow}>
              <input
                type="text"
                placeholder="e.g. pastel pink and floral, cozy cottage vibes..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className={styles.promptInput}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleGenerate();
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={styles.arrowButton}
                title="Transform Room"
              >
                <span style={{ fontSize: 22 }}>➔</span>
              </button>
            </div>
          </div>

          {/* Optionally, Shop Products button (can be placed below steps) */}
          <button
            onClick={handleShopProducts}
            disabled={!afterImage}
            className={styles.shopButton}
            style={{ marginTop: 12 }}
          >
            Shop Products
          </button>
        </div>
          {showProducts && amazonLinks.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 className={styles.shopTheLookTitle}>Shop the Look</h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '1rem'
              }}>
                {amazonLinks.map(link => (
                  <a
                    key={link.keyword}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.keyword}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <img
                      src="/amazon.png"
                      alt="Amazon"
                      style={{ width: 48, height: 48, marginBottom: 4 }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

        {/* Shop the Look */}
        <h2 className={styles.shopTheLookTitle}>SHOP THE LOOK</h2>
        <p className={styles.subtitle}>
          Don’t just dream about your perfect room – make it reality! Mandy helps you find matching products on Amazon to bring your vision to life.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div>
            <img src="/flowers.png" style={{ width: '100px', borderRadius: '8px' }} />
            <p>Maya Quilt $99</p>
          </div>
          <div>
            <img src="/quilt1.png" style={{ width: '100px', borderRadius: '8px' }} />
            <p>Maya Quilt $89</p>
          </div>
          <div>
            <img src="/flowers.png" style={{ width: '100px', borderRadius: '8px' }} />
            <p>Shopbop</p>
          </div>
          <div>
            <img src="/quilt1.png" style={{ width: '100px', borderRadius: '8px' }} />
            <p>Urban Outfitters</p>
          </div>
        </div>

        {/* Moodboard Button */}
        <button className={styles.moodboardButton}>
          make me a moodboard
        </button>

        {/* Glow Up Gallery */}
        <h2 className={styles.glowUpTitle}>GLOW UP GALLERY</h2>
      </div>
    </>
  )
}