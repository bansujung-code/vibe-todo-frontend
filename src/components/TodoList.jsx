import { useState } from 'react';
import { updateTodo, deleteTodo } from '../api';

function TodoList({ todos, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSave = async (id) => {
    try {
      if (!editTitle.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      const updatedTodo = await updateTodo(id, editTitle.trim(), editDescription.trim());
      onUpdate(updatedTodo);
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteTodo(id);
        onDelete(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty-state">
          <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <div className="todo-edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="제목"
                  className="edit-input"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="설명 (선택사항)"
                  className="edit-textarea"
                />
                <div className="edit-actions">
                  <button onClick={() => handleSave(todo._id)} className="btn-save">
                    저장
                  </button>
                  <button onClick={handleCancel} className="btn-cancel">
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="todo-content">
                  <h3 className="todo-title">{todo.title}</h3>
                  {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                  )}
                  <span className="todo-date">
                    {new Date(todo.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)} className="btn-edit">
                    수정
                  </button>
                  <button onClick={() => handleDelete(todo._id)} className="btn-delete">
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;



