import { useState } from 'react';
import { createTodo } from '../api';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newTodo = await createTodo(title.trim(), description.trim());
      onAdd(newTodo);
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일 제목을 입력하세요"
          className="form-input"
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요 (선택사항)"
          className="form-textarea"
          disabled={isSubmitting}
          rows="3"
        />
      </div>
      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? '추가 중...' : '할 일 추가'}
      </button>
    </form>
  );
}

export default TodoForm;



