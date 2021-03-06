import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  state = {
    todos: []
  };

  /**
   * Add a new todo
   */
  addTodo = todo => {
    this.setState(state => ({
      todos: [todo, ...state.todos]
    }));
  };

  /**
   * make todo as complete or not complete based on previous state
   */
  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  handleDeleteTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  /**
   * Update specific todo message
   */
  handleUpdateTodo = (id, updateText) => {
    this.setState(state => {
      // eslint-disable-next-line
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          todo.text = updateText;
        }
        return todo;
      });
    });
  };

  render() {
    let todosComplete = [];
    let todosNotComplete = [];

    this.state.todos.forEach(todo => {
      if (todo.complete) {
        todosComplete = [todo, ...todosComplete];
      } else {
        todosNotComplete = [todo, ...todosNotComplete];
      }
    });

    return (
      <div className="container">
        <h3>Add Todo</h3>
        <TodoForm onSubmit={this.addTodo} />
        <h3>Todo {todosNotComplete.length}</h3>
        {todosNotComplete.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            onUpdate={this.handleUpdateTodo}
            todo={todo}
          />
        ))}
        <h3>Completed {todosComplete.length}</h3>
        {todosComplete.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            onUpdate={this.handleUpdateTodo}
            todo={todo}
          />
        ))}
      </div>
    );
  }
}
