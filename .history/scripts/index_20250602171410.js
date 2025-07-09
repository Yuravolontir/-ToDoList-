import { createNewTodo, saveToLocalStorage, loadFromLocalStorage,clearAllTodos ,clearCompletedTodos,SortByDate,SortByPriority} from "./functions.js";

document.querySelector('#todo-form').addEventListener('submit', createNewTodo);
document.querySelector('#save-todos').addEventListener('click', saveToLocalStorage);
document.querySelector('#load-todos').addEventListener('click', loadFromLocalStorage);
 document.querySelector('#clear-all').addEventListener('click', clearAllTodos);
 document.querySelector('#clear-completed').addEventListener('click', clearCompletedTodos);
 document.querySelector('#sort-by-date').addEventListener('click', SortByDate);
 document.querySelector('#sort-by-date').addEventListener('click', SortByDate);
