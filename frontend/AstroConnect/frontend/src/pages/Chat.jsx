import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSocket } from '../context/SocketContext'
import { useAuth } from '../context/AuthContext'
import { FiSend, FiArrowLeft } from 'react-icons/fi'
import './Chat.css'

const Chat = () => {
  const { astrologerId } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()
  const { user } = useAuth()
  const [astrologer, setAstrologer] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    fetchAstrologer()
    fetchChatHistory()
  }, [astrologerId])

  useEffect(() => {
    if (socket && astrologerId) {
      socket.emit('join_chat', { astrologerId })

      socket.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message])
      })

      socket.on('error', (error) => {
        console.error('Socket error:', error)
      })

      return () => {
        socket.off('receive_message')
        socket.off('error')
      }
    }
  }, [socket, astrologerId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchAstrologer = async () => {
    try {
      const response = await axios.get(`/api/astrologers/${astrologerId}`)
      setAstrologer(response.data.data)
    } catch (error) {
      console.error('Error fetching astrologer:', error)
    }
  }

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`/api/messages/chat/${astrologerId}`)
      setMessages(response.data.data)
    } catch (error) {
      console.error('Error fetching chat history:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket) return

    socket.emit('send_message', {
      message: newMessage.trim(),
      astrologerId
    })

    setNewMessage('')
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <FiArrowLeft /> Back
          </button>
          {astrologer && (
            <div className="chat-header-info">
              <img
                src={astrologer.profileImage}
                alt={astrologer.name}
                className="chat-header-avatar"
              />
              <div>
                <h3 className="chat-header-name">{astrologer.name}</h3>
                <span className="chat-header-status">
                  {astrologer.isAvailable ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-messages" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const senderId = typeof message.sender === 'object' ? message.sender._id : message.sender
              const isOwnMessage = senderId === user.id || senderId?.toString() === user.id?.toString()
              return (
                <div
                  key={message._id}
                  className={`message ${isOwnMessage ? 'message-own' : 'message-other'}`}
                >
                  <div className="message-content">
                    <p className="message-text">{message.message}</p>
                    <span className="message-time">{formatTime(message.createdAt)}</span>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            disabled={!socket}
          />
          <button
            type="submit"
            className="chat-send-button"
            disabled={!newMessage.trim() || !socket}
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
