const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Connect to the database
connectDB();

app.use(express.json());
app.use(morgan("dev"));

const allowedOriginPattern = new RegExp(process.env.ORIGIN_PATTERN);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOriginPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  enablePreflight: true
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Placeholder route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/user', require('./routes/usersRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
