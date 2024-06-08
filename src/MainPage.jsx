import React, { useState, useEffect, useRef } from 'react';
import FullPageCard from './FullPageCard';
import FloatingButton from './FloatingButton';
import myImage from './icons8-coder-64.png';
function MainPage({ setTab }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const scrollIntervalRef = useRef(null); // Use ref to store the scroll interval
  const scrollButtonRef = useRef(null); // Ref for the scroll button
  const blogListRef = useRef(null); // Ref for the blog list container

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
    setSearchQuery(e.target.value);
  };

  const handleTab = () => {
    setTab('course');
  };

  const handleLearn = () => {
    setTab('Learn');
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startAutoScroll = () => {
    if (scrollIntervalRef.current === null) {
      scrollIntervalRef.current = setInterval(() => {
        const blogList = blogListRef.current;
        const cardHeight = blogList.firstChild.offsetHeight; // Get the height of the first card
        blogList.scrollBy({
          top: cardHeight,
          behavior: 'smooth'
        });
      }, 2000); // Scroll every 2 seconds
      scrollButtonRef.current.textContent = 'Stop Scroll';
    }
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current !== null) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
      scrollButtonRef.current.textContent = 'Start Scroll';
    }
  };

  const toggleAutoScroll = () => {
    if (scrollIntervalRef.current === null) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  };

  useEffect(() => {
    const scrollButton = scrollButtonRef.current; // Access the ref

    scrollButton.addEventListener('click', toggleAutoScroll);

    return () => {
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
      }
      scrollButton.removeEventListener('click', toggleAutoScroll);
    };
  }, []);
  const handlesTab = () => {
    setTab('blog');
  };
  
  return (
    <div className="main-page">
      <div className='header hh'>
      <img src={myImage} alt="icon" />
        <h2>Edu Tech Universe</h2>
        <p>Reels</p>
        
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
       
        <div className='navnav'>
        <button onClick={handleLearn} className='navv'>Learn mode</button>
        
        <button style={{fontSize:'10px'}} onClick={handleTab} className='navv ii'>LEARN TECH</button>
        <button onClick={handlesTab} className='navv'>Blog</button></div>
        </div>
        <button className='startstop' ref={scrollButtonRef}>Start Scroll</button>
     <div className='hd'>
      <div className="blog-list" id="blogList" ref={blogListRef}>
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-preview">
            <h3>{blog.title}</h3>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.description}</p>
            <button onClick={() => handleCardClick(blog.title)}>Read more</button>
          </div>
        ))}
      </div>
     
      </div>
      <p style={{fontSize:'10px',position:'absolute',bottom:'0'}}>  developer chandruyogasekar111@gmail.com</p>
      
      <FloatingButton />
      {selectedBlog && (
        <FullPageCard blog={selectedBlog} onClose={handleCloseFullPage} />
      )}
    </div>
  );
}

export default MainPage;
