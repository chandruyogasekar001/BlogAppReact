import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.css';


function BlogAdmin({ setTab }) {
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: '',
    description: '',
    imageUrl: '',
    content: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs');
        setArr(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  const handleSaveBtn = async () => {
    try {
      const response = await axios.put('https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs', {
        items: arr
      });
      alert(response.data.msg);
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleAddBtn = async () => {
    try {
      const response = await axios.post('https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs', inputValue);
      setArr(prevArr => [...prevArr, response.data]);
      setInputValue({
        title: '',
        description: '',
        imageUrl: '',
        content: ''
      });
    } catch (error) {
      console.error('Error adding post:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleEditBtn = async () => {
    try {
      await axios.put(`https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs/${arr[editIndex]._id}`, inputValue);
      setArr(prevArr => {
        const newArr = [...prevArr];
        newArr[editIndex] = inputValue;
        return newArr;
      });
      setInputValue({
        title: '',
        description: '',
        imageUrl: '',
        content: ''
      });
      setEditIndex(null);
    } catch (error) {
      console.error('Error editing post:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleDeleteItems = async (deleteIdx) => {
    try {
      await axios.delete(`https://galaxyblogapp-git-main-chandruyogasekar001s-projects.vercel.app/api/blogs/${arr[deleteIdx]._id}`);
      setArr(prevArr => prevArr.filter((_, index) => index !== deleteIdx));
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };


  const handleEditItems = (editIdx) => {
    setEditIndex(editIdx);
    setInputValue(arr[editIdx]);
  };

  const filteredArr = arr.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
 
  return (
    <div className="to-do-app">
      <button onClick={() => setTab("")}>log-out</button>
      <br />
      
      <br />
      <label>Title:</label>
      <input
        type="text"
        value={inputValue.title}
        onChange={(e) => setInputValue(prev => ({ ...prev, title: e.target.value }))}
      />
      <label>Description:</label>
      <input
        type="text"
        value={inputValue.description}
        onChange={(e) => setInputValue(prev => ({ ...prev, description: e.target.value }))}
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={inputValue.imageUrl}
        onChange={(e) => setInputValue(prev => ({ ...prev, imageUrl: e.target.value }))}
      />
      <label>Content:</label>
      <div className='editor'> 
      <CKEditor
        editor={ClassicEditor}
        data={inputValue.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setInputValue(prev => ({ ...prev, content: data }));
        }}
        
      />
      </div>
      {editIndex !== null ? (
        <button onClick={handleEditBtn}>Save Changes</button>
      ) : (
        <button onClick={handleAddBtn}>Add</button>
      )}
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ol>
        {filteredArr.map((value, index) => (
          <div className="items" key={value._id}>
            <div className="flex">
              <div>
                <div className="content">{value.title}</div>
              </div>
              <div style={{ minWidth: '150px' }}>
                <button onClick={() => handleEditItems(index)}>Edit</button>
                <button onClick={() => handleDeleteItems(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default BlogAdmin;
