export default function About() {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fde6f3', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          background: 'url("/clouds-bg.jpg") no-repeat center/cover',
          border: '4px solid #0078d7',
          borderRadius: '12px',
          padding: '2rem',
          backgroundColor: '#ffffffaa'
        }}>
          {/* Original Content */}
          <h1 style={{ color: '#ff0080', fontSize: '2rem', fontWeight: 'bold' }}>
            AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO–IT–HERSELF WITH THE RIGHT TOOLS.
          </h1>
  
          <p style={{ color: '#ff0080', fontWeight: 'bold', marginTop: '1rem' }}>
            We are dedicated to empowering women to confidently build, repair, and get it done, and we're here to provide the tools to make it happen.
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
            Mandy is not just a brand; it's a movement. We are here to redefine what it means to be handy and to ensure that every woman has the tools and knowledge to turn her desires into reality.
          </p>
  
          {/* Female Founded Section */}
          <div style={{ marginTop: '2rem', borderTop: '2px solid #ff0080', paddingTop: '1.5rem' }}>
            <h2 style={{ color: '#ff0080', fontSize: '1.8rem', fontWeight: 'bold' }}>
              FEMALE FOUNDED
            </h2>
            
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <p>
                  Caroline is a dynamic entrepreneur with a rich background in sustainability, law, and emerging technologies. Caroline has cultivated a unique blend of expertise that is intricately woven into the fabric of Mandy.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Passionate about breaking down barriers in traditionally male-dominated spaces, Caroline has channeled her love for DIY and commitment to empowerment into creating Mandy. Her vision is to revolutionize the DIY space by providing women with tools that are not only functional but also beautifully designed, ensuring that every tool reflects the strength and elegance of its user.
                </p>
              </div>
              <img 
                src="/founder.png" 
                alt="Caroline, founder of Mandy Tools" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  border: '3px solid #ff0080',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
  
          {/* Instagram Embed Section */}
          <div style={{ marginTop: '2rem', borderTop: '2px solid #ff0080', paddingTop: '1.5rem' }}>
            <h3 style={{ color: '#ff0080', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Follow Us on Instagram
            </h3>
            
            {/* Instagram Post 1 */}
            <div style={{ margin: '1rem auto', maxWidth: '540px' }}>
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/reel/DGD2an1pRJ3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{
                  background: '#FFF', 
                  border: '0', 
                  borderRadius: '3px', 
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                  margin: '1px', 
                  maxWidth: '540px', 
                  minWidth: '326px', 
                  padding: '0', 
                  width: '99.375%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/reel/DGD2an1pRJ3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF', 
                      lineHeight: '0', 
                      padding: '0 0', 
                      textAlign: 'center', 
                      textDecoration: 'none', 
                      width: '100%'
                    }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {/* Instagram post content */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                      </div>
                    </div>
                    <div style={{ padding: '19% 0' }}></div>
                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                      <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                        {/* SVG paths */}
                      </svg>
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: '12.5% 0' }}></div>
                    {/* More Instagram post content */}
                  </a>
                  <p style={{
                    color: '#c9c8cd',
                    fontFamily: 'Arial,sans-serif',
                    fontSize: '14px',
                    lineHeight: '17px',
                    marginBottom: '0',
                    marginTop: '8px',
                    overflow: 'hidden',
                    padding: '8px 0 7px',
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    <a 
                      href="https://www.instagram.com/reel/DGD2an1pRJ3/?utm_source=ig_embed&amp;utm_campaign=loading" 
                      style={{
                        color: '#c9c8cd',
                        fontFamily: 'Arial,sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      A post shared by Shop Mandy Tools | DIY tools for women (@shopmandytools)
                    </a>
                  </p>
                </div>
              </blockquote>
            </div>
  
            {/* Instagram Post 2 */}
            <div style={{ margin: '1rem auto', maxWidth: '540px' }}>
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/p/DBh4GZ4PEly/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{
                  background: '#FFF', 
                  border: '0', 
                  borderRadius: '3px', 
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                  margin: '1px', 
                  maxWidth: '540px', 
                  minWidth: '326px', 
                  padding: '0', 
                  width: '99.375%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/p/DBh4GZ4PEly/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF', 
                      lineHeight: '0', 
                      padding: '0 0', 
                      textAlign: 'center', 
                      textDecoration: 'none', 
                      width: '100%'
                    }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {/* Instagram post content */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                      </div>
                    </div>
                    <div style={{ padding: '19% 0' }}></div>
                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                      <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                        {/* SVG paths */}
                      </svg>
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: '12.5% 0' }}></div>
                    {/* More Instagram post content */}
                  </a>
                  <p style={{
                    color: '#c9c8cd',
                    fontFamily: 'Arial,sans-serif',
                    fontSize: '14px',
                    lineHeight: '17px',
                    marginBottom: '0',
                    marginTop: '8px',
                    overflow: 'hidden',
                    padding: '8px 0 7px',
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    <a 
                      href="https://www.instagram.com/p/DBh4GZ4PEly/?utm_source=ig_embed&amp;utm_campaign=loading" 
                      style={{
                        color: '#c9c8cd',
                        fontFamily: 'Arial,sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        lineHeight: '17px',
                        textDecoration: 'none'
                      }} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      A post shared by Shop Mandy Tools | DIY tools for women (@shopmandytools)
                    </a>
                  </p>
                </div>
              </blockquote>
            </div>
            
            {/* Instagram Script */}
            <script async src="//www.instagram.com/embed.js"></script>
          </div>
        </div>
      </div>
    );
  }
