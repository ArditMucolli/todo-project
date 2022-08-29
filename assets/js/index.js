let todos = getTodosFromLS();
const todos_div = document.getElementById("todos");
const error = document.getElementById("error");

function getTodosFromLS() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}

function updateStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateStatus(id) {
  todos = [
    ...todos.map((todo, index) => {
      if (index == id) {
        todo.status = !todo.status;
        return todo;
      } else {
        return todo;
      }
    }),
  ];
  updateStorage(todos);
  todos_div.innerHTML = displayTodos(todos);
}

function displayTodos(todos) {
  let todos_html = "";

  todos.forEach((todo, index) => {
    todos_html += `
    <div class="todo">
      <p class="${todo.status ? "finished" : ""}">${todo.text}</p>
      <input type="checkbox" class="done" onclick="updateStatus('${index}')"  ${
      todo.status ? "checked" : ""
    } />
    </div>
    `;
  });
  return todos_html;
}

const todo = document.getElementById("todo");
todo.addEventListener("keyup", e => {
  e.preventDefault();
  const text = e.target.value;

  switch (e.keyCode) {
    case 13:
      if (text.length > 5) {
        error.innerHTML = "";
        error.style.display = "none";
        todos.push({
          text: text,
          status: false,
        });
        e.target.value = "";
        updateStorage(todos);
        todos_div.innerHTML = displayTodos(todos);
      } else {
        error.innerHTML = "Teksti shum i shkurter...";
        error.style.display = "block";
      }
      break;
  }
});

todos_div.innerHTML = displayTodos(todos);
