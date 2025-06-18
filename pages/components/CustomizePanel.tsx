import React from 'react';

const themes = {
    mandy: {
        '--button-bg': '#ffe0f2',
        '--button-text': '#f91b8f',
        '--button-border': '#f91b8f',
        '--chat-border': '#f91b8f',
        '--user-bubble': '#f91b8f',
        '--chat-bubble': '#ffe0f2',
        '--chat-bg': 'white',
        '--chat-text': '#f91b8f',
        '--chat-text-user': 'white'
    },

    sparkle: {
        '--button-bg': '#ffdcae',
        '--button-text': '#f91b8f',
        '--button-border': '#f91b8f',
        '--chat-border': '#f91b8f',
        '--user-bubble': '#ffdcae',
        '--chat-bubble': '#ffe0f2',
        '--chat-bg': 'white',
        '--chat-text': '#f91b8f',
        '--chat-text-user': '#f91b8f'
    },

    dream: {
        '--button-bg': '#cabcf7',
        '--button-text': '#f91b8f',
        '--button-border': '#f91b8f',
        '--chat-border': '#cabcf7',
        '--user-bubble': '#cabcf7',
        '--chat-bubble': '#ffe0f2',
        '--chat-bg': 'white',
        '--chat-text': '#f91b8f',
        '--chat-text-user': '#f91b8f'
    },

    sky: {
        '--button-bg': '#5baefc',
        '--button-text': '#1d37f5',
        '--button-border': '#1d37f5',
        '--chat-border': '#5baefc',
        '--user-bubble': '#1d37f5',
        '--chat-bubble': '#5baefc',
        '--chat-bg': 'white',
        '--chat-text': '#1d37f5',
        '--chat-text-user': 'white'
    }
};

const applyTheme = (theme: Record<string, string>) => {
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    localStorage.setItem('chatTheme', JSON.stringify(theme));
  };
  
  interface CustomizePanelProps {
    onClose: () => void;
  }
  
  const CustomizePanel: React.FC<CustomizePanelProps> = ({ onClose }) => {


    return (
      <div className="customize-panel"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div
          style={{
            background: 'white',
            position: 'relative',
            padding: '1.5rem',
            border: '2px solid #f91b8f',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2'
          }}>
          <h3
              style={{
                  color: '#f91b8f',
                  marginBottom: 8
              }}>Choose a Theme!</h3>
          <button onClick={onClose} style={{ 
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            padding: '4px 8px',
            }}
            >✕</button>
          <div className="theme-options"
            style={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            {Object.entries(themes).map(([name, theme]) => (
              <button
                key={name}
                className="theme-button"
                style={{
                  background: theme['--button-bg'],
                  color: theme['--chat-text'],
                  margin: 8,
                  padding: '6px 12px',
                  borderRadius: 12,
                  border: '2px solid #f91b8f',
                  cursor: 'pointer',
                }}
                onClick={() => applyTheme(theme)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        
      </div>
    );
  };

  export default CustomizePanel;