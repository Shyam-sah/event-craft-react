// Background.js
import React from 'react';

const Background = ({ imageUrl }) => {
  const backgroundStyle = {
    background: `url(${imageUrl}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
  };

  return <div style={backgroundStyle}></div>;
};

export default Background;
