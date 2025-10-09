import React, { useState, useEffect, useRef } from 'react'
import { Hammer, ToyBrick } from 'lucide-react'

interface DinoGameModalProps {
  show: boolean
  onClose: () => void
}

export function DinoGameModal({ show, onClose }: DinoGameModalProps) {
  const GAME_WIDTH = 400
  const GAME_HEIGHT = 180
  const GROUND_Y = 140
  const PLAYER_SIZE = 33
  const OBSTACLE_WIDTH = 24
  const OBSTACLE_HEIGHT = 24
  const JUMP_HEIGHT = 68
  const JUMP_DURATION = 650 // ms
  const OBSTACLE_SPEED = 3.0 // px per frame
  const OBSTACLE_INTERVAL = 1200 // ms

  // Refs for mutable game state
  const playerYRef = useRef(GROUND_Y)
  const isJumpingRef = useRef(false)
  const obstaclesRef = useRef<{ x: number }[]>([])
  const gameOverRef = useRef(false)
  const scoreRef = useRef(0)
  const lastObs = useRef(Date.now())
  const rafRef = useRef<number | null>(null)

  // State for re-render
  const [playerY, setPlayerY] = useState(GROUND_Y)
  const [obstacles, setObstacles] = useState<{ x: number }[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const highScoreRef = useRef(0)
  const [, forceRerender] = useState(0)

  useEffect(() => {
    highScoreRef.current = highScore
  }, [highScore])

  // Handle jump
  const jump = () => {
    if (isJumpingRef.current || gameOverRef.current) return
    isJumpingRef.current = true
    const start = Date.now()
    function animateJump() {
      const elapsed = Date.now() - start
      if (elapsed < JUMP_DURATION / 2) {
        playerYRef.current =
          GROUND_Y - JUMP_HEIGHT * (elapsed / (JUMP_DURATION / 2))
        setPlayerY(playerYRef.current)
        requestAnimationFrame(animateJump)
      } else if (elapsed < JUMP_DURATION) {
        playerYRef.current =
          GROUND_Y -
          JUMP_HEIGHT *
            (1 - (elapsed - JUMP_DURATION / 2) / (JUMP_DURATION / 2))
        setPlayerY(playerYRef.current)
        requestAnimationFrame(animateJump)
      } else {
        playerYRef.current = GROUND_Y
        setPlayerY(playerYRef.current)
        isJumpingRef.current = false
      }
    }
    animateJump()
  }

  // Handle keyboard and tap
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
        if (gameOverRef.current) restart()
      }
    }
    const onTap = () => {
      jump()
      if (gameOverRef.current) restart()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTap)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTap)
    }
  }, [show])

  // Game loop
  useEffect(() => {
    if (!show) return
    // Reset all refs and state
    playerYRef.current = GROUND_Y
    isJumpingRef.current = false
    obstaclesRef.current = []
    gameOverRef.current = false
    scoreRef.current = 0
    lastObs.current = Date.now()
    setPlayerY(GROUND_Y)
    setObstacles([])
    setGameOver(false)
    setScore(0)
    forceRerender(prev => prev + 1)

    function gameLoop() {
      if (gameOverRef.current) return

      // Spawn obstacles
      const now = Date.now()
      if (now - lastObs.current > OBSTACLE_INTERVAL) {
        obstaclesRef.current.push({ x: GAME_WIDTH })
        lastObs.current = now
      }

      // Update obstacles
      obstaclesRef.current = obstaclesRef.current
        .map(obs => ({ x: obs.x - OBSTACLE_SPEED }))
        .filter(obs => obs.x > -OBSTACLE_WIDTH)

      // Check collisions
      const playerRect = {
        x: 50,
        y: playerYRef.current - PLAYER_SIZE,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      }

      for (const obs of obstaclesRef.current) {
        const obsRect = {
          x: obs.x,
          y: GROUND_Y - OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
        }

        if (
          playerRect.x < obsRect.x + obsRect.width &&
          playerRect.x + playerRect.width > obsRect.x &&
          playerRect.y < obsRect.y + obsRect.height &&
          playerRect.y + playerRect.height > obsRect.y
        ) {
          gameOverRef.current = true
          setGameOver(true)
          if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current)
          }
          return
        }
      }

      // Update score
      scoreRef.current += 1
      setScore(scoreRef.current)

      // Update state for re-render
      setObstacles([...obstaclesRef.current])
      rafRef.current = requestAnimationFrame(gameLoop)
    }

    rafRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [show])

  const restart = () => {
    playerYRef.current = GROUND_Y
    isJumpingRef.current = false
    obstaclesRef.current = []
    gameOverRef.current = false
    scoreRef.current = 0
    lastObs.current = Date.now()
    setPlayerY(GROUND_Y)
    setObstacles([])
    setGameOver(false)
    setScore(0)
    forceRerender(prev => prev + 1)
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ff0000',
        backgroundColor: '#ff0000',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <div
        style={{
          background: '#ffffff',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%',
          opacity: 1,
          backdropFilter: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 100000,
        }}
        className="solid-white-modal"
      >
        <div
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.5rem',
            color: '#0a164d',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Jump the Blocks!
          <div className="window-controls">
            <button className="window-buttons" onClick={onClose} title="Close">
              <span className="window-button-icon">×</span>
            </button>
          </div>
        </div>
        <div
          style={{
            fontSize: '1rem',
            color: '#0a164d',
            fontFamily: 'Roboto Mono, monospace',
            marginBottom: '1rem',
          }}
        >
          Press SPACE or tap to jump!
        </div>
        <div
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            background: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)',
            border: '3px solid #0a164d',
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto 1rem',
          }}
        >
          {/* Ground */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: '#8B4513',
            }}
          />
          {/* Player */}
          <div
            style={{
              position: 'absolute',
              left: '50px',
              bottom: GROUND_Y - playerY,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              background: '#ff69b4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ff1493',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            <Hammer style={{ width: 20, height: 20, color: '#fff' }} />
          </div>
          {/* Obstacles */}
          {obstacles.map((o, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: o.x,
                bottom: GROUND_Y - OBSTACLE_HEIGHT,
                width: OBSTACLE_WIDTH,
                height: OBSTACLE_HEIGHT,
                background: '#ff1493',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ff69b4',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              <ToyBrick style={{ width: 16, height: 16, color: '#fff' }} />
            </div>
          ))}
          {/* Game Over Overlay */}
          {gameOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'VT323, monospace',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  marginBottom: 12,
                }}
              >
                Game Over!
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  color: '#0a164d',
                  marginBottom: 18,
                }}
              >
                Press Space or Tap to Restart
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: '1rem',
            color: '#0a164d',
            fontFamily: 'Roboto Mono, monospace',
            fontWeight: 600,
            marginTop: 6,
            padding: '0 1rem',
          }}
        >
          Score: {score}
        </div>
        <div
          style={{
            fontSize: '1.1rem',
            color: '#0a164d',
            fontWeight: 600,
            marginTop: 6,
            padding: '0 1rem',
          }}
        >
          High Score: {highScore}
        </div>
      </div>
    </div>
  )
}
