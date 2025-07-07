import { useState } from 'react'
import Select from 'react-select';

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
  console.log('afterImage:', afterImage);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffe0f2', padding: '1rem', textAlign: 'center' }}>
      {/* Title */}
      <h1 style={{ fontFamily: 'monospace', color: '#ff0099', fontSize: '2rem', marginTop: '1.5rem' }}>
        TRANSFORM YOUR SPACE
      </h1>
      <p style={{ maxWidth: '600px', margin: '0 auto' }}>
        Tell Mandy what you want your dream room to look like and she will redecorate it for you.
      </p>

      {/* Before and After */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
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

      {/* Chatbot-style Input Section or Loading */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {!loading ? (
          <>
            <p style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#ff0099', fontSize: '1.2rem' }}>
              Tell Mandy about your dream room ✨
            </p>

            <div style={{ margin: '1rem 0', width: 300 }}>
              <label
                htmlFor="roomType"
                style={{
                  marginRight: 8,
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  color: '#ff0099',
                  fontSize: '1.2rem',
                  display: 'block',
                  marginBottom: 4,
                  textAlign: 'left'
                }}
              >
                Room type:
              </label>
              <Select
                inputId="roomType"
                options={roomOptions}
                value={roomOptions.find(opt => opt.value === roomType)}
                onChange={opt => setRoomType(opt?.value || '')}
                styles={{
                  control: (base) => ({
                    ...base,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    color: '#ff0099',
                    fontSize: '1.2rem',
                    border: '2px solid #ff0099',
                    background: '#fff0fa',
                    outlineColor: '#ff0099',
                    cursor: 'pointer',
                    borderRadius: 12,
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: '#ff0099',
                    background: state.isFocused ? '#ffe0f2' : '#fff0fa',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }),
                }}
                isSearchable
              />
            </div>

            {/* Prompt input with arrow button inside */}
            <div style={{
              width: '80%',
              maxWidth: '400px',
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <input
                type="text"
                placeholder="e.g. pastel pink and floral, cozy cottage vibes..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid #ccc',
                  outlineColor: '#ff0099',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleGenerate();
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#ff0099',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: loading ? 0.6 : 1,
                  color: 'white',
                  fontSize: 14,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
                title="Transform Room"
              >
                <span style={{ fontSize: 14 }}>➔</span>
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1rem'
            }}>
              <label htmlFor="fileUpload" style={{
                backgroundColor: '#ff0099',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-block'
              }}>
                Upload Photos
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />

              {/* Shop Products button */}
              <button
                onClick={handleShopProducts}
                disabled={!afterImage}
                style={{
                  backgroundColor: '#ff0099',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: afterImage ? 'pointer' : 'not-allowed',
                  opacity: afterImage ? 1 : 0.5,
                }}
              >
                Shop Products
              </button>
            </div>
          </>
        ) : (
          // Loading section
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2rem 0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff0fa',
              borderRadius: '16px',
              padding: '1rem 2rem',
              boxShadow: '0 2px 8px rgba(255,0,153,0.07)'
            }}>
              <div style={{
                width: 32,
                height: 32,
                border: '5px solid #ffb3de',
                borderTop: '5px solid #ff0099',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '1rem'
              }} />
              <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
              </style>
              <div style={{
                fontFamily: 'Arial, sans-serif',
                color: '#ff0099',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textAlign: 'left',
                whiteSpace: 'nowrap'
              }}>
                Mandy is working her magic — your room will be ready in ~45s!
              </div>
            </div>
          </div>
        )}

        {/* Shop the Look - now below the buttons */}
        {showProducts && amazonLinks.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: '#ff0099', fontFamily: 'monospace' }}>Shop the Look</h3>
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
                  {/* Optionally show the keyword below the icon: */}
                  {/* <span style={{ fontFamily: 'monospace', color: '#0078d7', fontSize: 12 }}>{link.keyword}</span> */}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shop the Look */}
      <h2 style={{ fontFamily: 'monospace', color: '#ff0099', marginTop: '2rem' }}>SHOP THE LOOK</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto' }}>
        Don’t just dream about your perfect room – make it reality! Mandy helps you find matching products on Amazon to bring your vision to life.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
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
      <div style={{ marginTop: '1.5rem' }}>
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#e6f0ff',
          border: '2px solid #0078d7',
          borderRadius: '12px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          make me a moodboard
        </button>
      </div>

      {/* Glow Up Gallery */}
      <h2 style={{ fontFamily: 'monospace', color: '#ff0099', marginTop: '2.5rem' }}>GLOW UP GALLERY</h2>
    </div>
  )
}