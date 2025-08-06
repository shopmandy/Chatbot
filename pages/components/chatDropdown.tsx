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
      style={{
        position: 'fixed',
        top: '160px', // further down
        right: '80px', // further left
        background: 'white',
        border: '2px solid var(--chat-border)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: '0.5em 1em 0.5em 1em',
        zIndex: 1000,
        minWidth: '180px',
        maxWidth: '240px',
        maxHeight: '220px',
        overflowY: 'auto',
      }}
    >
      <SignedOut>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5em',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              color: 'var(--chat-text)',
              fontSize: '1em',
              whiteSpace: 'nowrap',
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
              marginLeft: '0.5em',
              padding: 0,
            }}
            aria-label="Close sign in popup"
          >
            ×
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <p style={{ fontWeight: 'bold', color: 'var(--chat-text)' }}>
          Previous Chats
        </p>
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
