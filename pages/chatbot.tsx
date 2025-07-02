import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from "./chatbot.module.css";
import ReactMarkdown from 'react-markdown';
import Head from 'next/head'
import CustomizePanel from './components/CustomizePanel';
import { redis } from '@/lib/redis';

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  imageUrl?: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[] | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendMessage = async (customInput?: string) => {
    const userInput = customInput ?? input;
    if (!userInput.trim() && !imagePreview) return;

    // Hide hero section when user starts chatting
    if (showHero) {
      setShowHero(false);
    }

    const newMessage: Message = { 
      role: 'user', 
      content: userInput,
      ...(imagePreview && { imageUrl: imagePreview })
    };

    const newMessages: Message[] = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');
    setImagePreview(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('messages', JSON.stringify(newMessages));
      
      if (fileInputRef.current?.files?.[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (!data.response?.content) {
        throw new Error('Invalid response from server');
      }

      setMessages([...newMessages, {
        role: 'assistant',
        content: data.response.content
      }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Error: Failed to get response' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const [showSettings, setShowSettings] = useState(false);

  //default colors
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('chatTheme') || '{}') as Record<string, string>;
    const defaultTheme = {
      '--button-bg': 'linear-gradient(90deg, #ffe0f2 0%, #ffd6f7 100%)',
      '--button-text': '#f91b8f',
      '--button-border': '#ff69b4',
      '--chat-border': '#f91b8f',
      '--user-bubble': '#f91b8f',
      '--chat-bubble': '#ffe0f2',
      '--chat-bg': 'linear-gradient(135deg, #ffe0f2 0%, #e0eaff 100%)',
      '--chat-text': '#f91b8f',
      '--chat-text-user': 'white'
    };
  
    const themeToApply = Object.keys(savedTheme).length ? savedTheme : defaultTheme;
  
    for (const [key, value] of Object.entries(themeToApply)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);
  
  useEffect(() => {
    fetch('/api/get-trending-topics').then((res) => res.json()).then((data) => {
      if (Array.isArray(data.questions)) {
        setTrendingTopics(data.questions);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch trending topics.");
    });
  }, []);
  // Common questions for chatbot presets
  const commonQuestions = [
    "How do I paint a room?",
    "What's a quick DIY decor project for my bedroom?",
    "How to hang wallpaper",
    "How do I fix a hole in drywall?"
  ];
  const questionsToShow = trendingTopics === null ? [] : trendingTopics.length > 0 ? trendingTopics : commonQuestions;


  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.pageContainer}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🔧</span>
              <h1 className={styles.logoText}>Handy Mandy</h1>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.customizeButton}
                onClick={() => setShowSettings(true)}
              >
                Customize <span role="img" aria-label="wrench">⚙️</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.chatContainer}>
            {/* Hero Section */}
            {showHero && (
              <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTitle}>Your DIY Assistant</h2>
                  <p className={styles.heroSubtitle}>
                    Get instant help with home projects, decor ideas, and DIY tips. 
                    Just ask Mandy anything!
                  </p>
                  <div className={styles.heroFeatures}>
                    <div className={styles.feature}>
                      <span className={styles.featureIcon}>🎨</span>
                      <span>Decor & Design</span>
                    </div>
                    <div className={styles.feature}>
                      <span className={styles.featureIcon}>🔨</span>
                      <span>DIY Projects</span>
                    </div>
                    <div className={styles.feature}>
                      <span className={styles.featureIcon}>🏠</span>
                      <span>Home Improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className={styles.chatInterface}>
              <div className={styles.chatBox} ref={chatBoxRef}>
                {messages.map((msg, idx) => {
                  // If this is a user message and the next message is assistant, group them
                  if (msg.role === 'user' && messages[idx + 1]?.role === 'assistant') {
                    return (
                      <div key={idx} className={styles.chatMessageGroup}>
                        <div className={styles.questionBubble}>
                          <h2>{msg.content}</h2>
                        </div>
                        <div className={styles.bubble}>
                          <ReactMarkdown>{messages[idx + 1].content}</ReactMarkdown>
                        </div>
                      </div>
                    );
                  }
                  // If this is an assistant message that was not paired, skip (already rendered)
                  if (msg.role === 'assistant' && idx > 0 && messages[idx - 1]?.role === 'user') {
                    return null;
                  }
                  // Otherwise, render as normal (for system or unpaired messages)
                  if (msg.role === 'user') {
                    return (
                      <div key={idx} className={styles.questionBubble}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className={styles.bubble}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  );
                })}
                {loading && (
                  <div className={styles.loadingBubble}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>Mandy is thinking...</span>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className={styles.previewContainer}>
                  <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                  <button className={styles.removePreview} onClick={removePreview}>
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
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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

            {/* Quick Start Questions */}
            {showHero && (
              <div className={styles.quickStartSection}>
                <h3 className={styles.quickStartTitle}>Try these popular questions:</h3>
                <div className={styles.questionButtonContainer}>
                  {questionsToShow.map((question, idx) => (
                    <button key = {idx} onClick={() => sendMessage(question)}
                    className={styles.questionButton}>
                    {question}
                  </button>
                 ))} </div>
              </div>
            )}
          </div>
        </main>

        {/* Settings Panel */}
        {showSettings && <CustomizePanel onClose={() => setShowSettings(false)} />}
      </div>
    </>
  );
}
