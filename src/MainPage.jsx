import React, { useState, useEffect, useRef } from 'react';
import FullPageCard from './FullPageCard';
import FloatingButton from './FloatingButton';


function MainPage({ setTab }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const scrollButtonRef = useRef(null); // Define a ref for the scroll button
  
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

  const handleLogin = async () => {
    setTab('Login');
  };
  
  

  const handleLearn = () => {
    setTab('Learn');
  };
  
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const blogList = document.getElementById('blogList');
    let scrollInterval;
    const scrollButton = scrollButtonRef.current; // Access the ref
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
  }, []); // Add an empty dependency array to run this effect only once
  
  return (
    <div className="main-page">
      
      <div className='header'>
      <button className='course'>LEARN TECH</button>
        <h1>Galaxy Blog</h1>
        <button onClick={handleLogin}>Login</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <div className="navigation-buttons">
          <button onClick={handleLearn}>Learn mode</button>
          <button ref={scrollButtonRef}>Start/Stop Scrolling</button>
        </div>
      </div>
      <div className="blog-list" id="blogList">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-preview">
            <h3>{blog.title}</h3>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.description}</p>
            <button onClick={() => handleCardClick(blog.title)}>Read more</button>
          </div>
        ))}
      </div>
      <FloatingButton />
      {selectedBlog && (
        <FullPageCard blog={selectedBlog} onClose={handleCloseFullPage} />
      )}
    </div>
  );
}

export default MainPage;
