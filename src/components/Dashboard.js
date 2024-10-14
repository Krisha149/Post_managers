// /src/components/Dashboard.js

import React, { useState } from 'react';

const Sidebar = ({ setPage }) => (
  <aside className="w-1/5 bg-gray-100 p-4">
    <ul>
      <li className="flex items-center mb-4 cursor-pointer" onClick={() => setPage('Posts')}>
        <i className="fas fa-file-alt mr-2"></i>
        <span>Posts</span>
      </li>
      <li className="flex items-center mb-4 cursor-pointer" onClick={() => setPage('Comments')}>
        <i className="fas fa-comments mr-2"></i>
        <span>Comments</span>
      </li>
      <li className="flex items-center mb-4 cursor-pointer" onClick={() => setPage('Tags')}>
        <i className="fas fa-tags mr-2"></i>
        <span>Tags</span>
      </li>
      <li className="flex items-center mb-4 cursor-pointer" onClick={() => setPage('Users')}>
        <i className="fas fa-users mr-2"></i>
        <span>Users</span>
      </li>
    </ul>
  </aside>
);

const Posts = () => {
  const [posts, setPosts] = useState([
    { id: 13, title: "Fusce massa lorem", date: "01/12/2012", category: "lifestyle", commentable: true },
    { id: 12, title: "Qui tempore rerum", date: "07/11/2012", category: "lifestyle", commentable: true },
    { id: 11, title: "Omnis voluptate enim", date: "22/10/2012", category: "tech", commentable: true },
  ]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', date: '', category: '', commentable: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSelect = (id) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (selectedPosts.length === 0) {
      alert("No posts selected for deletion.");
      return; // Prevents deletion if no posts are selected
    }
    setPosts(posts.filter((post) => !selectedPosts.includes(post.id)));
    setSelectedPosts([]);
    alert('Post(s) deleted successfully!');
  };

  const openPopup = (post = { title: '', date: '', category: '', commentable: false }) => {
    setNewPost(post);
    setIsEditing(!!post.id);
    setEditId(post.id || null);
    setShowPopup(true);
  };

  const closePopup = () => {
    setNewPost({ title: '', date: '', category: '', commentable: false });
    setShowPopup(false);
  };



const generateId = () => {
  const existingIds = posts.map(post => post.id);
  const nextId = existingIds.length < 10 ? existingIds.length + 1 : Math.max(...existingIds) + 1; // Ensure ID starts with 2 digits and then goes to 3
  return nextId;
};

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setPosts(posts.map((post) => (post.id === editId ? newPost : post)));
    } else {
      setPosts([...posts, { ...newPost, id: generateId() }]);
    }
    closePopup();
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a, b) =>
    sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="w-4/5 p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex space-x-4">
          <button className="text-white-500" onClick={() => openPopup()}>
            CREATE
          </button>
          {/* {selectedPosts.length > 0 && ( */}
            <button className="text-white-500" onClick={handleDelete}>
              DELETE
            </button>
          {/* )} */}
        </div>
      </div>

      <table className="w-full border-collapse" >
        <thead>
          <tr className="border-b ">
            <th>
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedPosts(e.target.checked ? posts.map((p) => p.id) : [])
                }
                checked={selectedPosts.length === posts.length}
              />
            </th>
            <th style={{textAlign:"start !important"}}>Id</th>
            <th style={{textAlign:"start !important"}} >Title</th>
            <th style={{textAlign:"start !important"}} className="cursor-pointer" onClick={() => setSortAsc(!sortAsc)}>
              Published at {sortAsc ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}
            </th>
            <th style={{textAlign:"start !important"}}>Category</th>
            <th style={{textAlign:"start !important"}}>Commentable</th>
            <th style={{textAlign:"start !important"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post) => (
            <tr key={post.id} className="border-b">
              <td>
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => handleSelect(post.id)}
                />
              </td>
              <td className="p-2">{post.id}</td>
              <td className="p-2">{post.title}</td>
              <td className="p-2">{post.date}</td>
              <td className="p-2">{post.category}</td>
              <td>           
                {post.commentable ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </td>
              <td className="p-2">
                <button className="text-white-500" onClick={() => openPopup(post)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">{isEditing ? 'Update Post' : 'Create Post'}</h2>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 mb-2 w-full"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 mb-2 w-full"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-2 mb-2 w-full"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            />
            <label>
              <input className='check'
                type="checkbox"
                checked={newPost.commentable}
                onChange={(e) => setNewPost({ ...newPost, commentable: e.target.checked })}
              />{' '}
              <span>Commentable</span>
            </label>
            <div className="flex justify-end space-x-4">
              <button className="text-black-500" onClick={closePopup}>
                Cancel
              </button>
              <button className="text-black-500" onClick={handleCreateOrUpdate}>
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [page, setPage] = useState('Posts');

  return (
    <div className="flex h-screen">
      <Sidebar setPage={setPage} />
      {page === 'Posts' && <Posts />}
      {page === 'Comments' && <div className="w-4/5 p-4"><h1>Comments Page</h1></div>}
      {page === 'Tags' && <div className="w-4/5 p-4"><h1>Tags Page</h1></div>}
      {page === 'Users' && <div className="w-4/5 p-4"><h1>Users Page</h1></div>}
    </div>
  );
};

export default Dashboard;

