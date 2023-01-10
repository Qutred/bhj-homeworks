class SimpleTodo {
  constructor() {
    this.todos = [];
    this.tasks = document.getElementById('tasks');
    this.taskInput = document.getElementById('task__input');
    this.taskAddBtn = document.getElementById('tasks__add');
    this.taskList = document.getElementById('tasks__list');

    this.addTodo = this.addTodo.bind(this);
    this.taskListHandle = this.taskListHandle.bind(this);
  }

  regListeners() {
    this.taskAddBtn.addEventListener('click', this.addTodo);
    this.taskList.addEventListener('click', this.taskListHandle);
  }

  init() {
    this.regListeners();
    this.todos = this.getFromLocalStorage();
    if (this.todos.length) {
      this.updateList(this.renderTodos(this.todos));
    }
  }

  addTodo(e) {
    e.preventDefault();
    const inputValue = this.taskInput.value;

    if (inputValue !== '') {
      const item = this.createTodoItem(inputValue);
      this.todos.push(item);
      this.updateList(this.renderTodo(item));
      this.updateLocalStorage();
      this.clearInput();
    }
  }

  updateList(todoDOM) {
    this.taskList.innerHTML += todoDOM;
  }

  renderTodos() {
    return this.todos.map(todo => this.renderTodo(todo)).join('');
  }

  renderTodo(todoItem) {
    return `<div class="task" data-id="${todoItem.id}">
                                  <div class="task__title">
                                    ${todoItem.value}
                                  </div>
                                  <a href="#" class="task__remove">&times;</a>
                                </div>`;
  }

  taskListHandle(e) {
    e.preventDefault();
    if (e.target.classList.contains('task__remove')) {
      const id = Number(e.target.closest('.task').dataset.id);
      this.removeTodo(id);
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(item => item.id !== id);
    this.taskList.querySelector(`.task[data-id="${id}"]`).remove();
    this.updateLocalStorage();
  }

  clearInput() {
    this.taskInput.value = '';
  }

  createTodoItem(value) {
    return {
      id: Date.now(),
      value,
    };
  }

  updateLocalStorage() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getFromLocalStorage() {
    let todos = [];
    if (window.localStorage.getItem('todos')) {
      todos = JSON.parse(window.localStorage.getItem('todos'));
    }
    return todos;
  }
}

new SimpleTodo().init();
