export default function Room() {
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
          {/* Before */}
          <div>
            <img src="/before-room.png" alt="Before" style={{ width: '200px', borderRadius: '8px' }} />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}></p>
          </div>
  
          {/* After */}
          <div>
            <img src="/after-room.png" alt="After" style={{ width: '200px', borderRadius: '8px' }} />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontStyle: 'italic' }}></p>
          </div>
        </div>
  
        {/* Upload Button */}
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

  {/* Text Input */}
  <input
    type="text"
    placeholder="e.g. pastel pink and floral, cozy cottage vibes..."
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

  {/* Upload Button */}
    <label htmlFor="fileUpload" style={{
        backgroundColor: '#ff0099',
        color: 'white',
        padding: '0.75rem 1.25rem',
        borderRadius: '20px',
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
        multiple
        style={{ display: 'none' }}
     />
      </div>

  
        {/* Shop the Look */}
        <h2 style={{ fontFamily: 'monospace', color: '#ff0099', marginTop: '2rem' }}>SHOP THE LOOK</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Don’t just dream about your perfect room – make it reality! Mandy helps you find matching products on Amazon to bring your vision to life.
        </p>
  
        {/* Products Row */}
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
    );
  }
  