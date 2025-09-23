import { useUser } from '@clerk/nextjs'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './chatbot.module.css'
import CustomizePanel from '../components/chatbot/CustomizePanel'
import ChatDropdown from '../components/chatbot/chatDropdown'

type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
  imageUrl?: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey there! I'm Mandy, your DIY companion! Whether you need help with home projects, want decor inspiration, or need step-by-step guidance, I'm here to help! What are you working on today? 🔨💕",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showHero, setShowHero] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [trendingTopics, setTrendingTopics] = useState<string[] | null>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [showChats, setShowChats] = useState<false | 'default' | 'save'>(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileActions, setShowMobileActions] = useState(false)
  const { isSignedIn } = useUser()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Separate ref for camera capture on mobile
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const removePreview = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ''
    }
  }

  const sendMessage = async (customInput?: string) => {
    const userInput = customInput ?? input
    if (!userInput.trim() && !imagePreview) return

    // Hide hero section when user starts chatting
    if (showHero) {
      setShowHero(false)
    }

    const newMessage: Message = {
      role: 'user',
      content: userInput,
      ...(imagePreview && { imageUrl: imagePreview }),
    }

    const newMessages: Message[] = [...messages, newMessage]
    setMessages(newMessages)
    setInput('')
    setImagePreview(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('messages', JSON.stringify(newMessages))

      if (fileInputRef.current?.files?.[0]) {
        formData.append('image', fileInputRef.current.files[0])
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      if (!data.response?.content) {
        throw new Error('Invalid response from server')
      }

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.response.content,
        },
      ])
    } catch (err) {
      console.error('Error:', err)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Error: Failed to get response',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages])

  const [showSettings, setShowSettings] = useState(false)

  //default colors
  useEffect(() => {
    // Fix mobile 100vh sizing by setting a CSS var based on innerHeight
    const setViewportHeightUnit = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setViewportHeightUnit()
    window.addEventListener('resize', setViewportHeightUnit)

    const defaultTheme = {
      '--button-bg': 'white',
      '--button-text': '#333333',
      '--button-border': '#f91b8f',
      '--chat-border': '#f91b8f',
      '--user-bubble': '#f91b8f',
      '--chat-bubble': '#f8f9fa',
      '--chat-bg': 'white',
      '--chat-text': '#333333',
      '--chat-text-user': 'white',
    }

    // Always apply the Basic theme as default
    for (const [key, value] of Object.entries(defaultTheme)) {
      document.documentElement.style.setProperty(key, value)
    }

    return () => {
      window.removeEventListener('resize', setViewportHeightUnit)
    }
  }, [])

  /*
  useEffect(() => {
    fetch('/api/get-trending-topics')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.questions)) {
          setTrendingTopics(data.questions)
        }
      })
      .catch(() => {
        console.error('Failed to fetch trending topics.')
      })
  }, [])
  */
  
  // Common questions for chatbot presets
  const commonQuestions = [
    'How do I paint a room?',
    "What's a quick DIY decor project for my bedroom?",
    'How to hang wallpaper',
    'How do I fix a hole in drywall?',
    'What essential tools do I need for a DIY project?',
    'How do I hang a picture?',
    'Ideas for brightening up my home',
    'How to make a DIY photo collage',
    'Space-saving ideas for small rooms',
    'Decor suggestions for shelves',
    'How do I hang blinds?',
    'Tips for creating a photo wall',
    'Painting tips for beginners',
    'Best layout for studio apartment',
    'What are creative storage hacks?',
    'How can I upcycle thrifted furniture?',
    'What is the best way to improve lighting in my home?',
    'Affordable projects to make my space more stylish?',
  ]
  // Function to get random questions
  const getRandomQuestions = () => {
    const shuffled = [...commonQuestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  }

  // Initialize with random questions on client side only
  const [questionsToShow, setQuestionsToShow] = useState<string[]>([])

  useEffect(() => {
    setQuestionsToShow(getRandomQuestions())
  }, [])

  const handleSaveChat = async () => {
    if (!isSignedIn) {
      setShowChats('save') // open the sign in popup with save mode
      return
    }
    const title = prompt('Enter a title for this chat:')
    if (!title) return
    const response = await fetch('/api/save-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        title,
      }),
    })
    if (response.ok) {
      alert('Chat saved!')
      // Optionally: refresh chat list
    } else {
      const { error } = await response.json()
      alert(`Error saving chat: ${error}`)
    }
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Tiny5&family=Roboto+Mono:wght@400;700&family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.pageContainer}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            {/* Hero Section */}
            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>
                Ask Handy Mandy
              </h2>
              <p className={`${styles.heroSubtitle} text-xs md:text-lg`} style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Our Mandy toolbot can tackle any DIY, decor, or life Qs you throw its way.
              </p>
            </div>
          </div>
        </header>

        {/* Feature Bubbles */}
        <div
          style={{
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: '1.6rem',
            flexWrap: 'wrap',
            padding: '0 clamp(1rem, 5vw, 2rem)',
          }}
              className="hidden md:flex"
        >
          <div
            className="w-full max-w-[320px] md:max-w-[340px]"
            style={{
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
              background: '#fff',
              borderRadius: '16px',
              border: '3px solid #f91b8f',
              boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0) scale(1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
              e.currentTarget.style.boxShadow =
                '0 12px 32px rgba(255, 105, 180, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(255, 105, 180, 0.15)'
            }}
          >
            <div
              style={{
                fontFamily: 'VT323, Tiny5, Courier, monospace',
                fontSize: '1.6rem',
                color: '#0a164d',
                fontWeight: 700,
                marginBottom: '0.5rem',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              💬 INSTANT ANSWERS
            </div>
            <div
              className="text-xs md:text-xs"
              style={{
                fontFamily: 'Roboto Mono, monospace',
                color: '#0a164d',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              Get step-by-step DIY help anytime
            </div>
          </div>

          <div
            className="w-full max-w-[320px] md:max-w-[340px]"
            style={{
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
              background: '#fff',
              borderRadius: '16px',
              border: '3px solid #f91b8f',
              boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0) scale(1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
              e.currentTarget.style.boxShadow =
                '0 12px 32px rgba(255, 105, 180, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(255, 105, 180, 0.15)'
            }}
          >
            <div
              style={{
                fontFamily: 'VT323, Tiny5, Courier, monospace',
                fontSize: '1.6rem',
                color: '#0a164d',
                fontWeight: 700,
                marginBottom: '0.5rem',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              🛠 TOOL TIPS
            </div>
            <div
              className="text-xs md:text-xs"
              style={{
                fontFamily: 'Roboto Mono, monospace',
                color: '#0a164d',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              Learn how to use every tool with ease
            </div>
          </div>

          <div
            className="w-full max-w-[320px] md:max-w-[340px]"
            style={{
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
              background: '#fff',
              borderRadius: '16px',
              border: '3px solid #f91b8f',
              boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0) scale(1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
              e.currentTarget.style.boxShadow =
                '0 12px 32px rgba(255, 105, 180, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(255, 105, 180, 0.15)'
            }}
          >
            <div
              style={{
                fontFamily: 'VT323, Tiny5, Courier, monospace',
                fontSize: '1.6rem',
                color: '#0a164d',
                fontWeight: 700,
                marginBottom: '0.5rem',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              ✨ PROJECT CONFIDENCE
            </div>
            <div
              className="text-xs md:text-xs"
              style={{
                fontFamily: 'Roboto Mono, monospace',
                color: '#0a164d',
                lineHeight: '1.4',
                textAlign: 'center',
              }}
            >
              Follow clear guidance to do it right
            </div>
          </div>
        </div>

        {/* Ask Mandy Anything Button (hidden on mobile) */}
        <div className="hidden md:flex justify-center mt-8 mb-8">
          <button
            className="relative px-16 py-6 w-full max-w-[280px] md:max-w-md bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white font-mono text-lg font-extrabold border-2 border-pink-400 rounded-3xl cursor-pointer tracking-wide transition-all duration-150 scale-105 overflow-hidden shadow-lg hover:scale-108 hover:shadow-xl"
            onClick={() => {
              // Scroll to the chat interface
              const chatInterface = document.querySelector(`.${styles.chatInterface}`)
              if (chatInterface) {
                chatInterface.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            }}
          >
            {/* Highlight overlay for 3D effect */}
            <div className="absolute top-2 left-2 right-2 h-4 rounded-t-2xl bg-gradient-to-r from-white/20 to-white/10 pointer-events-none" />

            {/* Inner glow for active state */}
            <div className="absolute inset-3 rounded-2xl bg-white/5 animate-pulse pointer-events-none" />

            {/* Button text */}
            <span className="relative z-10 text-shadow-sm">
              Ask Mandy Anything
            </span>
          </button>
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.chatContainer}>
            {/* Window Title Bar - Always visible */}
            <div className={styles.windowTitleBar}>
              {/* Mobile Menu Button - Left Side */}
              <div className={styles.mobileMenuButton}>
                <button
                  className={styles.mobileMenuToggle}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  ☰
                </button>
                {showMobileMenu && (
                  <div className={styles.mobileMenuDropdown}>
                    <button
                      className={styles.mobileMenuItem}
                      onClick={() => {
                        setShowSettings(true)
                        setShowMobileMenu(false)
                      }}
                    >
                      ⚙️ Customize
                    </button>
                    <button
                      className={styles.mobileMenuItem}
                      onClick={() => {
                        setShowChats('default')
                        setShowMobileMenu(false)
                      }}
                    >
                      💬 Chats
                    </button>
                    <button
                      className={styles.mobileMenuItem}
                      onClick={() => {
                        if (!isSignedIn) {
                          setShowChats('save')
                        } else {
                          handleSaveChat()
                        }
                        setShowMobileMenu(false)
                      }}
                    >
                      💾 Save Chat
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile ChatDropdown - rendered outside mobile menu */}
              <div className="md:hidden">
                {showChats && (
                  <ChatDropdown
                    onClose={() => setShowChats(false)}
                    mode={showChats === 'save' ? 'save' : 'default'}
                    onChatSelect={async chatId => {
                      const res = await fetch(`/api/load-chat?chatId=${chatId}`)
                      if (res.ok) {
                        const data = await res.json()
                        setMessages(data.messages || [])
                        setShowHero(false)
                      }
                    }}
                  />
                )}
              </div>

              <div className={styles.windowTitle}>CHAT WITH MANDY</div>
              
              {/* Desktop Actions */}
              <div className={styles.windowActions}>
                <button
                  className={styles.customizeButton}
                  onClick={() => setShowSettings(true)}
                >
                  Customize{' '}
                  <span role="img" aria-label="wrench">
                    ⚙️
                  </span>
                </button>
                <button
                  className={styles.customizeButton}
                  onClick={() => setShowChats('default')}
                >
                  Chats{' '}
                  <span role="img" aria-label="chat bubble">
                    💬
                  </span>
                </button>
                <div style={{ position: 'relative' }}>
                  <button
                    className={styles.customizeButton}
                    onClick={handleSaveChat}
                  >
                    Save Chat{' '}
                    <span role="img" aria-label="floppy disk">
                      💾
                    </span>
                  </button>
                  {showChats && (
                    <ChatDropdown
                      onClose={() => setShowChats(false)}
                      mode={showChats === 'save' ? 'save' : 'default'}
                      onChatSelect={async chatId => {
                        const res = await fetch(`/api/load-chat?chatId=${chatId}`)
                        if (res.ok) {
                          const data = await res.json()
                          setMessages(data.messages || [])
                          setShowHero(false)
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className={styles.windowControls}>
                <button className={styles.windowButton} title="Minimize">
                  <span className={styles.windowButtonIcon}>─</span>
                </button>
                <button className={styles.windowButton} title="Maximize">
                  <span className={styles.windowButtonIcon}>□</span>
                </button>
                <button className={styles.windowButton} title="Close">
                  <span className={styles.windowButtonIcon}>×</span>
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className={styles.chatInterface}>
              <div className={styles.chatBox} ref={chatBoxRef}>
                {messages.map((msg, idx) => {
                  // If this is a user message and the next message is assistant, group them
                  if (
                    msg.role === 'user' &&
                    messages[idx + 1]?.role === 'assistant'
                  ) {
                    return (
                      <div key={idx} className={styles.chatMessageGroup}>
                        <div className={styles.questionBubble}>
                          <h2>{msg.content}</h2>
                        </div>
                        <div className={styles.bubble}>
                          <div className={styles.messageHeader}>
                            <span className={styles.mandyIcon}>M</span>
                            <span className={styles.messageLabel}>Mandy</span>
                          </div>
                          <ReactMarkdown>
                            {messages[idx + 1].content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )
                  }
                  // If this is an assistant message that was not paired, skip (already rendered)
                  if (
                    msg.role === 'assistant' &&
                    idx > 0 &&
                    messages[idx - 1]?.role === 'user'
                  ) {
                    return null
                  }
                  // Otherwise, render as normal (for system or unpaired messages)
                  if (msg.role === 'user') {
                    return (
                      <div key={idx} className={styles.questionBubble}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )
                  }
                  return (
                    <div key={idx} className={styles.bubble}>
                      <div className={styles.messageHeader}>
                        <span className={styles.mandyIcon}>M</span>
                        <span className={styles.messageLabel}>Mandy</span>
                      </div>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )
                })}
                {loading && (
                  <div className={styles.loadingBubble}>
                    <div className={styles.messageHeader}>
                      <span className={styles.mandyIcon}>M</span>
                      <span className={styles.messageLabel}>Mandy</span>
                    </div>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                {showHero && (
                  <div className="border-t-4 border-primary/30 pt-2 md:pt-2 mt-12 md:mt-14">
                    <h3 className="text-center text-pink-600 font-bold text-xl mb-2">
                      Try these popular questions:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {questionsToShow.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(question)}
                          className="text-lg p-2 border-2 border-pink-400 rounded-2xl text-pink-600 hover:bg-pink-50 transition-colors text-center"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className={styles.previewContainer}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <button
                    className={styles.removePreview}
                    onClick={removePreview}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Input Area */}
              <div className={styles.inputArea}>
                <input
                  type="file"
                  ref={fileInputRef}
                  className={styles.fileInput}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {/* Hidden input for direct camera capture on mobile */}
                <input
                  type="file"
                  ref={cameraInputRef}
                  className={styles.fileInput}
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                />
                {/* Desktop upload button */}
                <button
                  className={`${styles.uploadButton} ${styles.desktopOnly}`}
                  onClick={triggerFileInput}
                  disabled={loading}
                  title="Upload image"
                >
                  📷
                </button>

                {/* Mobile left actions: + FAB that reveals upload/camera */}
                <div className={styles.mobileActions}>
                  <button
                    className={styles.actionFab}
                    onClick={() => setShowMobileActions(v => !v)}
                    aria-expanded={showMobileActions}
                    aria-label="More actions"
                    disabled={loading}
                  >
                    +
                  </button>
                  {showMobileActions && (
                    <div className={styles.actionMenu}>
                      <button
                        className={styles.actionItem}
                        onClick={() => {
                          setShowMobileActions(false)
                          triggerFileInput()
                        }}
                        disabled={loading}
                        title="Upload from library"
                      >
                        🖼
                      </button>
                      <button
                        className={styles.actionItem}
                        onClick={() => {
                          setShowMobileActions(false)
                          triggerCameraInput()
                        }}
                        disabled={loading}
                        title="Take a photo"
                      >
                        📷
                      </button>
                    </div>
                  )}
                </div>

                <input
                  className={styles.inputBox}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about DIY home projects..."
                  disabled={loading}
                />

                {/* Desktop send button */}
                <button
                  className={`${styles.sendButton} ${styles.desktopOnly}`}
                  onClick={() => sendMessage()}
                  disabled={loading || (!input.trim() && !imagePreview)}
                >
                  Send
                </button>

                {/* Mobile circular send button */}
                <button
                  className={styles.sendFab}
                  onClick={() => sendMessage()}
                  disabled={loading || (!input.trim() && !imagePreview)}
                  aria-label="Send"
                  title="Send"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Settings Panel */}
        {showSettings && (
          <CustomizePanel onClose={() => setShowSettings(false)} />
        )}
      </div>
    </>
  )
}
