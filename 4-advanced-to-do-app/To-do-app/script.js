/*
1.Add Todos
  1.1. user will type in todo and click add todo button.this should
       then add the todod to the list above
delete Todos
complete Todos
save Todos
load todos
*/

const form = document.querySelector("#new-todo-form");
const todo_Input = document.querySelector("#todo-input");
const list_of_todos = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}_todos`;
let todos_array = loadTodos();
todos_array.forEach((todo) => renderTodo(todo));

//  complete todos section

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  // get the todos that is clicked on
  const parent = e.target.closest(".list-item");
  const todo_Id = parent.dataset.todoId;
  const todo = todos_array.find((t) => t.id == todo_Id);
  todo.complete = e.target.checked;
  // toogle the complete property to be equal to the checkbox value
  // save our updated todo
  saveTodos();
});

// delete todos section

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos_array = todos_array.filter((todo) => todo.id !== todoId);
  saveTodos();
});

// add todos section

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo_name = todo_Input.value;
  if (todo_name == "") return;
  let new_todos = {
    name: todo_name,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos_array.push(new_todos);
  renderTodo(new_todos);
  saveTodos();
  todo_Input.value = "";
});

function renderTodo(todo) {
  const template_Clone = template.content.cloneNode(true);
  const list_item = template_Clone.querySelector(".list-item");
  list_item.dataset.todoId = todo.id;
  const text_element = template_Clone.querySelector("[data-list-item-text]");
  text_element.innerText = todo.name;
  const checkbox = template_Clone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;
  list.appendChild(template_Clone);
}

// save todos section

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos_array));
}

// laod todos section

function loadTodos() {
  const todos_string = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todos_string) || [];
}
