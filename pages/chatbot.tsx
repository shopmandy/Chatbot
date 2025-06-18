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
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet"></link>
      </Head>
      <div className="toolbot-page" style=
        {{ background: 'url("/chatbot-background.png") no-repeat center/cover',
          border: '4px solid #0078d7',
          borderRadius: '12px',
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
              fontFamily: 'Tiny5, sans-serif'
            }}
          >
            Customize⚙️
          </button>
          {showSettings && <CustomizePanel onClose={() => setShowSettings(false)} />}
        
          <div className={styles.chatBox}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
                <div className={styles.mediaContainer}>
                  {msg.imageUrl && (
                    <img 
                      src={msg.imageUrl} 
                      alt="User uploaded" 
                      className={styles.imageBubble}
                    />
                  )}
                  {msg.content && (
                    <div className={styles.bubble}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className={styles.message}><span className={styles.bubble}>Mandy is thinking...</span></div>}
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
        <p style={{ 
          textAlign: 'center', 
          fontWeight: '800', 
          color: '#FFDCAE', 
          fontSize: '1.8rem', 
          WebkitTextStroke: '1px #f91b8f', 
          fontStyle: 'italic'}}> TRY OUT SOME COMMON Qs:</p>
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
