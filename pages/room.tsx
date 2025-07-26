import { useState } from 'react'
import Select from 'react-select';
import styles from './room.module.css';

const roomOptions = [
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'dining-room', label: 'Dining Room' },
  { value: 'office', label: 'Office' },
  { value: 'nursery', label: 'Nursery' },
  { value: 'outdoor', label: 'Outdoor Space' },
];

export default function Room() {
  const [prompt, setPrompt] = useState('')
  const [roomType, setRoomType] = useState('')
  const [beforePreview, setBeforePreview] = useState('')
  const [afterImage, setAfterImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadJson, setUploadJson] = useState({ success: false, data: { url: '' } })
  const [gallery, setGallery] = useState([
    { before: '/gallery-1-before.png', after: '/gallery-1-after.png', label: 'Cozy Minimalist' },
    { before: '/gallery-2-before.png', after: '/gallery-2-after.png', label: 'Boho Chic' },
    { before: '/gallery-3-before.png', after: '/gallery-3-after.png', label: 'Modern Luxe' },
  ])

  // Amazon integration state
  const [amazonProducts, setAmazonProducts] = useState<any[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setBeforePreview(URL.createObjectURL(file))
    
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    })
    
    const result = await response.json()
    setUploadJson(result)
  }

  const handleGenerate = async () => {
    if (!uploadJson.success || !uploadJson.data?.url) {
      alert('Please upload an image first!')
      return
    }
    
    setLoading(true)
    const imageUrl = uploadJson.data.url
    const response = await fetch('/api/room-makeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt }),
    })
    const data = await response.json()
    setAfterImage(data.outputUrl)
    setLoading(false)
    setGallery(g => [{ before: beforePreview || '/before-room.png', after: data.outputUrl, label: prompt || 'My Glow Up!' }, ...g]);
  }
  const handleShopProducts = async () => {
    if (!prompt) {
      alert('Please enter a room description first!');
      return;
    }

    setLoadingProducts(true);
    
    try {
      
      const response = await fetch('/api/amazon-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: prompt,
          roomType: roomType 
        })
      });
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      console.log('Amazon API Response:', data); // Debug log

      // Debug: Check if products have the right structure
      data.results.forEach((category: any, i: number) => {
        console.log(`Category ${i}: ${category.category}`, {
          searchQuery: category.searchQuery,
          productCount: category.products.length,
          firstProduct: category.products[0] // Log first product structure
        });
      });

      setAmazonProducts(data.results);
      setShowProducts(true);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      alert(error.message || 'Failed to load products. Please try again.');
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <>
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
        <section className={styles.heroSection}>
          <h1 className={styles.y2kTitle}>Transform Your Space with AI ✨</h1>
          <p className={styles.y2kSubtitle}>Upload a photo, describe your dream room, and watch the magic happen!</p>
        </section>

        {/* Steps Section */}
        <div className={styles.section} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: 420, margin: '0 auto' }}>
          {/* Step 1: Prompt */}
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>Step 1: Tell Mandy about your dream room</div>
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

          {/* Step 2: Room Type */}
          <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>
              Step 2: Choose a room type
            </div>
            <Select
              inputId="roomType"
              options={roomOptions}
              value={roomOptions.find(opt => opt.value === roomType)}
              onChange={opt => setRoomType(opt?.value || '')}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '100%',
                }),
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
                  width: '100%',
                  minHeight: '48px',
                }),
                menu: (base) => ({
                  ...base,
                  width: '100%',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#ff0099',
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

          {/* Step 3: Upload */}
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold', color: '#ff0099', marginBottom: 8, fontSize: '1.2rem' }}>
              Step 3: Upload a picture of your room
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <label
                htmlFor="fileUpload"
                className={styles.uploadLabel}
                style={{ margin: 0, textAlign: 'center', width: '100%' }}
              >
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

          {/* Shop Products button */}
          <button
            onClick={handleShopProducts}
            disabled={!prompt || loadingProducts}
            className={styles.shopButton}
            style={{ marginTop: 12 }}
          >
            {loadingProducts ? '🔄 Loading Products...' : '🛍️ Shop the Look'}
          </button>
        </div>

        {/* Before/After Section */}
        <div className={styles.section} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div className={styles.polaroid}>
            <img src={beforePreview || '/before-room.png'} alt="Before" />
            <span className={styles.polaroidLabel}>Before</span>
            <span className={styles.polaroidSticker}>📸</span>
          </div>
          <div className={styles.magicWand}>
            <span className={styles.magicWandIcon}>🪄</span>
            <div className={styles.magicWandBar}></div>
          </div>
          <div className={styles.polaroid}>
            <img src={afterImage || '/after-room.png'} alt="After" />
            <span className={styles.polaroidLabel}>After</span>
            <span className={styles.polaroidSticker}>✨</span>
          </div>
        </div>

        {/* Amazon Products Display */}
        {showProducts && amazonProducts.length > 0 && (
          <div className={styles.productsSection}>
            <h3 className={styles.productsTitle}>
              🛍️ Amazon Results for "{prompt} {roomType}"
            </h3>
            <div className={styles.productsGrid}>
              {amazonProducts.slice(0, 8).map((product: any, i: number) => (
                <a
                  key={i}
                  href={product.DetailPageURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.productCard}
                >
                  <img 
                    src={product.Images?.Primary?.Large?.URL || 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=No+Image'} 
                    alt={product.ItemInfo?.Title?.DisplayValue || 'Product'} 
                  />
                  <div className={styles.productInfo}>
                    <p className={styles.productTitle}>
                      {product.ItemInfo?.Title?.DisplayValue || 'Product Title'}
                    </p>
                    <p className={styles.productBrand}>
                      {product.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || ''}
                    </p>
                    <p className={styles.productPrice}>
                      {product.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'Price N/A'}
                    </p>
                  </div>
                </a>
              ))}
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