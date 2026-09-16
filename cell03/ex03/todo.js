const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new_btn");

//cookies
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

//Update cookies
function saveTodos() {
    const todos = [];
    
    const items = ftList.querySelectorAll(".todo-item");
    items.forEach(item => todos.push(item.textContent));
    setCookie("todos", JSON.stringify(todos));
}


function createTodoElement(text) {
    const todo = document.createElement("div");
    todo.className = "todo-item";
    todo.textContent = text;

    
    todo.addEventListener("click", () => {
        const confirmDelete = confirm("Do you want to remove this to-do item?");
        if (confirmDelete) {
            todo.remove(); 
            saveTodos();   
        }
    });

    return todo;
}

//Add TODO at the top
function addTodo(text) {
    if (!text || text.trim() === "") return;
    const todoEl = createTodoElement(text);
    ftList.prepend(todoEl); 
    saveTodos();
}


newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");
    if (text !== null && text.trim() !== "") {
        addTodo(text.trim());
    }
});

//load todo
window.addEventListener("DOMContentLoaded", () => {
    const saved = getCookie("todos");
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            
            for (let i = todos.length - 1; i >= 0; i--) {
                const todoEl = createTodoElement(todos[i]);
                ftList.prepend(todoEl);
            }
        } catch (e) {
            console.error("Error parsing saved todos:", e);
        }
    }
});