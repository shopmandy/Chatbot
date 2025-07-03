import styles from './about.module.css';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';

export default function About() {
  const [showInstagram, setShowInstagram] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  // Parallax for each block (adjust the ranges for more/less movement)
  const yMission = useTransform(scrollY, [0, 400], [0, 60]);
  const yValues = useTransform(scrollY, [0, 400], [0, 0]);
  const yFounder = useTransform(scrollY, [0, 400], [0, 140]);
  const yInstagram = useTransform(scrollY, [0, 400], [0, 180]);
  const yCarousel = useTransform(scrollY, [0, 400], [0, 220]);
  const yHero = useTransform(scrollY, [0, 200], [0, -120]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0]);
  const opacityValues = useTransform(scrollY, [200, 350, 600], [0, 1, 0]);

  // Sample images for the carousel - replace with your actual images
  const carouselImages = [
    {
      src: '/box-crop.png',
      alt: 'Mandy Toolbox'
    },
    {
      src: '/carousel-image-2.png',
      alt: 'Mandy Bronco'
    },
    {
      src: '/clouds 2.png',
      alt: 'Clouds'
    },
    {
      src: '/hero-cb-edit.png',
      alt: 'Mandy Hero'
    },
    {
      src: '/wrench.png',
      alt: 'Mandy Wrench'
    }
    ,
    {
      src: '/denim-4517843_1280.jpg',
      alt: 'Denim'
    },
    {
      src: '/carousel-image.png',
      alt: 'Behind the Scenes'
    },
    {
      src: '/mandy-collage.png',
      alt: 'Mandy Collage'
    }
  ];

  // Create a continuous loop of images for smooth scrolling
  const continuousImages = [...carouselImages, ...carouselImages, ...carouselImages];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Continuous smooth scrolling effect with seamless reset
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        let next = prev + 0.0045;
        // If we've scrolled through the first set and into the second, reset to the start
        if (next >= carouselImages.length * 2) {
          return next - carouselImages.length;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Floating PNGs */}
        <motion.img src="/mandy-tools-doodle.png" className={styles.floatingImg1} alt="Mandy Tools Doodle" animate={{ y: [0, -20, 0]}} transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}} />
        <motion.img src="/star-doodle-1.png" className={styles.floatingImg2} alt="Star Doodle 1" animate={{ x: [0, -20, 0]}} transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}} />
        <motion.img src="/star-doodle-2.png" className={styles.floatingImg3} alt="Star Doodle 2" animate={{ y: [0, -20, 0]}} transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}} />
        <motion.img src="/star.png" className={styles.floatingImg4} alt="star" animate={{ x: [0, -20, 0]}} transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}} />
        {/* Hero Content */}
        <motion.h1
          style={{ y: yHero, opacity: opacityHero }}
          className={styles.heroHeading}
          transition={{ type: 'tween', ease: 'easeOut' }}
        >
          AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO–IT–HERSELF WITH THE RIGHT TOOLS.
        </motion.h1>
        <motion.p className={styles.heroSubheading} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Let's face it. No one wants to decorate alone.
        </motion.p>
      </section>

      {/* About Content Section */}
      <main className={styles.aboutContent}>
        <motion.h2 className={styles.aboutHeading} style={{ y: yMission }}>
          We are dedicated to empowering women to confidently build, repair, and get it done, and we're here to provide the tools to make it happen.
        </motion.h2>
        <motion.p style={{ y: yMission }}>
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

        {/* Photo Carousel Section */}
        <motion.section className={styles.carouselSection} style={{ y: yCarousel }}>
          <div className={styles.carouselHeader}>
            <span className={styles.carouselHeaderText}>Build along with us!</span>
            <a
              href="https://instagram.com/shopmandytools"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.carouselHeaderLink}
            >
              @shopmandytools
            </a>
          </div>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
              <div 
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {continuousImages.map((image, index) => (
                  <div key={index} className={styles.carouselSlide}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className={styles.carouselImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
