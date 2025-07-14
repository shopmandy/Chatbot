import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut } from "@clerk/nextjs";

type ChatSummary = {
  id: string;
  title: string;
};

type ChatDropdownProps = {
  onClose: () => void;
};

const ChatDropdown: React.FC<ChatDropdownProps> = ({ onClose }) => {
  const [chats, setChats] = useState<ChatSummary[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch('/api/get-chats');
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats);
      }
    };

    fetchChats();
  }, []);

  return (
    <div 
      onClick={onClose}
      style={{
    position: 'fixed',
    top: '70px',
    right: '20px',
    background: 'white',
    border: '2px solid var(--chat-border)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    padding: '1rem',
    zIndex: 1000,
    minWidth: '200px',
    maxHeight: '300px',      
    overflowY: 'auto',       
      }}
    >
      <SignedOut>
        <p style={{ fontWeight: 'bold', color: 'var(--chat-text)' }}>
          Sign In to See Saved Chats
        </p>
      </SignedOut>

      <SignedIn>
        <p style={{ fontWeight: 'bold', color: 'var(--chat-text)' }}>Previous Chats</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {chats.map((chat) => (
            <li key={chat.id} style={{ padding: '0.5rem 0', cursor: 'pointer' }}>
              {chat.title}
            </li>
          ))}
        </ul>
      </SignedIn>
    </div>
  );
};

export default ChatDropdown;