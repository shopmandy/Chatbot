import { useState, useRef } from 'react';
import styles from "./chatbot.module.css";
import ReactMarkdown from 'react-markdown';

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

  const sendMessage = async () => {
    if (!input.trim() && !imagePreview) return;

    const newMessage: Message = { 
      role: 'user', 
      content: input,
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

  return (
    <div className={styles.chatContainer}>
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          disabled={loading}
        />
        
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={loading || (!input.trim() && !imagePreview)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
