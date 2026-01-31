import { useState } from 'react'
import './ChatInterface.css'

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread?: number
}

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  timestamp: string
}

function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')

  // Demo contacts
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unread: 2
    },
    {
      id: '2',
      name: 'Bob Smith',
      lastMessage: 'Thanks for the update!',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      lastMessage: 'See you tomorrow',
      timestamp: 'Monday',
    }
  ]

  // Demo messages
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hey, how are you doing?',
      sender: 'other',
      timestamp: '10:28 AM'
    },
    {
      id: '2',
      text: "I'm doing great! Thanks for asking.",
      sender: 'me',
      timestamp: '10:29 AM'
    },
    {
      id: '3',
      text: 'That\'s wonderful! Want to grab coffee later?',
      sender: 'other',
      timestamp: '10:30 AM'
    }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const selectedContactData = contacts.find(c => c.id === selectedContact)

  return (
    <div className="chat-interface">
      {/* Sidebar with contacts */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Signal</h2>
          <button className="compose-btn" title="New message">+</button>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        
        <div className="contacts-list">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={`contact-item ${selectedContact === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="avatar">
                {contact.avatar ? (
                  <img src={contact.avatar} alt={contact.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {contact.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="contact-info">
                <div className="contact-header">
                  <h3>{contact.name}</h3>
                  <span className="timestamp">{contact.timestamp}</span>
                </div>
                <div className="contact-preview">
                  <p>{contact.lastMessage}</p>
                  {contact.unread && (
                    <span className="unread-badge">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-area">
        {selectedContact ? (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="avatar-small">
                  {selectedContactData?.name.charAt(0)}
                </div>
                <div>
                  <h3>{selectedContactData?.name}</h3>
                  <p className="status">Last seen recently</p>
                </div>
              </div>
              <div className="chat-actions">
                <button title="Call">📞</button>
                <button title="Video call">📹</button>
                <button title="More options">⋮</button>
              </div>
            </div>

            <div className="messages-container">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className="message-input" onSubmit={handleSendMessage}>
              <button type="button" className="attach-btn" title="Attach file">
                📎
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit" className="send-btn" disabled={!messageText.trim()}>
                ➤
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="welcome-message">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="#E8F4FD"/>
                <path d="M60 30C43.4 30 30 43.4 30 60C30 64.2 31.2 68.1 33.2 71.4L30.6 81.6L41.1 79.1C44.3 80.9 47.9 81.9 51.7 81.9C54.3 89.5 61.6 95 70 95C80.5 95 89 86.5 89 76C89 65.5 80.5 57 70 57C69 57 68 57.1 67.1 57.3C66.2 45.4 56.3 36 44 36C43 36 42 36.1 41 36.2" stroke="#2090EA" strokeWidth="4" strokeLinecap="round"/>
              </svg>
              <h2>Signal Web Client</h2>
              <p>Select a conversation to start messaging</p>
              <p className="encryption-note">
                🔒 All messages are end-to-end encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatInterface
