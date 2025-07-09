import { Item } from './models/item.js'; // ייבוא חלק המודלים
import { itemsList } from './global.js'; // ייבוא הרשימה הגלובלית

export function createNewTodo(event) {
    event.preventDefault(); // למנוע רענון של הדף
    let form = event.target; // טופס הוספת משימה

    let title = form.querySelector('#todo-title').value; // כותרת המשימה
    let description = form.querySelector('#todo-description').value; // תיאור המשימה
    let dueDate = form.querySelector('#todo-date').value; // תאריך יעד
    let priority = form.querySelector('#todo-priority').value; // עדיפות

    let item = new Item(title, description, dueDate, priority); // יצירת אובייקט חדש מסוג Item

    itemsList.push(item); // הוספת האובייקט החדש לרשימה

    sessionStorage.setItem('itemsList', JSON.stringify(itemsList)); // שמירה בסשן סטורג׳

    form.reset(); // איפוס הטופס
    renderTodos(); // רינדור הרשימה המעודכנת
}

function renderTodos() {
    let todoList = document.querySelector('#todo-list'); // אלמנט הרשימה
    let completed = document.querySelector('#completed-todo-list'); // אלמנט המשימות הושלמו
    todoList.innerHTML = ''; // ריקון הרשימה
    completed.innerHTML = ''; // ריקון הרשימה

    itemsList.forEach((item) => {
        if (item.status) { // אם המשימה הושלמה
            showItemInList(completed, item); // הוספת המשימה לרשימת המשימות הושלמו
        } else {
            showItemInList(todoList, item); // הוספת המשימה לרשימת המשימות לא הושלמו
        }
    })
}

function showItemInList(list, item) {
    let li = document.createElement('li'); // יצירת אלמנט רשימה
    li.classList.add('todo-item'); // הוספת מחלקה לאלמנט הרשימה

    let input = document.createElement('input'); // יצירת אלמנט קלט
    input.type = 'checkbox'; // הגדרת סוג הקלט
    input.id = item.id; // הגדרת מזהה הקלט
    input.checked = item.status; // הגדרת מצב הקלט
    input.addEventListener('change', changeStatus); // הוספת מאזין לאירוע שינוי

    let h3 = document.createElement('h3'); // יצירת אלמנט כותרת
    h3.innerText = item.title; // הגדרת טקסט הכותרת

    let pDescription = document.createElement('p'); // יצירת אלמנט פסקה
    pDescription.innerText = item.description; // הגדרת טקסט הפסקה

    let pDueDate = document.createElement('p'); // יצירת אלמנט פסקה
    pDueDate.innerText = `תאריך סיום: ${new Date(item.dueDate).toLocaleDateString()}`; // הגדרת טקסט הפסקה

    let pPriority = document.createElement('p'); // יצירת אלמנט פסקה
    pPriority.innerText = `עדיפות: ${item.priority}`; // הגדרת טקסט הפסקה

    li.appendChild(input); // הוספת אלמנט הקלט לאלמנט הרשימה
    li.appendChild(h3); // הוספת אלמנט הכותרת לאלמנט הרשימה
    li.appendChild(pDescription); // הוספת אלמנט הפסקה לתיאור לאלמנט הרשימה
    li.appendChild(pDueDate); // הוספת אלמנט הפסקה לתאריך לאלמנט הרשימה
    li.appendChild(pPriority); // הוספת אלמנט הפסקה לעדיפות לאלמנט הרשימה

    list.appendChild(li); // הוספת אלמנט הרשימה לרשימה
}

function changeStatus(event) {
    let id = event.target.id; // מזהה המשימה
    let status = event.target.checked; // מצב המשימה

    itemsList.forEach((item) => {
        if (item.id == id) {
            item.status = status; // עדכון הסטטוס של המשימה
        }
    })

    sessionStorage.setItem('itemsList', JSON.stringify(itemsList)); // שמירה בסשן סטורג׳
    renderTodos(); // רינדור הרשימה המעודכנת
}

export function saveToLocalStorage() {
    localStorage.setItem('itemsList', JSON.stringify(itemsList)); // שמירה בלוקאל סטורג׳
    alert('המשימות נשמרו בהצלחה'); // הודעה למשתמש
}

export function loadFromLocalStorage() {
    let items = JSON.parse(localStorage.getItem('itemsList')); // טעינת הרשימה מהלוקאל סטורג׳

    if (items) {
        //itemsList.push(...items); // הוספת הרשימה לגלובלית
        items.forEach(item => {
            itemsList.push(item); // הוספת כל משימה לרשימה
        });
    }

    renderTodos(); // רינדור הרשימה המעודכנת
}