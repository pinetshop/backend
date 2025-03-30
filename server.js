require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'] // Allow your frontend
}));
app.use(express.json());

// Secure Telegram endpoint
app.post('/api/send-to-telegram', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Telegram error:', error.response?.data);
    res.status(500).json({ success: false });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
