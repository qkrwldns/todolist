const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = document.querySelector("#todo-form input");
const TODOSKEY = "todos";
const STYLESKEY = "todostyles"; // Added a key for storing styles
let toDos = [];
let todoStyles = {}; // Added an object to store individual todo styles

function saveTodos() {
    localStorage.setItem(TODOSKEY, JSON.stringify(toDos));
    localStorage.setItem(STYLESKEY, JSON.stringify(todoStyles)); // Save styles
}

function deleteTodo(event) {
    const li = event.target.parentNode;
    li.remove();
    const todoId = parseInt(li.id);
    toDos = toDos.filter(item => item.id !== todoId);
    delete todoStyles[todoId]; // Remove the style when deleting a todo
    saveTodos();
}

function toggleCompleted(event) {
    const li = event.target.parentNode;
    const todoId = parseInt(li.id);
    toDos = toDos.map(item => {
        if (item.id === todoId) {
            item.completed = !item.completed;
            // Store the style when toggling completion
            todoStyles[todoId] = item.completed ? "line-through" : "none";
        }
        return item;
    });
    saveTodos();
    applyStyles(); // Apply styles after toggling completion
}

function applyStyles() {
    for (const [id, style] of Object.entries(todoStyles)) {
        const li = document.getElementById(id);
        if (li) {
            li.classList.toggle("completed", style === "line-through");
            const span = li.querySelector("span");
            if (span) {
                span.style.textDecoration = style;
            }
        }
    }
}

function showTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleCompleted);

    span.innerText = newTodo.text;
    li.appendChild(checkbox);
    li.appendChild(span);

    // Apply style based on stored style
    const style = todoStyles[newTodo.id] || "none";
    li.classList.toggle("completed", style === "line-through");
    span.style.textDecoration = style;

    const button = document.createElement("button");
    button.innerText = "❌";
    checkbox.checked = newTodo.completed || false;
    li.appendChild(button);
    todoList.appendChild(li);
    button.addEventListener("click", deleteTodo);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const inputValue = todoInput.value;
    const newTodoObj = {
        text: inputValue,
        id: Date.now(),
        completed: false,
    };
    toDos.push(newTodoObj);
    todoStyles[newTodoObj.id] = "none"; // Set default style
    showTodo(newTodoObj);
    saveTodos();
    todoInput.value = "";
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOSKEY);
const savedStyles = localStorage.getItem(STYLESKEY);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(showTodo);
}

if (savedStyles !== null) {
    todoStyles = JSON.parse(savedStyles);
    applyStyles(); // Apply styles on page load
}
