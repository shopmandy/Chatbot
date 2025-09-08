import { useEffect, useRef } from 'react'

export function PixelatedHammers() {
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

    // Hammer data
    const hammers = [
      { x: 100, y: 150, size: 30, speed: 0.5, rotation: 0 },
      { x: 300, y: 100, size: 40, speed: 0.3, rotation: 0 },
      { x: 500, y: 200, size: 25, speed: 0.7, rotation: 0 },
      { x: 800, y: 80, size: 35, speed: 0.4, rotation: 0 },
      { x: 1200, y: 180, size: 32, speed: 0.6, rotation: 0 },
    ]

    // Draw pixelated hammer
    const drawHammer = (x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      
      ctx.fillStyle = '#f91b8f' // Pink
      ctx.strokeStyle = '#d81b60' // Darker pink for outline
      ctx.lineWidth = 1

      // Create pixelated hammer shape
      const pixels = [
        // Hammer head (top)
        { x: -2, y: -3 }, { x: -1, y: -3 }, { x: 0, y: -3 }, { x: 1, y: -3 }, { x: 2, y: -3 },
        { x: -3, y: -2 }, { x: -2, y: -2 }, { x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: 2, y: -2 }, { x: 3, y: -2 },
        { x: -3, y: -1 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: -1 },
        { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
        // Hammer handle (bottom)
        { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 },
        { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 },
      ]

      pixels.forEach(pixel => {
        const pixelX = pixel.x * (size / 8)
        const pixelY = pixel.y * (size / 8)
        ctx.fillRect(pixelX, pixelY, size / 8, size / 8)
        ctx.strokeRect(pixelX, pixelY, size / 8, size / 8)
      })
      
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      hammers.forEach(hammer => {
        // Update position
        hammer.x += hammer.speed
        hammer.rotation += 0.02 // Slow rotation
        
        // Reset position when hammer goes off screen
        if (hammer.x > canvas.width + 100) {
          hammer.x = -100
          hammer.y = Math.random() * 200 + 50
        }
        
        // Draw hammer
        drawHammer(hammer.x, hammer.y, hammer.size, hammer.rotation)
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
