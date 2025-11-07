# Uber Clone - Full Stack Application

A real-time ride-hailing application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring live location tracking, ride matching, and real-time communication.

[![Watch the video](https://img.youtube.com/vi/z5ekJ0uDcgo/maxresdefault.jpg)](https://www.youtube.com/watch?v=z5ekJ0uDcgo)

## Features

- 🗺️ Real-time location tracking using Google Maps API
- 🔄 Live ride updates with Socket.IO
- 🔐 JWT Authentication for both users and drivers
- 📍 Dynamic fare calculation based on distance
- 🚗 Multiple vehicle types (Car, Auto, Motorcycle)
- 📱 Responsive design for all devices
- 🔍 Location autocomplete using Google Places API
- 🎯 Nearby driver matching within 2km radius
- 🔢 OTP verification for ride start
- 💳 Fare calculation based on distance and time

## Tech Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- GSAP for animations
- Socket.IO Client for real-time updates
- [@react-google-maps/api](Frontend/package.json) for maps integration
- React Router for navigation
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Google Maps API for geocoding and distance calculation
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Google Maps API key

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/uber-clone.git
```

2. Install Backend Dependencies
```
cd Backend
npm install
```

3. Install Frontend Dependencies
```
cd Frontend
npm install
```

4. Set up environment variables:

Backend (.env.local):
```
GOOGLE_MAPS_API=your_google_maps_api_key
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Frontend (.env.local):
```
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. Start the servers

Backend: 
```
npm start
```

Frontend:
```
npm run dev
```

## Application Flow

1. User Registration/Login
2. User enters pickup and destination locations
3. App calculates fare based on distance and vehicle type
4. User confirms ride request
5. Nearby drivers receive notification
6. Driver accepts ride
7. OTP generated for ride verification
8. Real-time tracking begins
9. Ride completion and payment

## API Documentation

Detailed API documentation can be found in the Backend README

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
