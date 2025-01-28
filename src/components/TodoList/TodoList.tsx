import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onShowTodo }) => {
  const [pressedTodo, setPressedTodo] = useState<Todo | null>(null);

  const handleTodoClick = (todo: Todo) => {
    onShowTodo(todo);
    setPressedTodo(todo);
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const isSelectedTodo = pressedTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              className="has-background-into-light"
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon has-text-success">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  <span className="icon has-text-danger">
                    <i className="fas" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleTodoClick(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': isSelectedTodo,
                        'fa-eye': !isSelectedTodo,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
