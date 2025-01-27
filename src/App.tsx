/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Todo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setSelectedUser(todo);
    setIsModalVisible(true);
  };

  const hanleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} onShowTodo={handleShowTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <TodoModal todo={selectedUser} onClose={hanleCloseModal} />
      )}
    </>
  );
};
