import { Item } from './models/item.js'; // ייבוא חלק המודלים
import { itemsList } from './global.js'; // ייבוא הרשימה הגלובלית

export function createNewTodo(event) {
    event.preventDefault(); // למנוע רענון של הדף
    let form = event.target; // טופס הוספת משימה

    let title = form.querySelector('#todo-title').value; // כותרת המשימה
    // if (title > 50) {
    //     alert('כותרת המשימה לא יכולה להיות ארוכה מ-50 תווים'); // הודעה למשתמש אם הכותרת ארוכה מדי
    //     return; // יציאה מהפונקציה
    // }
    // if (title.lang !== 'he') {
    //     alert('כותרת המשימה חייבת להיות בעברית'); // הודעה למשתמש אם הכותרת לא בעברית
    //     return; // יציאה מהפונקציה
    // }
    let description = form.querySelector('#todo-description').value; // תיאור המשימה
    // if (description > 200) {
    //     alert('תיאור המשימה לא יכול להיות ארוך מ-200 תווים'); // הודעה למשתמש אם התיאור ארוך מדי
    //     return; // יציאה מהפונקציה
    // }
    //  if (description.lang !== 'he') {
    //     alert('תיאור המשימה חייב להיות בעברית'); // הודעה למשתמש אם התיאור לא בעברית
    //     return; // יציאה מהפונקציה
    // }
    let dueDate = new Date(form.querySelector('#todo-date').value); // תאריך יעד
    // const today = new Date();
    // if (dueDate.valueOf() < today.valueOf()) {
    //     alert('תאריך היעד חייב להיות בעתיד'); // הודעה למשתמש אם התאריך לא תקין
    //     return; // יציאה מהפונקציה
    // }
    // if (dueDate.valueOf() > today.valueOf(setMounth() + 1)) // הגדרת תאריך יעד לא יכול להיות רחוק יותר מ-30 יום מהיום
    // {
    //     alert('תאריך היעד לא יכול להיות רחוק יותר מ-30 יום מהיום'); // הודעה למשתמש אם התאריך רחוק מדי
    //     return; // יציאה מהפונקציה
    // }
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

 export function clearAllTodos(event) {
 event.preventDefault(); // למנוע רענון של הדף


    localStorage.removeItem('itemsList'); // הסרת הרשימה מהסשן סטורג׳
    sessionStorage.removeItem('itemsList');

    

   alert('כל המשימות נמחקו בהצלחה'); // הודעה למשתמש
    

 
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