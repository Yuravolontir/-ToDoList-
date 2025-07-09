import { createNewTodo, saveToLocalStorage, loadFromLocalStorage,clearAllTodos } from "./functions.js";

document.querySelector('#todo-form').addEventListener('submit', createNewTodo);
document.querySelector('#save-todos').addEventListener('click', saveToLocalStorage);
document.querySelector('#load-todos').addEventListener('click', loadFromLocalStorage);
 document.querySelector('#clear-all').addEventListener('click', clearAllTodos);
