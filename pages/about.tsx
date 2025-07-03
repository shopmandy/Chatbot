import styles from './about.module.css';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const [showInstagram, setShowInstagram] = useState(false);
  const { scrollY } = useScroll();
  // Parallax for each block (adjust the ranges for more/less movement)
  const yMission = useTransform(scrollY, [0, 400], [0, 60]);
  const yValues = useTransform(scrollY, [0, 400], [0, 0]);
  const yFounder = useTransform(scrollY, [0, 400], [0, 140]);
  const yInstagram = useTransform(scrollY, [0, 400], [0, 180]);
  const yHero = useTransform(scrollY, [0, 200], [0, -120]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0]);
  const opacityValues = useTransform(scrollY, [200, 350, 600], [0, 1, 0]);

  useEffect(() => {
    setShowInstagram(true);
    if (typeof window !== 'undefined' && (window as any).instgrm === undefined) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <div className={styles.fullBleedCloud}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContentWrapper}>
          <h1 className={styles.heroMainHeading}>
            AT MANDY, WE BELIEVE THAT EVERY WOMAN<br />
            CAN DO-IT-HERSELF WITH THE RIGHT TOOLS.
          </h1>
          <div className={styles.heroVisuals}>
            {/* Camera with photo */}
            <div className={styles.cameraFrame}>
              <img src="/about page inspo 1.png" alt="Camera with woman and Jeep" className={styles.cameraImg} />
              {/* Top right starburst with circular image - SVG mask */}
              <div className={styles.starburstSVGWrapper} style={{position: 'absolute', top: '-80px', right: '-110px', width: '200px', height: '200px', zIndex: 5}}>
                <svg width="200" height="200" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="circleClipTopRight">
                      <circle cx="250" cy="250" r="160" />
                    </clipPath>
                  </defs>
                  <image
                    href="/Ellipse 34.png"
                    width="500"
                    height="500"
                    clipPath="url(#circleClipTopRight)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image
                    href="/Star 7.png"
                    width="500"
                    height="500"
                    style={{mixBlendMode: 'multiply'}}
                  />
                </svg>
              </div>
              {/* Bottom left starburst with circular image - SVG mask */}
              <div className={styles.starburstSVGWrapper} style={{position: 'absolute', bottom: '-130px', left: '-110px', width: '200px', height: '200px', zIndex: 5}}>
                <svg width="200" height="200" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="circleClipBottomLeft">
                      <circle cx="250" cy="250" r="160" />
                    </clipPath>
                  </defs>
                  <image
                    href="/Ellipse 33.png"
                    width="500"
                    height="500"
                    clipPath="url(#circleClipBottomLeft)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image
                    href="/Star 7.png"
                    width="500"
                    height="500"
                    style={{mixBlendMode: 'multiply'}}
                  />
                </svg>
              </div>
              {/* Torn paper mission statement - move to bottom right of camera */}
              <div className={styles.tornPaperWrapper + ' ' + styles.tornPaperAbsolute}>
                <img src="/3 3545895.png" alt="Torn paper" className={styles.tornPaperImg} />
                <span className={styles.tornPaperText}>
                  We are dedicated to empowering women to confidently build, repair, and get it done, and we're here to provide the tools to make it happen.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <main className={styles.aboutContent}>
       
        <motion.p className={styles.aboutHeading} style={{ y: yMission }}>
          Our mission is to break down barriers and stereotypes in the world of DIY by offering thoughtfully designed tools that cater to the needs and preferences of women.
        </motion.p>
        <motion.div style={{ y: yValues, width: '100%'}}>
          <p className={styles.boldPink}>
            We are committed to:
          </p>
          <ul className={styles.valuesList}>
            <li>🛠️ Quality and Innovation</li>
            <li>📚 Education and Support</li>
            <li>💖 Inclusivity</li>
            <li>🌿 Sustainability</li>
            <li>👯‍♀️ Community Building</li>
          </ul>
        </motion.div>
        <motion.p style={{ y: yFounder }}>
          Mandy is not just a brand; it's a movement. We are here to redefine what it means to be handy and to ensure that every woman has the tools and knowledge to turn her desires into reality.
        </motion.p>
        <motion.section className={styles.founderSection} style={{ y: yFounder }}>
          <h3>FEMALE FOUNDED</h3>
          <div className={styles.founderContent}>
            <div>
              <p>
                Caroline is a dynamic entrepreneur with a rich background in sustainability, law, and emerging technologies. Caroline has cultivated a unique blend of expertise that is intricately woven into the fabric of Mandy.
              </p>
              <p>
                Passionate about breaking down barriers in traditionally male-dominated spaces, Caroline has channeled her love for DIY and commitment to empowerment into creating Mandy. Her vision is to revolutionize the DIY space by providing women with tools that are not only functional but also beautifully designed, ensuring that every tool reflects the strength and elegance of its user.
              </p>
            </div>
            <img 
              src="/founder.png" 
              alt="Caroline, founder of Mandy Tools" 
              className={styles.founderImg}
            />
          </div>
        </motion.section>
        <motion.section className={styles.instagramSection} style={{ y: yInstagram }}>
          <h3>Follow Us on Instagram</h3>
          <div className={styles.instagramEmbed}>
            {showInstagram && (
              <>
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="https://www.instagram.com/reel/DGD2an1pRJ3/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                ></blockquote>
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="https://www.instagram.com/p/DBh4GZ4PEly/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                ></blockquote>
              </>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
