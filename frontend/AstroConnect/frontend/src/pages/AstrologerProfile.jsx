import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FiStar, FiMessageCircle, FiClock, FiGlobe } from 'react-icons/fi'
import './AstrologerProfile.css'

const AstrologerProfile = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [astrologer, setAstrologer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAstrologer()
  }, [id])

  const fetchAstrologer = async () => {
    try {
      const response = await axios.get(`/api/astrologers/${id}`)
      setAstrologer(response.data.data)
    } catch (err) {
      setError('Failed to load astrologer profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChatClick = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate(`/chat/${id}`)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (error || !astrologer) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="alert alert-error">{error || 'Astrologer not found'}</div>
      </div>
    )
  }

  return (
    <div className="astrologer-profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-image-section">
            <img
              src={astrologer.profileImage}
              alt={astrologer.name}
              className="profile-image-large"
            />
            {astrologer.isAvailable && (
              <span className="availability-badge-large">Available Now</span>
            )}
          </div>

          <div className="profile-header-info">
            <h1 className="profile-name">{astrologer.name}</h1>
            <p className="profile-experience">
              <FiClock /> {astrologer.experience} years of experience
            </p>

            <div className="profile-rating-section">
              <div className="rating-display">
                <FiStar className="star-icon-large" />
                <span className="rating-value">{astrologer.rating.toFixed(1)}</span>
                <span className="rating-count-large">({astrologer.totalRatings} reviews)</span>
              </div>
            </div>

            <div className="profile-price-section">
              <span className="price-label-large">Consultation Rate:</span>
              <span className="price-value-large">${astrologer.pricePerMinute} per minute</span>
            </div>

            <button onClick={handleChatClick} className="btn btn-primary btn-large">
              <FiMessageCircle /> Start Chat
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-heading">About</h2>
            <p className="profile-description">{astrologer.description}</p>
          </div>

          <div className="profile-section">
            <h2 className="section-heading">Specializations</h2>
            <div className="specializations-list">
              {astrologer.specializations.map((spec, idx) => (
                <span key={idx} className="specialization-badge">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2 className="section-heading">Languages</h2>
            <div className="languages-list">
              {astrologer.languages.map((lang, idx) => (
                <span key={idx} className="language-badge">
                  <FiGlobe /> {lang}
                </span>
              ))}
            </div>
          </div>

          {astrologer.reviews && astrologer.reviews.length > 0 && (
            <div className="profile-section">
              <h2 className="section-heading">Reviews</h2>
              <div className="reviews-list">
                {astrologer.reviews.map((review) => (
                  <div key={review._id} className="review-card">
                    <div className="review-header">
                      <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="review-comment">{review.comment}</p>
                    )}
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AstrologerProfile
