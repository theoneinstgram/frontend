import React, { useState } from 'react';

const InstagramDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');

    // Make sure URL is valid
    if (!url) {
      setError('Please provide a valid Instagram URL.');
      setLoading(false);
      return;
    }

    try {
      // Assuming FastDL provides an API endpoint (you'll need to replace with actual)
      const response = await fetch('https://backend-wkmi.onrender.com/fastdl-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMedia(data.media);  // Assuming the response returns media URLs
      } else {
        setError(data.error || 'Failed to fetch media.');
      }
    } catch (err) {
      setError('Error occurred while processing the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Instagram Media Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Instagram URL"
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {media.length > 0 && (
        <div>
          <h2>Downloaded Media</h2>
          {media.map((item, index) => (
            <div key={index}>
              {item.type === 'image' ? (
                <img src={item.url} alt={`media-${index}`} width="300" />
              ) : item.type === 'video' ? (
                <video width="300" controls>
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
              <a href={item.url} download>Download</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramDownloader;
