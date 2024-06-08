import React, { useState, useEffect, useRef } from 'react';
import FullPageCards from './FullPageCards';
import FloatingButton from './FloatingButton';
import './MainPage2.css';  // Import the CSS file

function MainPage2({ setTab }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const scrollButtonRef = useRef(null);
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch("https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs")
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error(error));
  };

  const handleCardClick = (title) => {
    const clickedBlog = blogs.find(blog => blog.title === title);
    setSelectedBlog(clickedBlog);
  };

  const handleCloseFullPage = () => {
    setSelectedBlog(null);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleTab = () => {
    setTab('course');
  };

  const handleLearn = () => {
    setTab('Learn');
  };
  const handleBlog = () => {
    setTab('');
  };
  
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const blogList = document.getElementById('blogList');
    let scrollInterval;
    const scrollButton = scrollButtonRef.current;
    if (scrollButton) {
      scrollButton.addEventListener('click', () => {
        if (!scrollInterval) {
          scrollInterval = setInterval(() => {
            blogList.scrollTop += 1;
          }, 50);
          scrollButton.textContent = 'Stop Auto Scroll';
        } else {
          clearInterval(scrollInterval);
          scrollInterval = null;
          scrollButton.textContent = 'Start Auto Scroll';
        }
      });
    }
  }, []);

  return (
    <div className="main-page1">
      <div className='header1'>
        
      <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      <div className='navnav'>
      <button className='navv'  onClick={handleLearn}>Learn mode</button>
        
        
        <div>
        <button style={{fontSize:'10px'}} className=' navv ii' onClick={handleTab}>LEARN TECH</button>
        </div>
        <button className='navv' onClick={handleBlog}>Reels</button>
        <button className='navv' onClick={handleBlog}>Home</button>
        </div>
      </div>
      <div className="blog-list1" id="blogList">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-preview1">
            <h3 style={{color:'black'}}>{blog.title}</h3>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.description}</p>
            <button onClick={() => handleCardClick(blog.title)}>Read more</button>
          </div>
        ))}
      </div>
      <FloatingButton />
      {selectedBlog && (
        <FullPageCards blog={selectedBlog} onClose={handleCloseFullPage} />
      )}
    </div>
  );
}

export default MainPage2;
