import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './FloatingButton.css';

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="floating-button" onClick={toggleChatWindow}>
        AI learn
      </button>
      {isOpen && <ChatWindow onClose={toggleChatWindow} />}
    </div>
  );
}

export default FloatingButton;
