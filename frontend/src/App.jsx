import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5000/api/ideas';

  const fetchIdeas = async () => {
    const res = await axios.get(API_URL);
    setIdeas(res.data);
  };

  useEffect(() => { fetchIdeas(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { title, content });
      setEditingId(null);
    } else {
      await axios.post(API_URL, { title, content });
    }
    setTitle(''); setContent('');
    fetchIdeas();
  };

  const deleteIdea = async (id) => {
    if (window.confirm("確定要刪除嗎？")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchIdeas();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🌿 靈感綠洲 (Idea Oasis)</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
        <input placeholder="標題" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required />
        <textarea placeholder="內容" value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required />
        <button type="submit">{editingId ? '儲存修改' : '捕捉靈感'}</button>
      </form>
      <div>
        {ideas.map(idea => (
          <div key={idea._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>{idea.title}</h3>
            <p>{idea.content}</p>
            <button onClick={() => { setEditingId(idea._id); setTitle(idea.title); setContent(idea.content); }}>編輯</button>
            <button onClick={() => deleteIdea(idea._id)} style={{ marginLeft: '10px', color: 'red' }}>刪除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;