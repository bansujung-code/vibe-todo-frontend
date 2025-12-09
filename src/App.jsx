import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할 일 목록 불러오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('할 일 목록 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 할 일 추가 핸들러
  const handleAdd = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  // 할 일 수정 핸들러
  const handleUpdate = (updatedTodo) => {
    setTodos(todos.map((todo) => 
      todo._id === updatedTodo._id ? updatedTodo : todo
    ));
  };

  // 할 일 삭제 핸들러
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>할 일 관리</h1>
          <p>오늘 해야 할 일들을 관리해보세요</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        <div className="todos-section">
          <h2>할 일 목록</h2>
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : error ? (
            <div className="error">
              <p>오류: {error}</p>
              <button onClick={fetchTodos} className="btn-retry">
                다시 시도
              </button>
            </div>
          ) : (
            <TodoList 
              todos={todos} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
