import React from 'react';

interface ChatDropdownProps {
  onClose: () => void;
}

const ChatDropdown: React.FC<ChatDropdownProps> = ({ onClose }) => {
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
      }}
    >
      <p style={{ fontWeight: 'bold', color: 'var(--chat-text)' }}>Previous Chats</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '0.5rem 0', cursor: 'pointer' }}>Living Room Shelf</li>
        <li style={{ padding: '0.5rem 0', cursor: 'pointer' }}>Wallpaper Tips</li>
        <li style={{ padding: '0.5rem 0', cursor: 'pointer' }}>Paint Matching</li>
      </ul>
    </div>
  );
};

export default ChatDropdown;