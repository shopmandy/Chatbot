import { useUser } from '@clerk/nextjs'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './chatbot.module.css'
import CustomizePanel from './components/CustomizePanel'
import ChatDropdown from './components/chatDropdown'

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

  const removePreview = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
    const savedTheme = JSON.parse(
      localStorage.getItem('chatTheme') || '{}'
    ) as Record<string, string>
    const defaultTheme = {
      '--button-bg': 'linear-gradient(90deg, #ffe0f2 0%, #ffd6f7 100%)',
      '--button-text': '#f91b8f',
      '--button-border': '#ff69b4',
      '--chat-border': '#f91b8f',
      '--user-bubble': '#f91b8f',
      '--chat-bubble': '#ffe0f2',
      '--chat-bg': 'linear-gradient(135deg, #ffe0f2 0%, #e0eaff 100%)',
      '--chat-text': '#f91b8f',
      '--chat-text-user': 'white',
    }

    const themeToApply = Object.keys(savedTheme).length
      ? savedTheme
      : defaultTheme

    for (const [key, value] of Object.entries(themeToApply)) {
      document.documentElement.style.setProperty(key, value)
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
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Tiny5&family=VT323&display=swap"
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
                Handy Mandy&apos;s DIY Chatbot
              </h2>
              <p className={styles.heroSubtitle}>
                Your 24/7 DIY Assistant 🤖✨ Get instant help with home
                projects, decor ideas, and DIY tips. Just ask Mandy anything!
              </p>
            </div>

            {/* Removed headerActions with Customize and Chats buttons */}
          </div>
        </header>
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
        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.chatContainer}>
            {/* Window Title Bar - Always visible */}
            <div className={styles.windowTitleBar}>
              <div className={styles.windowTitle}>CHAT WITH MANDY</div>
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
                <button
                  className={styles.customizeButton}
                  onClick={handleSaveChat}
                >
                  Save Chat{' '}
                  <span role="img" aria-label="floppy disk">
                    💾
                  </span>
                </button>
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
                  <div className="border-t-4 border-primary/30 pt-4">
                    <h3 className="text-center text-pink-600 font-bold text-xl mb-4">
                      Try these popular questions:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {questionsToShow.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(question)}
                          className="text-lg p-4 border-2 border-pink-400 rounded-2xl text-pink-600 hover:bg-pink-50 transition-colors text-left"
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
                <button
                  className={styles.uploadButton}
                  onClick={triggerFileInput}
                  disabled={loading}
                  title="Upload image"
                >
                  📷
                </button>

                <input
                  className={styles.inputBox}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about DIY home projects..."
                  disabled={loading}
                />

                <button
                  className={styles.sendButton}
                  onClick={() => sendMessage()}
                  disabled={loading || (!input.trim() && !imagePreview)}
                >
                  Send
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
