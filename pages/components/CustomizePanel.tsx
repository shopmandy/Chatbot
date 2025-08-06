import React from 'react'

const themes = {
  mandy: {
    '--button-bg': 'linear-gradient(90deg, #ffe0f2 0%, #ffd6f7 100%)',
    '--button-text': '#f91b8f',
    '--button-border': '#ff69b4',
    '--chat-border': '#f91b8f',
    '--user-bubble': '#f91b8f',
    '--chat-bubble': '#ffe0f2',
    '--chat-bg': 'linear-gradient(135deg, #ffe0f2 0%, #e0eaff 100%)',
    '--chat-text': '#f91b8f',
    '--chat-text-user': 'white',
  },

  sparkle: {
    '--button-bg': 'linear-gradient(90deg, #ffdcae 0%, #ffe0f2 100%)',
    '--button-text': '#f91b8f',
    '--button-border': '#f91b8f',
    '--chat-border': '#f91b8f',
    '--user-bubble': '#ffdcae',
    '--chat-bubble': '#ffe0f2',
    '--chat-bg': 'linear-gradient(135deg, #ffdcae 0%, #ffe0f2 100%)',
    '--chat-text': '#f91b8f',
    '--chat-text-user': '#f91b8f',
  },

  dream: {
    '--button-bg': 'linear-gradient(90deg, #cabcf7 0%, #e0eaff 100%)',
    '--button-text': '#f91b8f',
    '--button-border': '#f91b8f',
    '--chat-border': '#cabcf7',
    '--user-bubble': '#cabcf7',
    '--chat-bubble': '#ffe0f2',
    '--chat-bg': 'linear-gradient(135deg, #cabcf7 0%, #e0eaff 100%)',
    '--chat-text': '#f91b8f',
    '--chat-text-user': '#f91b8f',
  },

  sky: {
    '--button-bg': 'linear-gradient(90deg, #5baefc 0%, #b6eaff 100%)',
    '--button-text': '#1d37f5',
    '--button-border': '#1d37f5',
    '--chat-border': '#5baefc',
    '--user-bubble': '#1d37f5',
    '--chat-bubble': '#5baefc',
    '--chat-bg': 'linear-gradient(135deg, #5baefc 0%, #b6eaff 100%)',
    '--chat-text': '#1d37f5',
    '--chat-text-user': 'white',
  },
}

const applyTheme = (theme: Record<string, string>) => {
  console.log('Applying theme:', theme)
  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, value)
    console.log(`Set ${key} = ${value}`)
  }
  localStorage.setItem('chatTheme', JSON.stringify(theme))
  console.log('Theme saved to localStorage')
}

interface CustomizePanelProps {
  onClose: () => void
}

const CustomizePanel: React.FC<CustomizePanelProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          position: 'relative',
          padding: '2rem',
          border: '3px solid #f91b8f',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          zIndex: 1001,
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3
          style={{
            color: '#f91b8f',
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Choose a Theme!
        </h3>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            cursor: 'pointer',
            padding: '8px 12px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#f91b8f',
            fontWeight: 'bold',
          }}
        >
          ✕
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {Object.entries(themes).map(([name, theme]) => (
            <button
              key={name}
              style={{
                background: theme['--button-bg'],
                color: theme['--chat-text'],
                margin: '0.5rem',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: `2px solid ${theme['--button-border']}`,
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              onClick={() => {
                applyTheme(theme)
                onClose()
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomizePanel
