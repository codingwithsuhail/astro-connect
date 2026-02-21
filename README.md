# AstroTalk - Real-time Astrology Consultation Platform

A full-stack real-time astrology consultation web application built with React.js, Node.js, Express, MongoDB, and Socket.io.

## Features

- 🔐 **Authentication System** - User registration and login with JWT-based authentication
- 👥 **Astrologer Listing** - Browse verified astrologers with profiles, ratings, and pricing
- 📱 **Astrologer Profiles** - Detailed profiles with specializations, languages, and reviews
- 💬 **Real-Time Chat** - One-to-one private chat using Socket.io
- 📅 **Booking System** - Book consultation sessions with astrologers
- 🎨 **Premium Dark Theme** - Modern UI with purple gradient highlights
- 📱 **Fully Responsive** - Works seamlessly on mobile and desktop

## Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Socket.io Client
- Axios
- React Icons
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- JWT (JSON Web Tokens)
- Bcryptjs
- Express Validator

## Project Structure

```
astrotalk-web-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── astrologerController.js
│   │   ├── bookingController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── socketAuth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Astrologer.js
│   │   ├── Booking.js
│   │   ├── Message.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── astrologers.js
│   │   ├── bookings.js
│   │   └── messages.js
│   ├── socket/
│   │   └── chatHandler.js
│   ├── scripts/
│   │   └── seedAstrologers.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Astrologers.jsx
│   │   │   ├── AstrologerProfile.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── Bookings.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/astrotalk
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Make sure MongoDB is running on your system.

6. Seed the database with sample astrologers (optional):
```bash
node scripts/seedAstrologers.js
```

7. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Astrologers
- `GET /api/astrologers` - Get all astrologers
- `GET /api/astrologers/:id` - Get astrologer by ID
- `POST /api/astrologers` - Create astrologer (admin)

### Bookings
- `POST /api/bookings` - Create a booking (protected)
- `GET /api/bookings` - Get user bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)

### Messages
- `GET /api/messages/chat/:astrologerId` - Get chat history (protected)
- `GET /api/messages/rooms` - Get user chat rooms (protected)

## Socket.io Events

### Client to Server
- `join_chat` - Join a chat room with astrologer
- `send_message` - Send a message to astrologer
- `mark_read` - Mark messages as read

### Server to Client
- `receive_message` - Receive a new message
- `new_message_notification` - Notification for new message
- `error` - Error event

## Usage

1. **Register/Login**: Create an account or login to access the platform
2. **Browse Astrologers**: View the list of available astrologers
3. **View Profile**: Click on an astrologer to see their detailed profile
4. **Start Chat**: Click "Chat Now" to start a real-time conversation
5. **Book Session**: Book a consultation session with an astrologer
6. **View Bookings**: Check your booking history in the "My Bookings" section

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Database Models

### User
- name, email, password, phone, dateOfBirth

### Astrologer
- name, email, profileImage, experience, rating, totalRatings, pricePerMinute, description, specializations, languages, isAvailable

### Booking
- user, astrologer, bookingDate, duration, totalAmount, status

### Message
- chatRoom, sender, senderModel, receiver, receiverModel, message, read, createdAt

### Review
- astrologer, user, rating, comment, createdAt

## Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes and API endpoints
- CORS configuration
- Input validation with express-validator
- Socket.io authentication middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@astrotalk.com or create an issue in the repository.

## Acknowledgments

- Built with modern web technologies
- Designed for scalability and production use
- Follows best practices for security and performance
