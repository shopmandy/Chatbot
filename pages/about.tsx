export default function About() {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fde6f3', minHeight: '100vh', padding: '2rem' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'url("/clouds-bg.jpg") no-repeat center/cover',
          border: '4px solid #0078d7',
          borderRadius: '12px',
          padding: '2rem',
          backgroundColor: '#ffffffaa' // fallback overlay
        }}>
          <h1 style={{ color: '#ff0080', fontSize: '2rem', fontWeight: 'bold' }}>
            AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO–IT–HERSELF WITH THE RIGHT TOOLS.
          </h1>
  
          <p style={{ color: '#ff0080', fontWeight: 'bold', marginTop: '1rem' }}>
            We are dedicated to empowering women to confidently build, repair, and get it done, and we’re here to provide the tools to make it happen.
          </p>
  
          <p style={{ marginTop: '1rem' }}>
            Our mission is to break down barriers and stereotypes in the world of DIY by offering thoughtfully designed tools that cater to the needs and preferences of women.
          </p>
  
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>We are committed to:</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#ff0080', fontWeight: 'bold' }}>
            <li>❤️ Quality and Innovation</li>
            <li>❤️ Education and Support</li>
            <li>❤️ Inclusivity</li>
            <li>❤️ Sustainability</li>
            <li>❤️ Community Building</li>
          </ul>
  
          <p style={{ marginTop: '1rem' }}>
            Mandy is not just a brand; it’s a movement. We are here to redefine what it means to be handy and to ensure that every woman has the tools and knowledge to turn her desires into reality.
          </p>
        </div>
      </div>
    );
  }
  