// get access to Todo form and task list
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

// functions

// toggles wether task hask done
const toggleTodoItem = ({ target }) => {
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
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  const label = document.createElement('label');
  label.className = 'title';
  label.innerText = title;

  const editInput = document.createElement('input');
  editInput.className = 'textfield';
  editInput.type = 'text';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerText = 'Change Task';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.innerText = 'Delete Task';

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

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

main();
