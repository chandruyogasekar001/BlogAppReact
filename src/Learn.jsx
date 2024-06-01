import React, { useState, useEffect } from 'react';
import './Learn.css';
import FloatingButton from './FloatingButton';

function Learn({ setTab }) {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTabClick = (title, index) => {
    setActiveTab(title);
    setCurrentIndex(index);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNextClick = () => {
    if (currentIndex === blogs.length - 1) return; // Stop at the end
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    if (currentIndex === 0) return; // Stop at the first
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTab = () => {
    setTab('');
  };

  // Function to strip HTML tags
  const stripHtml = (html) => {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="app">
      <div className="sidebar">
        <nav>
          <ul>
            {filteredBlogs.map((blog, index) => (
              <li
                key={blog._id}
                onClick={() => handleTabClick(blog.title, index)}
                className={activeTab === blog.title ? 'active' : ''}
              >
                {blog.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="content">
        <button onClick={handleTab}>Blog View / back</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
        />
        <div>
          <h2>{filteredBlogs[currentIndex]?.title}</h2>
          <img src={filteredBlogs[currentIndex]?.imageUrl} alt={filteredBlogs[currentIndex]?.title} />
          <p>{stripHtml(filteredBlogs[currentIndex]?.content)}</p> {/* Displaying only text */}
        </div>
        <div className="controllz">
          <button onClick={handlePrevClick} disabled={currentIndex === 0}>Previous</button>
          <button onClick={handleNextClick} disabled={currentIndex === blogs.length - 1}>Next</button>
        </div>
        
      </div>
      <FloatingButton />
    </div>
  );
}

export default Learn;
