import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from "./chatbot.module.css";
import ReactMarkdown from 'react-markdown';
import Head from 'next/head'
import CustomizePanel from './components/CustomizePanel';


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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  //TODO add customizer here
  const [showSettings, setShowSettings] = useState(false);

  //default colors
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('chatTheme') || '{}') as Record<string, string>;
    const defaultTheme = {
      '--button-bg': '#ffe0f2',
      '--button-text': '#f91b8f',
      '--button-border': '#f91b8f',
      '--chat-border': '#f91b8f',
      '--user-bubble': '#f91b8f',
      '--chat-bubble': '#ffe0f2',
      '--chat-bg': 'white',
      '--chat-text': '#f91b8f',
      '--chat-text-user': 'white'
    };
  
    const themeToApply = Object.keys(savedTheme).length ? savedTheme : defaultTheme;
  
    for (const [key, value] of Object.entries(themeToApply)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);
  
  // Common questions for chatbot presets
  const commonQuestions = [
    "How do I paint a room?",
    "What's a quick DIY decor project for my bedroom?",
    "How to hang wallpaper",
    "How do I fix a hole in drywall?"
  ];

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <div className="toolbot-page" style={{
        background: 'linear-gradient(135deg, #e0eaff 0%, #f8e1ff 100%)',
        border: '4px solid #b6b6ff',
        borderRadius: '18px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 4px #b6b6ff, 0 0 16px #00ffe7',
        fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
        minHeight: '100vh',
        paddingBottom: '2rem',
      }}>
        <div className="toolbot-heading">
          <h1 className={styles.header}>ASK HANDY MANDY</h1>
          <p className={styles.subheader}>Our Mandy Toolbot can tackle any DIY, decor, or life Qs you throw its way.</p>
        </div>
        <div className={styles.chatContainer}>
          <button
            className={styles.customizeButton}
            onClick={() => setShowSettings(true)}
            style={{
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Customize <span role="img" aria-label="wrench">🔧</span>
          </button>
          {showSettings && <CustomizePanel onClose={() => setShowSettings(false)} />}
        
          <div className={styles.chatBox} style={{display: 'flex', flexDirection: 'column'}}>
            {messages.map((msg, idx) => {
              // If this is a user message and the next message is assistant, group them
              if (msg.role === 'user' && messages[idx + 1]?.role === 'assistant') {
                return (
                  <div key={idx} className={styles.chatMessageGroup} style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                    <div className={styles.questionBubble} style={{alignSelf: 'flex-end', textAlign: 'right'}}>
                      <h2 style={{margin:0, fontWeight:900, fontSize:'1.3rem'}}>{msg.content}</h2>
                    </div>
                    <div className={styles.bubble} style={{alignSelf: 'flex-start', textAlign: 'left'}}>
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
                  <div key={idx} className={styles.questionBubble} style={{alignSelf: 'flex-end', textAlign: 'right'}}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                );
              }
              return (
                <div key={idx} className={styles.bubble} style={{alignSelf: 'flex-start', textAlign: 'left'}}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              );
            })}
            {loading && <div className={styles.bubble}><span>Mandy is thinking...</span></div>}
          </div>

          {imagePreview && (
            <div className={styles.previewContainer}>
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              <button className={styles.removePreview} onClick={removePreview}>
                Remove
              </button>
            </div>
          )}

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
            >
              📷
            </button>
            
            <input
              className={styles.inputBox}
              value={input}
              style={{ fontFamily:'Tiny5, sans-serif'}}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about DIY home projects..."
              disabled={loading}
            />
            
            <button
              className={styles.sendButton}
              style={{ fontFamily:'Tiny5, sans-serif'}}
              onClick={() => sendMessage()}
              disabled={loading || (!input.trim() && !imagePreview)}
            >
              Send
            </button>
          </div>
        </div>
        <p className={styles.commonQsHeader}>TRY OUT SOME COMMON Qs:</p>
        <div className={styles.questionButtonContainer}>
          {commonQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(question)}
              className={styles.questionButton}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
