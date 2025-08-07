interface WindowControlsProps {
  onMinimize?: () => void
  title?: string
  icon?: React.ComponentType<{ style?: React.CSSProperties }>
}

export default function WindowControls({ onMinimize, title, icon: Icon }: WindowControlsProps) {
  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontWeight: '700' as const,
    letterSpacing: '2px',
    textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
  }

  const controlsStyle = {
    display: 'flex',
    gap: '8px'
  }

  const buttonStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #f91b8f',
    background: 'transparent',
    color: '#f91b8f',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease'
  }

  return (
    <>
      <div style={titleStyle}>
        {Icon && <Icon style={{ width: 20, height: 20, color: '#f91b8f' }} />}
        {title}
      </div>
      <div style={controlsStyle}>
        <button 
          style={buttonStyle}
          title="Minimize"
          onClick={onMinimize}
          onMouseEnter={(e) => {
            e.currentTarget.style.scale = '1.1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.scale = '1'
          }}
        >
          ─
        </button>
        <button 
          style={buttonStyle}
          title="Maximize"
          onMouseEnter={(e) => {
            e.currentTarget.style.scale = '1.1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.scale = '1'
          }}
        >
          □
        </button>
        <button 
          style={buttonStyle}
          title="Close"
          onMouseEnter={(e) => {
            e.currentTarget.style.scale = '1.1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.scale = '1'
          }}
        >
          ×
        </button>
      </div>
    </>
  )
}