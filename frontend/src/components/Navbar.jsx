import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiUsers, FiLogOut, FiUser } from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">AstroTalk</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            <FiHome /> Home
          </Link>
          <Link to="/astrologers" className="navbar-link">
            <FiUsers /> Astrologers
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/bookings" className="navbar-link">
                My Bookings
              </Link>
              <div className="navbar-user">
                <span className="user-name">
                  <FiUser /> {user?.name}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
