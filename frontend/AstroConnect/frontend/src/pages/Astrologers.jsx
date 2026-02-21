import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiStar, FiMessageCircle } from 'react-icons/fi'
import './Astrologers.css'

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAstrologers()
  }, [])

  const fetchAstrologers = async () => {
    try {
      const response = await axios.get('/api/astrologers')
      setAstrologers(response.data.data)
    } catch (err) {
      setError('Failed to load astrologers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="alert alert-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="astrologers-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our Expert Astrologers</h1>
          <p className="page-subtitle">Choose from our verified astrologers and start your consultation</p>
        </div>

        <div className="astrologers-grid">
          {astrologers.map((astrologer) => (
            <div key={astrologer._id} className="astrologer-card">
              <div className="astrologer-image-container">
                <img
                  src={astrologer.profileImage}
                  alt={astrologer.name}
                  className="astrologer-image"
                />
                {astrologer.isAvailable && (
                  <span className="availability-badge">Available</span>
                )}
              </div>

              <div className="astrologer-info">
                <h3 className="astrologer-name">{astrologer.name}</h3>
                <p className="astrologer-experience">{astrologer.experience} years experience</p>

                <div className="astrologer-rating">
                  <FiStar className="star-icon" />
                  <span>{astrologer.rating.toFixed(1)}</span>
                  <span className="rating-count">({astrologer.totalRatings})</span>
                </div>

                <div className="astrologer-specializations">
                  {astrologer.specializations.slice(0, 2).map((spec, idx) => (
                    <span key={idx} className="specialization-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="astrologer-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">${astrologer.pricePerMinute}/min</span>
                </div>

                <div className="astrologer-actions">
                  <Link
                    to={`/astrologer/${astrologer._id}`}
                    className="btn btn-secondary btn-full"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/chat/${astrologer._id}`}
                    className="btn btn-primary btn-full"
                  >
                    <FiMessageCircle /> Chat Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Astrologers
