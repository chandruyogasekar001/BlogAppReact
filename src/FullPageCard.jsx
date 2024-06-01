import React from 'react';
import './FullPageCard.css'; 

function FullPageCard({ blog, onClose }) {
  // Function to strip HTML tags and decode HTML entities
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Extracting text content from HTML
  const strippedContent = stripHtml(blog.content);

  return (
    <div className="fp-full-page-card">
      <div className="fp-content">
        <button onClick={onClose}>Close</button>
        <h2>{blog.title}</h2>
        <img src={blog.imageUrl} alt={blog.title} />
        <p>{strippedContent}</p> {/* Displaying only text */}
      </div>
    </div>
  );
}

export default FullPageCard;
