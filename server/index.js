const express = require('express');
const app = express();
const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Simulating the download process for a video.
  // This can be extended with actual logic like using youtube-dl or other libraries.
  try {
    const videoDownloadUrl = `https://www.youtube.com/watch?v=${url.split('v=')[1]}`; // Example URL logic

    // Simulate downloading a video by returning the URL.
    res.json({ videoUrl: videoDownloadUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to download video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
