import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './FloatingButton.css';
import myImage from './icons8-alien-48.png';
function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="floating-button" onClick={toggleChatWindow}>
      <img src={myImage} alt="icon" />
      </button>
      {isOpen && <ChatWindow onClose={toggleChatWindow} />}
    </div>
  );
}

export default FloatingButton;
