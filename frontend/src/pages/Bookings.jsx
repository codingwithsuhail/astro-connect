import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiCalendar, FiClock, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import './Bookings.css'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings')
      setBookings(response.data.data)
    } catch (err) {
      setError('Failed to load bookings')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'var(--success)'
      case 'pending':
        return 'var(--warning)'
      case 'completed':
        return 'var(--purple-primary)'
      case 'cancelled':
        return 'var(--error)'
      default:
        return 'var(--text-muted)'
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="bookings-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">View and manage your consultation bookings</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <FiCalendar className="empty-icon" />
            <h2>No bookings yet</h2>
            <p>Start by booking a consultation with one of our astrologers</p>
            <button
              onClick={() => navigate('/astrologers')}
              className="btn btn-primary"
            >
              Browse Astrologers
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-astrologer">
                    <img
                      src={booking.astrologer?.profileImage || 'https://via.placeholder.com/60'}
                      alt={booking.astrologer?.name}
                      className="booking-astrologer-image"
                    />
                    <div>
                      <h3 className="booking-astrologer-name">
                        {booking.astrologer?.name || 'Unknown'}
                      </h3>
                      <span
                        className="booking-status"
                        style={{ color: getStatusColor(booking.status) }}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="booking-detail-item">
                    <FiCalendar className="detail-icon" />
                    <div>
                      <span className="detail-label">Booking Date</span>
                      <span className="detail-value">{formatDate(booking.bookingDate)}</span>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <FiClock className="detail-icon" />
                    <div>
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{booking.duration} minutes</span>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <FiDollarSign className="detail-icon" />
                    <div>
                      <span className="detail-label">Total Amount</span>
                      <span className="detail-value">${booking.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => navigate(`/chat/${booking.astrologer?._id}`)}
                    className="btn btn-primary btn-full"
                  >
                    Start Chat
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
