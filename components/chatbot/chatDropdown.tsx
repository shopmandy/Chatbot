import { SignedIn, SignedOut } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

type ChatSummary = {
  id: string
  title: string
}

type ChatDropdownProps = {
  onClose: () => void
  mode?: 'default' | 'save'
  onChatSelect?: (chatId: string) => void
}

const ChatDropdown: React.FC<ChatDropdownProps> = ({
  onClose,
  mode = 'default',
  onChatSelect,
}) => {
  const [chats, setChats] = useState<ChatSummary[]>([])

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch('/api/get-chats')
      if (res.ok) {
        const data = await res.json()
        setChats(data.chats)
      }
    }

    fetchChats()
  }, [])

  return (
    <div
      onClick={onClose}
      className="chat-dropdown"
      style={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        right: '0',
        background: 'white',
        border: '2px solid var(--chat-border)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: '0.5em 1em 0.5em 1em',
        zIndex: 1000,
        minWidth: '200px',
        maxWidth: '280px',
        maxHeight: '220px',
        overflowY: 'auto',
      }}
    >
      <SignedOut>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            textAlign: 'center',
            paddingRight: '2em',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              color: 'var(--chat-text)',
              fontSize: '0.6em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {mode === 'save'
              ? 'Sign In to Save Chat'
              : 'Sign In to See Saved Chats'}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--chat-text)',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: 'pointer',
              lineHeight: 1,
              position: 'absolute',
              right: '0.5em',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: 0,
              zIndex: 1,
            }}
            aria-label="Close sign in popup"
          >
            ×
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5em',
            marginBottom: '0.5em',
          }}
        >
          <p style={{ fontWeight: 'bold', color: 'var(--chat-text)', margin: 0 }}>
            Previous Chats
          </p>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--chat-text)',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: 'pointer',
              lineHeight: 1,
              padding: 0,
            }}
            aria-label="Close previous chats popup"
          >
            ×
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {chats.map(chat => (
            <li
              key={chat.id}
              style={{ padding: '0.5rem 0', cursor: 'pointer' }}
              onClick={() => {
                if (onChatSelect) onChatSelect(chat.id)
                onClose()
              }}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </SignedIn>
    </div>
  )
}

export default ChatDropdown