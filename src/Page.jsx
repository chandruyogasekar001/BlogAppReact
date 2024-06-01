// Page.js
import React, { useEffect, useState } from 'react';
import FullPageCard from './FullPageCard';

function Page() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  const fetchBlogs = () => {
    fetch("https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs")
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Blogs:', data);  // Add this line
        setBlogs(data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  };
  

  const handleCardClick = (title) => {
    const clickedBlog = blogs.find(blog => blog.title === title);
    console.log(clickedBlog);
    setSelectedBlog(clickedBlog);
  };

  const handleCloseFullPage = () => {
    setSelectedBlog(null);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-page">
      <div className="header">
        <h1>My Personal Blog</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="blog-list">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-preview">
            <h3>{blog.title}</h3>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.description}</p>
            <button onClick={() => handleCardClick(blog.title)}>Read more</button>
          </div>
        ))}
      </div>
      {selectedBlog && (
        <FullPageCard blog={selectedBlog} onClose={handleCloseFullPage} />
      )}
    </div>
  );
}

export default Page;
