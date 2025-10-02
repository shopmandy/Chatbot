import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Bubble {
  id: string
  x: number // percentage from left
  y: number // percentage from top
  image: string
  title: string
  description: string
  price: string
  link: string
  delay: number // delay in ms before showing
}

export function InteractiveRoomImage() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>([])
  const [bubblePositions, setBubblePositions] = useState<{
    [key: string]: { x: number; y: number }
  }>({})
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const bubbles: Bubble[] = [
    {
      id: 'wallpaper',
      x: 5, // further left to cover less of the image
      y: 25, // slightly higher
      image: '/blue wallpaper.jpg',
      title: 'Dimoon Blue Peel and Stick Wallpaper',
      description: '',
      price: '$8.99',
      link: 'https://amzn.to/46nd3Ut',
      delay: 500,
    },
    {
      id: 'rug',
      x: 75, // bottom right area
      y: 95, // moved down slightly more
      image: '/woven rug.jpg',
      title: 'nuLOOM Rigo Jute Hand Woven Area Rug',
      description: '',
      price: '$67',
      link: 'https://amzn.to/3VB17Za',
      delay: 1000,
    },
    // Add more bubbles here as needed
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Show bubbles with staggered delays
          bubbles.forEach((bubble, index) => {
            setTimeout(
              () => {
                setVisibleBubbles(prev => [...prev, bubble.id])
              },
              bubble.delay + index * 200
            )
          })
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Initialize bubble positions when they become visible
  useEffect(() => {
    bubbles.forEach(bubble => {
      if (visibleBubbles.includes(bubble.id) && !bubblePositions[bubble.id]) {
        setBubblePositions(prev => ({
          ...prev,
          [bubble.id]: { x: bubble.x, y: bubble.y },
        }))
      }
    })
  }, [visibleBubbles])

  const handleMouseDown = (e: React.MouseEvent, bubbleId: string) => {
    e.preventDefault()
    setIsDragging(bubbleId)
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const newX =
        ((e.clientX - containerRect.left - dragOffset.x) /
          containerRect.width) *
        100
      const newY =
        ((e.clientY - containerRect.top - dragOffset.y) /
          containerRect.height) *
        100

      setBubblePositions(prev => ({
        ...prev,
        [isDragging]: {
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY)),
        },
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
    setDragOffset({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        margin: '0',
        borderRadius: '12px',
        overflow: 'visible',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '400px',
          background: 'linear-gradient(90deg, #f3f4f6 50%, #fef3c7 50%)',
          gap: '0',
          overflow: 'visible',
        }}
      >
        {/* Before Side */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0.5rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#000000',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: "'VT323', monospace",
              zIndex: 1,
            }}
          >
            BEFORE
          </div>
          <Image
            src="/double dorm before.png"
            alt="Before - Double Dorm Room"
            width={500}
            height={300}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* After Side with Interactive Bubbles */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0.5rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#000000',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: "'VT323', monospace",
              zIndex: 1,
            }}
          >
            AFTER
          </div>
          <Image
            src="/double dorm after.png"
            alt="After - Double Dorm Room"
            width={500}
            height={300}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          {/* Interactive Bubbles */}
          {bubbles.map(bubble => {
            const position = bubblePositions[bubble.id] || {
              x: bubble.x,
              y: bubble.y,
            }
            return (
              <div
                key={bubble.id}
                style={{
                  position: 'absolute',
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: visibleBubbles.includes(bubble.id) ? 1 : 0,
                  transition:
                    isDragging === bubble.id ? 'none' : 'all 0.5s ease-out',
                  zIndex: 10,
                  pointerEvents: 'auto',
                  cursor: isDragging === bubble.id ? 'grabbing' : 'grab',
                }}
                onMouseDown={e => handleMouseDown(e, bubble.id)}
              >
                {/* Bubble */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid #ff69b4',
                    borderRadius: '8px',
                    padding: '12px 6px',
                    width: '120px',
                    height: '180px',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Product Image */}
                  <div style={{ marginBottom: '6px' }}>
                    <Image
                      src={bubble.image}
                      alt={bubble.title}
                      width={60}
                      height={60}
                      style={{
                        width: '100%',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <h4
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#0a164d',
                      margin: '0 0 3px 0',
                      fontFamily: "'VT323', monospace",
                      lineHeight: '1.1',
                    }}
                  >
                    {bubble.title}
                  </h4>

                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#0a164d',
                      fontFamily: "'VT323', monospace",
                    }}
                  >
                    {bubble.price}
                  </div>

                  <a
                    href={bubble.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: '#f91b8f',
                      color: 'white',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      fontFamily: "'Attila Sans Classic', 'Playfair Display', 'Georgia', 'Times New Roman', serif",
                      marginTop: '6px',
                      pointerEvents: 'auto',
                      width: '100%',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    BUY ON AMAZON
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
