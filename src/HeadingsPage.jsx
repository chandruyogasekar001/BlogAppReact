import React, { useState, useEffect } from 'react';
import './HeadingPage.css'; // Import the CSS file

function HeadingsPage({ setTab }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupHeadings, setGroupHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headingLoading, setHeadingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(null);
  const [activeSubheadingIndex, setActiveSubheadingIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGroups(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching groups:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      const fetchHeadings = async () => {
        try {
          setHeadingLoading(true);
          const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${selectedGroupId}/headings`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setGroupHeadings(data.data);
          setHeadingLoading(false);
        } catch (error) {
          console.error('Error fetching headings:', error.message);
          setError(error.message);
          setHeadingLoading(false);
        }
      };

      fetchHeadings();
    }
  }, [selectedGroupId]);

  const handleGroupClick = (groupId) => {
    setSelectedGroupId(groupId);
    setActiveHeadingIndex(null);
    setActiveSubheadingIndex(null);
  };

  const handleHeadingClick = (headingIndex) => {
    setActiveHeadingIndex((prevActiveHeadingIndex) => (headingIndex === prevActiveHeadingIndex ? null : headingIndex));
    setActiveSubheadingIndex(null);
  };

  const handleSubheadingClick = (subheadingIndex) => {
    setActiveSubheadingIndex((prevActiveSubheadingIndex) => (subheadingIndex === prevActiveSubheadingIndex ? null : subheadingIndex));
  };

  const handleTab = () => {
    setTab('');
  };

  const handleTech = () => {
    setTab('blog');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="app">
      <div className="mass" />
      <div className='hh'>
        <h1>Edu Tech</h1>
        <div className='navnav'>
          <button onClick={handleTab} className='navv'>Home</button>
          <button onClick={handleTech} className='navv'>Blog</button>
          <button onClick={handleTab} className='navv'>Reels</button>
          
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className='li' style={{ overflow: 'auto' }}>
          <ul className="list">
            {filteredGroups.map((group) => (
              <li key={group._id}>
                <button
                  className={selectedGroupId === group._id ? 'button active' : 'button'}
                  onClick={() => handleGroupClick(group._id)}
                >
                  {group.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedGroupId && (
        <div className="container">
          {headingLoading ? (
            <div>Loading headings...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="headings-container">
              <div className="nav-container">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  {isDropdownOpen ? 'Close Headings' : 'Select Heading'}
                </button>
                <nav className={`nav ${isDropdownOpen ? 'dropdown-open' : ''}`}>
                  <ul>
                    {groupHeadings.map((heading, headingIndex) => (
                      <li key={heading._id}>
                        <div
                          className={activeHeadingIndex === headingIndex ? 'nav-item active' : 'nav-item'}
                          onClick={() => handleHeadingClick(headingIndex)}
                        >
                          {heading.title}
                        </div>
                        {activeHeadingIndex === headingIndex && (
                          <ul>
                            {heading.subheadings.map((subheading, subheadingIndex) => (
                              <li key={subheadingIndex}>
                                <div
                                  className={activeSubheadingIndex === subheadingIndex ? 'nav-item active' : 'nav-item'}
                                  onClick={() => handleSubheadingClick(subheadingIndex)}
                                >
                                  {subheading.subheading}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="description">
                {activeSubheadingIndex !== null && activeHeadingIndex !== null ? (
                  <>
                    <h3>{groupHeadings[activeHeadingIndex].subheadings[activeSubheadingIndex].subheading}</h3>
                    <p>{stripHtml(groupHeadings[activeHeadingIndex].subheadings[activeSubheadingIndex].description)}</p>
                  </>
                ) : (
                  <p>Select a subheading to view description</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HeadingsPage;
