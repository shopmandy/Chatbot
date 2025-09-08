import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Tool {
  id: string
  name: string
  image: string
  initialX: number
  initialY: number
  width: number
  height: number
}

export function DraggableToolkit() {
  const [isVisible, setIsVisible] = useState(false)
  const [toolPositions, setToolPositions] = useState<{[key: string]: {x: number, y: number}}>({})
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x: 0, y: 0})
  const containerRef = useRef<HTMLDivElement>(null)

  const tools: Tool[] = [
    {
      id: 'hammer',
      name: 'Hammer',
      image: '/inflatable hammer.png',
      initialX: 20,
      initialY: 30,
      width: 120,
      height: 120
    },
    {
      id: 'wrench',
      name: 'Wrench',
      image: '/inflatable wrench.png',
      initialX: 60,
      initialY: 20,
      width: 120,
      height: 120
    },
    {
      id: 'screwdriver',
      name: 'Screwdriver',
      image: '/inflatable screwdriver.png',
      initialX: 80,
      initialY: 40,
      width: 80,
      height: 120
    },
    {
      id: 'pliers',
      name: 'Pliers',
      image: '/inflatable pliers.png',
      initialX: 40,
      initialY: 60,
      width: 100,
      height: 120
    },
    {
      id: 'level',
      name: 'Level',
      image: '/inflatable level.png',
      initialX: 15,
      initialY: 80,
      width: 150,
      height: 60
    },
    {
      id: 'tape',
      name: 'Tape Measure',
      image: '/inflatable tape measure .png',
      initialX: 70,
      initialY: 85,
      width: 120,
      height: 60
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Initialize tool positions
          tools.forEach(tool => {
            setToolPositions(prev => ({
              ...prev,
              [tool.id]: { x: tool.initialX, y: tool.initialY }
            }))
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
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

  const handleMouseDown = (e: React.MouseEvent, toolId: string) => {
    e.preventDefault()
    setIsDragging(toolId)
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100
      const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100
      
      setToolPositions(prev => ({
        ...prev,
        [isDragging]: { x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) }
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
        width: '100%',
        height: '500px',
        background: 'linear-gradient(135deg, #e4f6ff 0%, #ffe0f2 100%)',
        borderRadius: '12px',
        overflow: 'visible',
        margin: '2rem 0',
        border: '2px solid #f91b8f'
      }}
    >
      {/* Debug text */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#0a164d',
        zIndex: 100
      }}>
        Drag the tools around! ({tools.length} tools)
      </div>
      {tools.map((tool) => {
        const position = toolPositions[tool.id] || { x: tool.initialX, y: tool.initialY }
        return (
          <div
            key={tool.id}
            style={{
              position: 'absolute',
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: isVisible ? 1 : 0,
              transition: isDragging === tool.id ? 'none' : 'all 0.3s ease-out',
              zIndex: 10,
              pointerEvents: 'auto',
              cursor: isDragging === tool.id ? 'grabbing' : 'grab',
              width: `${tool.width}px`,
              height: `${tool.height}px`
            }}
            onMouseDown={(e) => handleMouseDown(e, tool.id)}
            title={tool.name}
          >
            <Image
              src={tool.image}
              alt={tool.name}
              width={tool.width}
              height={tool.height}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: isDragging === tool.id ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
                transition: 'filter 0.2s ease'
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
