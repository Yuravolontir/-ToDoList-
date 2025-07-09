import { createNewTodo, saveToLocalStorage, loadFromLocalStorage,clearAllTodos ,clearCompletedTodos} from "./functions.js";

document.querySelector('#todo-form').addEventListener('submit', createNewTodo);
document.querySelector('#save-todos').addEventListener('click', saveToLocalStorage);
document.querySelector('#load-todos').addEventListener('click', loadFromLocalStorage);
 document.querySelector('#clear-all').addEventListener('click', clearAllTodos);
 document.querySelector('#clear-completed').addEventListener('click', clearCompletedTodos);
