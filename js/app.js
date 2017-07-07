const main = ((document) => {
  // get access to Todo form and task list
  const todoForm = document.getElementById('todo-form');
  const addInput = document.getElementById('add-input');
  const todoList = document.getElementById('todo-list');
  const todoItems = document.querySelectorAll('.todo-item');

  // functions

  // creates element
  const createElement = (tag, props, ...children) => {
    const element = document.createElement(tag);

    // we can use for...in loop, but better to use Object.keys
    Object.keys(props).forEach(key => element[key] = props[key]);

    // map each children
    if (children.length > 0) {
      children.forEach(child => {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }

        element.appendChild(child);
      });
    }

    return element;
  };

  // createElement('input', {type: 'checkbox', className: 'checkbox'});

  // toggles wether task hask done
  const toggleTodoItem = ({ target }) => {
    console.log(target);
    const listItem = target.parentNode;
    listItem.classList.toggle('completed');
  };

  // changes todo item
  const editTodoItem = ({ target }) => {
    const listItem = target.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      title.innerText = editInput.value;
      target.innerText = 'Change Task';
    } else {
      editInput.value = title.innerText;
      target.innerText = 'Save Task';
    }

    listItem.classList.toggle('editing');
  };

  // deletes task
  const deleteTodoItem = ({ target }) => {
    const listItem = target.parentNode;
    todoList.removeChild(listItem);
  };

  // binding events
  const bindEvents = (todoItem) => {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
  };

  // creates Todo Task
  const createTodoItem = (title) => {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { className: 'textfield', type: 'text' });
    const editButton = createElement('button', { className: 'edit' }, 'Change Text');
    const deleteButton = createElement('button', { className: 'delete' }, 'Delete Text');
    const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

    bindEvents(listItem);

    console.log(listItem);
    return listItem;
  };

  // adds Todo Task
  const addTodoItem = (event) => {
    event.preventDefault();

    if (addInput.value === '') {
      return alert('You need to enter task name!');
    }

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
  };

  const main = () => {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
  };

  return main;
})(document);

main();
