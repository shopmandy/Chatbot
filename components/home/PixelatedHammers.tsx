import { useEffect, useRef } from 'react'

export function MagicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create gradient background
    const createBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#E6F3FF') // Light blue at top
      gradient.addColorStop(1, '#FFF8E1') // Light yellow at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Draw glowing butterfly
    const drawButterfly = (x: number, y: number, size: number, glow: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      // Create glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2)
      glowGradient.addColorStop(0, `rgba(135, 206, 235, ${glow})`)
      glowGradient.addColorStop(0.5, `rgba(255, 248, 225, ${glow * 0.5})`)
      glowGradient.addColorStop(1, `rgba(135, 206, 235, 0)`)
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 2, size * 1.5, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Butterfly body
      ctx.fillStyle = `rgba(255, 248, 225, ${glow * 0.8})`
      ctx.fillRect(-size * 0.1, -size * 0.8, size * 0.2, size * 1.6)
      
      // Butterfly wings
      ctx.fillStyle = `rgba(135, 206, 235, ${glow * 0.6})`
      ctx.beginPath()
      ctx.ellipse(-size * 0.3, -size * 0.3, size * 0.4, size * 0.3, -0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(size * 0.3, -size * 0.3, size * 0.4, size * 0.3, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(-size * 0.3, size * 0.3, size * 0.4, size * 0.3, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(size * 0.3, size * 0.3, size * 0.4, size * 0.3, -0.3, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    // Draw glowing star
    const drawStar = (x: number, y: number, size: number, glow: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      // Create glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3)
      glowGradient.addColorStop(0, `rgba(255, 248, 225, ${glow})`)
      glowGradient.addColorStop(0.3, `rgba(255, 192, 203, ${glow * 0.7})`)
      glowGradient.addColorStop(0.6, `rgba(135, 206, 235, ${glow * 0.4})`)
      glowGradient.addColorStop(1, `rgba(255, 248, 225, 0)`)
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 3, size * 3, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Star shape
      ctx.fillStyle = `rgba(255, 248, 225, ${glow * 0.9})`
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5
        const x1 = Math.cos(angle) * size
        const y1 = Math.sin(angle) * size
        const x2 = Math.cos(angle + Math.PI / 5) * (size * 0.4)
        const y2 = Math.sin(angle + Math.PI / 5) * (size * 0.4)
        
        if (i === 0) {
          ctx.moveTo(x1, y1)
        } else {
          ctx.lineTo(x1, y1)
        }
        ctx.lineTo(x2, y2)
      }
      ctx.closePath()
      ctx.fill()
      
      ctx.restore()
    }

    // Draw small star
    const drawSmallStar = (x: number, y: number, size: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      ctx.fillStyle = 'rgba(255, 248, 225, 0.8)'
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5
        const x1 = Math.cos(angle) * size
        const y1 = Math.sin(angle) * size
        const x2 = Math.cos(angle + Math.PI / 5) * (size * 0.4)
        const y2 = Math.sin(angle + Math.PI / 5) * (size * 0.4)
        
        if (i === 0) {
          ctx.moveTo(x1, y1)
        } else {
          ctx.lineTo(x1, y1)
        }
        ctx.lineTo(x2, y2)
      }
      ctx.closePath()
      ctx.fill()
      
      ctx.restore()
    }

    // Animation data
    let time = 0
    const butterflies = [
      { x: 200, y: 150, size: 30, glow: 0.3 },
      { x: 800, y: 300, size: 25, glow: 0.4 },
      { x: 1200, y: 200, size: 35, glow: 0.2 },
    ]
    
    const stars = [
      { x: 600, y: 100, size: 20, glow: 0.6 },
      { x: 300, y: 400, size: 25, glow: 0.5 },
      { x: 1000, y: 350, size: 18, glow: 0.4 },
    ]

    // Animation loop
    const animate = () => {
      time += 0.01
      
      // Clear and draw background
      createBackground()
      
      // Draw small stars
      for (let i = 0; i < 20; i++) {
        const x = (i * 150) % canvas.width
        const y = (i * 80) % canvas.height
        drawSmallStar(x, y, 3 + Math.sin(time + i) * 2)
      }
      
      // Draw glowing butterflies
      butterflies.forEach((butterfly, i) => {
        const glow = butterfly.glow + Math.sin(time + i) * 0.1
        drawButterfly(butterfly.x, butterfly.y, butterfly.size, Math.max(0, glow))
      })
      
      // Draw glowing stars
      stars.forEach((star, i) => {
        const glow = star.glow + Math.sin(time * 0.5 + i) * 0.2
        drawStar(star.x, star.y, star.size, Math.max(0, glow))
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
