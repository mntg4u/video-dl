import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownload = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    setShowVideo(false);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/download?url=${encodeURIComponent(url)}`, {
        responseType: 'blob',
      });

      const blob = response.data;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'video.mp4';
      link.click();
      setSuccessMessage('Video download started!');
    } catch (err) {
      setError('Failed to download video. Please try again.');
    }

    setLoading(false);
  };

  const handleWatchVideo = () => {
    setShowVideo(true);
    setVideoUrl(url);
  };

  return (
    <div className="App">
      <h1>Video Downloader</h1>
      <div className="input-container">
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter YouTube video URL"
          className="input-box"
        />
        <button className="btn" onClick={handleDownload} disabled={loading}>
          {loading ? 'Downloading...' : 'Download Video'}
        </button>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button className="btn" onClick={handleWatchVideo}>
          Watch Video
        </button>
      </div>

      {showVideo && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
