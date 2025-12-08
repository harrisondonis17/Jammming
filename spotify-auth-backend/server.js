require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// Step 1: Redirect user to Spotify authorization
app.get('/login', (req, res) => {
  const scope = 'playlist-modify-public';
  const authUrl = 
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    `&client_id=${client_id}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  res.redirect(authUrl);
});

// Step 2: Handle callback and exchange code for access token
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) {
    return res.send('No code found in callback.');
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    // Send the access token (and refresh token) to the frontend
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
