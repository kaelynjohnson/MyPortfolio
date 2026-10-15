// config.js - central settings for the server: port, database address, and JWT secret
const config = {
  port: process.env.PORT || 3000,
  // Address of the Portfolio database on the local MongoDB server
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/Portfolio',
  // Secret key used later to sign login tokens (Step 7)
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret_key',
};

export default config;