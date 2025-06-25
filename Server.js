require('dotenv').config();
const express = require('express');
const database = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // ✅ Auth routes
const sessionRoutes = require('./routes/sessionRoutes'); // ✅ Session routes
const errorHandler = require('./middleware/errorHandler'); // Error middleware

const app = express();
const PORT = process.env.PORT || 5000;

database(); // Connect to DB

app.use(express.json()); // Parse JSON

app.use('/api/auth', authRoutes);     // ✅ No auth middleware inside
app.use('/api/sessions', sessionRoutes); // ✅ Has auth middleware inside

app.use(errorHandler); // Global error handler

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
