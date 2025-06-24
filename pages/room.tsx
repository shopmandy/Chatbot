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

export default function Room() {
  const [prompt, setPrompt] = useState('')
  const [roomType, setRoomType] = useState('Bedroom') // default room type
  const [image, setImage] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

    // Step 1: Upload image to imgbb or similar (TEMPORARY)
    const formData = new FormData()
    formData.append('image', image)

    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    })

    const uploadJson = await uploadRes.json();
    console.log('Backend response:', uploadJson);
    if (!uploadJson.success || !uploadJson.data || !uploadJson.data.url) {
      setLoading(false);
      alert('Image upload failed. Please check your API key and try again.');
      return;
    }

    const imageUrl = uploadJson.data.url
    const fullPrompt = `${roomType.toLowerCase()} ${prompt}`

    // Step 2: Send to your backend API
    const response = await fetch('/api/room-makeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt: fullPrompt }),
    })

    const data = await response.json()
    console.log('Backend response:', data);
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

      {/* Before and After Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        <div>
          {beforePreview ? (
            <img src={beforePreview} alt="Before" style={{ width: '200px', borderRadius: '8px' }} />
          ) : (
            <img src="/before-room.png" alt="Before" style={{ width: '200px', borderRadius: '8px' }} />
          )}
        </div>
        <div>
          {afterImage ? (
            <img src={afterImage} alt="After" style={{ width: '200px', borderRadius: '8px' }} />
          ) : (
            <img src="/after-room.png" alt="After" style={{ width: '200px', borderRadius: '8px' }} />
          )}
        </div>
      </div>

      {/* Chatbot-style Input Section */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
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
           
        <input
          type="text"
          placeholder="e.g. pastel pink and floral, cozy cottage vibes..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          style={{
            width: '80%',
            maxWidth: '400px',
            padding: '0.75rem',
            borderRadius: '12px',
            border: '2px solid #ccc',
            outlineColor: '#ff0099',
            fontSize: '1rem',
          }}
        />

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

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              backgroundColor: '#e6f0ff',
              border: '2px solid #0078d7',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Transforming...' : 'Transform Room ✨'}
          </button>
        </div>
      </div>

      {/* Your shop & gallery content stays the same */}
      {/* SHOP THE LOOK, MOODBOARD BUTTON, GLOW UP GALLERY... */}
    </div>
  )
}
