// 환경변수에서 API 주소 가져오기 (없으면 기본값 사용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// 할 일 목록 조회
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할 일 조회에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('할 일 조회 실패:', error);
    throw error;
  }
};

// 할 일 생성
export const createTodo = async (title, description = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할 일 생성에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('할 일 생성 실패:', error);
    throw error;
  }
};

// 할 일 수정
export const updateTodo = async (id, title, description = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할 일 수정에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('할 일 수정 실패:', error);
    throw error;
  }
};

// 할 일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할 일 삭제에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('할 일 삭제 실패:', error);
    throw error;
  }
};


