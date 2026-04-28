const express = require('express');
const router = express.Router();
require('dotenv').config({ override: true });

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are a friendly community assistant helping people find local resources 
        in Elizabeth, NJ. You help people find food assistance, healthcare, and housing. 
        Always use very simple, plain language. Avoid jargon. Be warm and encouraging. 
        Keep responses short and easy to read. If someone needs urgent help, always 
        mention they can call 211 for immediate assistance.`,
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API error');
    }

    const reply = data.content[0].text;
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Chat error' });
  }
});

module.exports = router;