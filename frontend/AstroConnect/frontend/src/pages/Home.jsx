import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiStar, FiMessageCircle, FiClock, FiShield } from 'react-icons/fi'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Connect with Expert <span className="gradient-text">Astrologers</span>
          </h1>
          <p className="hero-subtitle">
            Get personalized guidance from verified astrologers through real-time chat.
            Discover your destiny and find answers to life's questions.
          </p>
          {!isAuthenticated && (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/astrologers" className="btn btn-outline btn-large">
                Browse Astrologers
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="hero-actions">
              <Link to="/astrologers" className="btn btn-primary btn-large">
                Find Your Astrologer
              </Link>
            </div>
          )}
        </div>
        <div className="hero-image">
          <div className="gradient-orb"></div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose AstroTalk?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiStar />
              </div>
              <h3>Verified Experts</h3>
              <p>All our astrologers are verified professionals with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiMessageCircle />
              </div>
              <h3>Real-Time Chat</h3>
              <p>Instant communication with your astrologer through secure chat</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiClock />
              </div>
              <h3>24/7 Availability</h3>
              <p>Connect with astrologers anytime, anywhere at your convenience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Secure & Private</h3>
              <p>Your conversations are encrypted and completely confidential</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
