import React from 'react';
import './ChatWindow.css';

function ChatWindow({ onClose }) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="back-button" onClick={onClose}>Back</button>
        <h6>Autobot AI Powered by Google</h6>
        <a href='https://autobot-ai-two.vercel.app/' target='_blank'><button style={{backgroundColor:'aliceblue',color:'blue'}}>Open App</button></a>
        
      </div>
      <div className="chat-body">
        <iframe
          src="https://autobot-ai-two.vercel.app/"
          title="Chat Content"
          frameBorder="0"
          className="chat-iframe"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default ChatWindow;
