// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const deleteAllBtn = document.querySelector(".delete-all");

// Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteChecked);
todoInput.addEventListener("input", function () {
  todoButton.disabled = todoInput.value === "";
});
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);
deleteAllBtn.addEventListener("click", deleteAll);

function addTodo(event) {
  event.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // todo li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // add todo to localstorage
  saveLocalsTodo(todoInput.value);
  // completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //   append
  todoList.appendChild(todoDiv);
  // clear todo input
  todoInput.value = "";
  // to disabled button
  todoButton.disabled = true;
}

function deleteChecked(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeLocalsTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // check mark
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function deleteAll(e) {
  const todo = todoList.parentElement;
  // animation
  todo.classList.add("fall-all");
  localStorage.removeItem("todos");
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
  window.location.assign("index.html");
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo.nodeType == Node.ELEMENT_NODE) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function saveLocalsTodo(todo) {
  // checked
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  deleteAllBtn.disabled = false;
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    deleteAllBtn.disabled = true;
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    deleteAllBtn.disabled = false;
  }
  todos.forEach(function (todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //   append
    todoList.appendChild(todoDiv);
  });
}

function removeLocalsTodos(todo) {
  // checked
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
