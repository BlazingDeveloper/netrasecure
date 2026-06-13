const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const scanRoutes = require('./routes/scan');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/contact', contactRoutes);
app.use('/scan-url', scanRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'NetraSecure AI API running', version: '1.0.0' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global JSON error handler — prevents Express from sending HTML error pages
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

const server = app.listen(PORT, () => {
  console.log(`NetraSecure AI server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.\n   Run: lsof -ti:${PORT} | xargs kill -9\n   Then restart the server.\n`);
    process.exit(1);
  } else {
    throw err;
  }
});

module.exports = app;
