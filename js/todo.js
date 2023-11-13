const todoFrom = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = document.querySelector("#todo-form input");
const TODOSKEY = "todos";
let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOSKEY, JSON.stringify(toDos));
}

function deleteTOdo(event) {
    const li = event.target.parentNode;
    li.remove();
    toDos = toDos.filter(item => item.id !== parseInt(li.id));
    saveTodos()
}


function showTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const spen = document.createElement("span");
    spen.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = " ❌";
    li.appendChild(spen);
    li.appendChild(button);
    todoList.appendChild(li);
    button.addEventListener("click",deleteTOdo)
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const inputValue = todoInput.value;
    const newTodoObj = {
        text: inputValue,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    showTodo(newTodoObj);
    saveTodos();
    todoInput.value = "";
}

todoFrom.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOSKEY);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(showTodo);
}

