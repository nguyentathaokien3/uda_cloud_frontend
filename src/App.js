import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // Gọi API lấy danh sách bài viết từ Backend qua Nginx proxy
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Lỗi khi tải posts:', err));

    // Gọi API kiểm tra danh mục
    fetch('/api/v1/category')
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(err => console.error('Lỗi khi tải category:', err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Chào mừng đến với Cloud Blog trên AWS EC2</h1>
      
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Trạng thái kết nối API danh mục:</h3>
        <pre>{category ? JSON.stringify(category, null, 2) : 'Đang tải...'}</pre>
      </div>

      <h2>Danh sách bài viết:</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;