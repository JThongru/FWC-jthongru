// cookies
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

// Update cookies
function saveTodos() {
    const todos = [];
    $('#ft_list .todo-item').each(function() {
        todos.push($(this).text());
    });
    setCookie("todos", JSON.stringify(todos));
}

// Create DOM element with jQuery
function createTodoElement(text) {
    const $todo = $('<div></div>').addClass('todo-item').text(text);

    $todo.click(function() {
        const confirmDelete = confirm("Do you want to remove this to-do item?");
        if (confirmDelete) {
            $(this).remove();
            saveTodos();
        }
    });

    return $todo;
}

// Add TODO at the top
function addTodo(text) {
    if (!text || text.trim() === "") return;
    const $todoEl = createTodoElement(text);
    $('#ft_list').prepend($todoEl);
    saveTodos();
}

$(document).ready(function() {
    // Load todo from cookie
    const saved = getCookie("todos");
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (let i = todos.length - 1; i >= 0; i--) {
                const $todoEl = createTodoElement(todos[i]);
                $('#ft_list').prepend($todoEl);
            }
        } catch (e) {
            console.error("Error parsing saved todos:", e);
        }
    }

    // New button event
    $('#new_btn').click(function() {
        const text = prompt("Enter a new TO DO:");
        if (text !== null && text.trim() !== "") {
            addTodo(text.trim());
        }
    });
});