import React from 'react'
import './PopupMessage.css';


const PopupMessage = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Form Submitted Successfully!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupMessage;

  